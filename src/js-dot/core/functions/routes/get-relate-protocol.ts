export function getRelateProtocol(relateUrl: string, requestProtocol = 'http') {
    const delimiterIndex = relateUrl.indexOf('://');

    if (delimiterIndex > 0) {
        const protocol    = relateUrl.substr(0, delimiterIndex);
        const tlsProtocol = protocol.endsWith('s');
        return requestProtocol.endsWith('s') && requestProtocol !== 'ws' ?
            tlsProtocol ?
                requestProtocol :
                requestProtocol.slice(1) :
            tlsProtocol ?
                requestProtocol + 's' :
                requestProtocol
    }

    return requestProtocol;
}
