import {HttpOption, HttpPipe, HttpRequester, HttpRequesterConstructor} from '@js-dot/api/http';

interface CloneOption {
    /**
     * @default false
     */
    keepTransform: boolean
}

/**
 * Get API Clone
 * `DotApiInterface` Pipe Operator Factory
 */
export function clone$<P, B, R, NP, NB, NR>(option?: CloneOption)
    : HttpPipe<P, B, R, P, B, R> {
    return http => {
        const asset = {...http.meta};

        option = {
            keepTransform: false,
            ...(option || {})
        };

        if (option) {
            if (!option.keepTransform) {
                asset.transforms = {
                    responses: [],
                    requests: []
                }
            }
        }

        const OperatorClass = http.constructor as HttpRequesterConstructor;
        return new OperatorClass(asset) as any;
    }
}
