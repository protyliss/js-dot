const _TAG = /<\/?[a-z][\w\-]*("[^"]+"|'[^']+'|[^>])*>/g;

export function stripTag(html: string, replace = '') {
    return typeof html === 'string' && html.length ?
        html.replace(_TAG, replace) :
        '';
}
