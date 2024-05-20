export interface GlobToRegexOption {
	/**
	 * @default true
	 */
	startsWith?: boolean;
	endsWith?: boolean;
}

/**
 * Get RegExp from Glob Pattern
 * @description
 * - `*`: match any strings without `/`
 * - `**`: match zero and more segments split with `/`
 * - `?` : match one string
 * - '[]: match string range
 * - '{}': match any one items split with `,`
 * @param pattern
 * @param option
 */
export function globToRegex(pattern: string, option?: GlobToRegexOption): RegExp {
	option = Object.assign({
		startsWith: true,
		endsWith: true
	}, option);
	const end      = pattern.length;
	let current    = -1;
	let expression = '';
	while (++current < end) {
		const char = pattern[current];

		switch (char) {
			case '{':
				const matchWords = [];
				let matchWord    = '';
				braceLoop:
					while (++current < end) {
						const inChar = pattern[current];
						switch (inChar) {
							case '}':
								if (matchWord) {
									matchWords[matchWords.length] = matchWord.trim();
								}

								expression += '(' + matchWords.join('|') + ')';
								break braceLoop;
							case ',':
								matchWords[matchWords.length] = matchWord.trim();
								matchWord                     = '';
								break;
							case '[':
							case ']':
							case '(':
							case ')':
							case '?':
							case '*':
							case '|':
							case '.':
							case '/':
								matchWord += '\\' + inChar;
								break;
							default:
								matchWord += inChar;
						}
					}
				continue;
			case '[':
				let matchChar = char;
				braceLoop:
					while (++current < end) {
						const inChar = pattern[current];
						switch (inChar) {
							case ']':
								expression += matchChar + inChar;
								matchChar = null;
								break braceLoop;
							case '*':
							case '?':
							case '/':
								matchChar += '\\' + inChar;
								break;
							default:
								matchChar += inChar
						}
					}
				if (matchChar) {
					expression += '\\' + matchChar;
				}
				continue;
			case '*':
				if (pattern.substring(current, current + 3) === '**/') {
					current += 2;
					expression += '(\\w[\\w\\/]*\/)*'
				} else {
					expression += '[^\\/]*'
				}
				continue;
			case '?':
				expression += '[^/\\s]';
				continue
			case ']':
			case '}':
			case '(':
			case ')':
			case '.':
			case '/':
				expression += '\\' + char;
				continue;
		}
		expression += char;
	}

	return new RegExp(
		(option.startsWith ? '^' : '')
		+ expression
		+ (option.endsWith ? '$' : '')
	);
}
