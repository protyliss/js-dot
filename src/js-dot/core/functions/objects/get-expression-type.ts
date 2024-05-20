import {_EMAIL, _NUMERIC} from '@js-dot/core';
import {_IP, _TIMESTAMP, _UNIX_TIME} from '../../constants/regex';

export type ExpressionType =
    | 'timestamp'
	| 'email'
    | 'ip'
	| 'host'
	| 'numeric'
    ;

export function getExpressionType(data: number | string): ExpressionType {
    const TEST_MAP: Record<'number' | 'string', Array<[ExpressionType, RegExp]>> = {
        number: [
            ['timestamp', _UNIX_TIME],
			['numeric', _NUMERIC]
        ],
        string: [
            ['ip', _IP],
			['email', _EMAIL],
            ['timestamp', _TIMESTAMP],
            ['timestamp', _UNIX_TIME]
        ]
    }

    // @ts-ignore
    return (getExpressionType = function (data) {
        if (!data) {
            return;
        }

        const expressions = TEST_MAP[typeof data];

        if (!expressions) {
            return;
        }

        let current = expressions.length;

        data = '' + data;

        while (current-- > 0) {
            const [type, rule] = expressions[current];
            if (rule.test(data)) {
                return type;
            }
        }
    }).apply(this, arguments);
}
