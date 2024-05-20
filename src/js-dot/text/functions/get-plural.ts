/**
 * Get Plural Expression
 * @param word
 * @param size
 */
export function getPlural(word: string, size?: number | boolean) {
	const FE = [
		'knife'
	];

	const ON = [
		'criterion',
		'phenomenon'
	];

	const F = [
		'leaf'
	];

	const O = [
		'potato',
		'tomato',
		'hero',
		'cargo'
	];

	const ABNORMAL = {
		mouse: 'mice',
		child: 'children',
		foot: 'feet',
		tooth: 'teeth',
		goose: 'geese',
		person: 'people',
		man: 'men',
		woman: 'women',
		fungus: 'fungi',
		cactus: 'cacti',
		stimulus: 'stimuli'
	};

	const _EN = /^[a-zA-Z]$/;

	// @ts-ignore
	return (getPlural = function (word, size?) {
		if (!_EN.test(word) || typeof size === 'boolean' && !size || (size !== undefined && size < 2)) {
			return word;
		}

		const lowercase = word.toLowerCase();

		const abnormal = ABNORMAL[lowercase];
		if (abnormal) {
			return abnormal;
		}

		const lastChars = word.substring(word.length - 2);

		switch (lastChars) {
			case 'fe':
				return FE.includes(lowercase) ? add (word, 'ves') : word + 's';

			case 'on':
				return ON.includes(lowercase) ? add(word, 'a') : word + 's';

			case 'sh':
			case 'ch':
				return word + 'es';

			case 'ay':
			case 'ey':
			case 'oy':
			case 'uy':
				return word + 's';

			case 'is':
				return add(word, 'es');
		}


		switch (lastChars.substring(1)) {
			case 'f':
				return F.includes(lowercase) ? add(word, 'ves', 1) : word + 's';

			case 'o':
				return word + (O.includes(lowercase) ? 'es' : 's');

			case 's':
			case 'x':
			case 'z':
				return word + 'es';

			case 'y':
				return add(word, 'ies', 1);
		}

		return word + 's';
	}).apply(this, arguments);

	function add(word: string, suffix: string, lastIndex = 2) {
		return word.substring(0, word.length - lastIndex) + suffix;
	}
}
