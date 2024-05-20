import {BehaviorSubject, Observable, withLatestFrom} from 'rxjs';
import {skip} from 'rxjs/operators';

export class RxUrlSearchCaster {
    protected _searches = new Map<string, { subject: BehaviorSubject<any>, skipped: Observable<any> }>();

    protected _searchParams = {};

    setSearch(searchString: string) {
        const {_searches} = this;
        const searchParams = new URLSearchParams(searchString);
        this._searchParams = searchParams;

        for (const [key, {subject}] of _searches) {
            const value = searchParams[key];
            console.log('set', key, value);
            subject.next(value === undefined ?
                undefined :
                value
            );
        }
    }

    search(names: string[]): Observable<any>;
    search<T = string>(name: string): Observable<T>
    search(name_or_names) {
        if (Array.isArray(name_or_names)) {
            const end = name_or_names.length;
            let current = -1;
            const subjects = [];
            while (--current < end) {
                subjects[current] = this.search(name_or_names[current]);
            }

            return subjects[0].pipe(withLatestFrom(...subjects.slice(1)));
        }

        const name = name_or_names;
        const {_searches} = this;
        let search = _searches[name];

        if (search) {
            return search.observable;
        }

        const {_searchParams} = this;

        const value = _searchParams[name];

        console.log('get', name, value);
        let subject = new BehaviorSubject(value);

        let observable = value === undefined ?
            subject.pipe(skip(1)) :
            subject;

        _searches[name] = {
            subject,
            observable
        };

        return observable;
    }
}
