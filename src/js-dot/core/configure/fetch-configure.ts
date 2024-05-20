import {ConfigureBase} from './configure-base';

/**
 * Configure with fetch
 */
export class FetchConfigure extends ConfigureBase {
    protected _getExtendPath(originUrl: string, extendUrl: string) {
        return new URL(
            extendUrl,
            originUrl.indexOf('://') === -1 ?
                new URL(originUrl, location.href) :
                originUrl
        ).href;
    }

    protected _getContent(url: string) {
        return fetch(url, {
            headers: {
                contentType: 'application/json'
            }
        })
            .then(response => response.json())
    }
}
