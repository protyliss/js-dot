export type ParsableAgentOs =
    | 'windows'
    | 'linux'
    | 'macos'
    | 'android'
    | 'ios'
    | 'unknown'
    ;

export type ParsableAgentBrowser =
    | 'chrome'
    | 'edge'
    | 'opera'
    | 'firefox'
    | 'safari'
    | 'ie'
    | 'samsungbrowser'
    | 'wget'
    | 'unknown'

export type ParsedAgent = {
        os: ParsableAgentOs;
        osVersion: number | 'unknown';
        browser: ParsableAgentBrowser;
        browserVersion: number | 'unknown';
        mobile: boolean;
    }
    & Partial<Record<ParsableAgentOs, number | 'unknown'>>
    & Partial<Record<ParsableAgentBrowser, number | 'unknown'>>

export function parseAgent(agent: string): ParsedAgent {
    const _AGENT_SEGMENT = /([^\/\s,]+)(?:\/([^\(\s]+)(?:\s*\(([^)]+)\))?)?/g
    const _DETAILS = /([a-z][^;,()]*)/g;
    const _DETAIL_SEGMENT = /([^\s\/:]*)(?:[\s\/:](.+))?$/;
    const _UNDERBAR = /_/g;
    const _NOT_NUMERIC = /[^\d.]/g;

    const PROPERTIES: Array<{
        target: string,
        conditions: [string, string?, string?, Record<number, any>?][]
    }> = [
        {
            target: 'os',
            conditions: [
                ['ipad', 'ios', 'os'],
                ['iphone', 'ios', 'os'],
                ['ipod', 'ios', 'os'],
                ['macintosh', 'macos', 'os x'],
                ['linux'],
                ['android'],
                [
                    'windows',
                    null,
                    null,
                    {
                        10.0: 10,
                        6.3: 8.1,
                        6.2: 8,
                        6.1: 7,
                        6.0: 'vista',
                        5.2: 'xp',
                        5.1: 'xp',
                        5: '2000'
                    }
                ]
            ]
        },
        {
            target: 'browser',
            conditions: [
                ['safari'],
                ['samsungbrowser'],
                ['opera'],
                ['firefox'],
                ['trident', 'ie'],
                ['msie', 'ie'],
                ['headlesschrome', 'chrome'],
                ['chromium', 'chrome'],
                ['chrome'],
                ['edge']
            ]
        }
    ]

    // @ts-ignore
    return (parseAgent = function (agent) {
        agent = agent.toLowerCase();

        const segments = agent.match(_AGENT_SEGMENT);

        let current = segments.length;
        const meta = {};
        while (current-- > 0) {
            const segment = segments[current];
            const slashIndex = segment.indexOf('/');
            if (slashIndex > -1) {
                const name = segment.substr(0, slashIndex);
                const spaceIndex = segment.indexOf(' ');
                if (spaceIndex > -1) {
                    meta[name] = segment.substring(slashIndex + 1, spaceIndex);
                    const details = segment.slice(spaceIndex).match(_DETAILS);
                    let detailCurrent = details.length;
                    while (detailCurrent-- > 0) {
                        const detail = details[detailCurrent]
                        const detailMatched = detail.match(_DETAIL_SEGMENT);
                        meta[detailMatched[1]] = detailMatched[2] || true;
                    }
                } else {
                    meta[name] = segment.substring(slashIndex + 1);
                }
            } else {
                meta[segment] = null;
            }
        }

        if (meta['wget']) {
            return {
                os: 'linux',
                osVersion: 'unknown',
                linux: 'unknown',
                browser: 'wget',
                browserVersion: meta['wget'],
                wget: meta['wget']
            }
        }

        const result: ParsedAgent = {
            os: 'unknown',
            osVersion: 'unknown',
            browser: 'unknown',
            browserVersion: 'unknown',
            mobile: false
        };

        current = PROPERTIES.length;
        while (current-- > 0) {
            const {target, conditions} = PROPERTIES[current];
            let conditionCurrent = conditions.length;
            while (conditionCurrent-- > 0) {
                const [property, rename, versionPrefix, reversions] = conditions[conditionCurrent];
                const value = meta[property];
                if (!value) {
                    continue;
                }

                let version = parseFloat(
                    (
                        versionPrefix ? agent.split(versionPrefix)[1] :
                            meta['version'] || meta['rv'] || value
                    )
                        .replace(_UNDERBAR, '.')
                        .replace(_NOT_NUMERIC, '')
                );

                if (reversions) {
                    const reversion = reversions[version];
                    if (reversion) {
                        version = reversion;
                    }
                }
                const name = rename || property;
                result[target] = name;
                result[name] = version || 'unknown';
                result[target + 'Version'] = result[name]
                break;
            }
        }

        result.mobile = !!(meta['mobile'] || meta['android'] || meta['ios']);
    }).apply(this, arguments);
}
