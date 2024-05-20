import {changeLog} from '@js-dot/dev';
import {changeLogging} from '../functions/change-logging';

changeLog(
	{
		'2024-05-10': () => import('./logs/2024-05-10'),
		'2024-05-06': () => import('./logs/2024-05-06'),
		// '2024-03-18': () => import('./logs/2024-03-18'),
		// '2024-03-14': () => import('./logs/2024-03-14'),
		// '2024-03-05': () => import('./logs/2024-03-05'),
		// '2024-02-15': () => import('./logs/2024-02-15'),
		// '2024-02-06': () => import('./logs/2024-02-06'),
		// '2024-01-17': () => import('./logs/2024-01-17'),
		// '2024-01-14': () => import('./logs/2024-01-14'),
		// '2024-01-10': () => import('./logs/2024-01-10'),
		// '2023-12-10': () => import('./logs/2023-12-10')
		// '2023-03-17': () => import('./logs/2023-03-17'),
		// '2023-02-24': () => import('./logs/2023-02-24')
	})
	.then(
		changeLogging(
			'js.',
			(method, ...args) => console[method](...args)
		)
	);
