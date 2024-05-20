import {hasGlob} from './has-glob';

describe('hasGlob', () => {
   test('default', () => {
       expect(hasGlob('*.txt')).toBe(true);
       expect(hasGlob('?.txt')).toBe(true);
       expect(hasGlob('{foo, bar}.txt')).toBe(true);
       expect(hasGlob('**/foo.txt')).toBe(true);
       expect(hasGlob('foo.txt')).toBe(false)
   });
});