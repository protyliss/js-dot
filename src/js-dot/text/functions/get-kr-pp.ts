export type KrPP =
    | '이'
    | '가'
    | '으로'
    | '로'
    | '으로서'
    | '로서'
    | '으로써'
    | '로써'
    | '을'
    | '를'
    | '은'
    | '는'
    | '과'
    | '와'
    ;

/**
 * [With final, without final]
 */
const KR_PP: KrPP[] = [
    '이', '가',
    '으로', '로',
    '으로서', '로서',
    '으로써', '로써',
    '을', '를',
    '은', '는',
    '과', '와'
];

/**
 * Get Korean Postposition Word
 * @param word
 * @param pp
 */
export function getKrPp(word: string, pp: KrPP | string) {
    let lastCharCode = word.charAt(word.length - 1).charCodeAt(0);

    if (44032 > lastCharCode && lastCharCode < 55203) {
        return '';
    }

    let supported = KR_PP.indexOf(pp as KrPP);
    if (supported < 0) {
        return '';
    }

    const hasFinalSound = (lastCharCode - 0xac00) % 28 > 0;

    return KR_PP[
        hasFinalSound ?
            supported % 2 ? supported - 1 : supported :
            supported % 2 ? supported : supported + 1
        ];
}
