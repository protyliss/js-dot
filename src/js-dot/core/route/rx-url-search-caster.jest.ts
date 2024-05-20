import {RxUrlSearchCaster} from './rx-url-search-caster';
import {lastValueFrom, tap} from 'rxjs';

describe('rxUrlSearchCaster', () => {

    const caster = new RxUrlSearchCaster();


    it('single', () => {
        caster.setSearch('?foo=1');

        expect(
            lastValueFrom(caster.search('foo')
                .pipe(tap(res => {
                    console.log(res);
                }))
            )
        ).resolves.toBe(1);
    });

    it('multi', () => {
        caster.setSearch('?foo=1&bar=2');
        expect(
            lastValueFrom(caster.search(['foo', 'bar']))
        )
            .resolves
            .toBe({foo: 1, bar: 2});
    })

});
