import {$keyframes} from './$keyframes';

describe('$keyframe', () => {
	it('object', () => {
		expect(
			$keyframes('foo', {
				'100%': {
					opacity: 0
				}
			})
		)
			.toBe(`@keyframe foo {
100% {
opacity: 0
}
}`)
	});
});
