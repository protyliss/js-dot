import {HttpRequest} from '@js-dot/api/http';

export const API_MEMORIES: Record<string, any> = {};

export function defaultMemoryId(request: HttpRequest) {
    const {url} = request;
    return url.indexOf('://') > -1 ? '/' + url.split('/').slice(3).join('/') : url;


}
