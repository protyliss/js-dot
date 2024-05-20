import {DateDigitUnits} from './date-digit-units';
import {DateStringUnits} from './date-string-units';
import {DateParts} from './date-parts';

export class DateUnits {
    digits!: DateDigitUnits;
    strings!: DateStringUnits;

    constructor(date?: Date) {
        const parts = new DateParts(date);
        this.digits = new DateDigitUnits(parts);
        this.strings = new DateStringUnits(parts);
    }
}
