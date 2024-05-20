import {h1, tip} from '@js-dot/dev';


tip([
	() => import('./tips/commons/rely/rely-tip'),
	() => import('./tips/commons/rely/rely-token-tip'),
	() => import('./tips/commons/rely/relyify-basic-tip'),
	() => import('./tips/commons/rely/relyify-intercept-tip'),
	() => import('./tips/commons/rely/reliabled-tip'),
	() => import('./tips/commons/rely/reliably-tip'),
	() => import('./tips/commons/dynamic/dynamic-tip'),
	...(
		typeof window === 'object' ?
			[
				() => import('./tips/browsers/class-toggle-tip'),
				() => import('./tips/browsers/class-switch-tip')
			] :
			[
				() => import('./tips/nodes/thread-throttle-tip')
			]
	)
])
	.then(({heading, content}) => {
		console.group(h1(`[js.] ${heading}`));
		console.info(content);
		console.groupEnd();
	})

export default null;
