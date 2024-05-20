import {startAt} from './start-at';

describe('startAt', () => {
   test('http://localhost/path/name/to to path/name/to', () => {
      expect(startAt('http://localhost/path/name/to', '://', '/')).toBe('path/name/to');
   });

   test('/path/name/to to path/name/to', () => {
      expect(startAt('/path/name/to', '://', '/')).toBe('path/name/to');
   });
});
