const _FIXERS = /([+-]\s*)?(\d*)\s*(min(?:utes?)?|y(?:ears?)?|m(?:on(?:ths?)?)?|d(?:ays?)?|h(?:ours?)?|i|s(?:ec(?:onds?)?)?)/ig;
const _FIXER = /([+-]\s*)?(\d*)([^\d]{1,2})/;

export function dateModify(format: string, date = new Date): Date {
    const time = new Date(date.getTime());

    let seconds = 0;

    const matched = format.match(_FIXERS);

    if (!matched) {
        return time;
    }

    const end = matched.length;
    let current = -1;

    while(++current < end){
        const split = matched[current].match(_FIXER);
        const value = +(split[1] === '-' ? -(split[2] || 1) : split[2] || 1);

        if (!value) {
            return undefined;
        }

        const unit = split[3];

        switch (unit) {
            case 'y':
            case 'ye':
                time.setFullYear(time.getFullYear() + value);
                break;
            case 'm':
            case 'mo':
                const months = time.getMonth() + value;

                if (months < 12) {
                    time.setMonth(months);
                } else {
                    time.setFullYear(
                        time.getFullYear()
                        + Math.ceil(months / 12)
                    );

                    time.setMonth(months % 12);
                }
                break;
            case 'd':
            case 'da':
                seconds += value * 86400;
                break;

            case 'h':
            case 'ho':
                seconds += value * 3600;
                break;
            case 'i':
            case 'mi':
                seconds += value * 60;
                break;
            case 's':
            case 'se':
                seconds += value;
                break;
        }
    }

    return new Date(time.getTime() + (seconds * 1000));
}
