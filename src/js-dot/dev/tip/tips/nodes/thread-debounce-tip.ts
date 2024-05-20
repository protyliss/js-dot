export default `
# Thread.debounce

> @node-dot/work

Your worker thread should be run only with latest workerData?

\`Thread.debounce\` ignore old request when new request.

main.js:

"""js
Thread.debounce({
    filename: 'worker.js',
    workerData: 1
});

Thread.debounce({
    filename: 'worker.js',
    workerData: 2
});

Thread.debounce({
    filename: 'worker.js',
    workerData: 3
});
"""

worker.js:

"""js
import {workerData} from 'worker_thread';

console.log(workerData);
"""

main.js requested worker.js for 3 times with 1, 2, 3 as workerData
But worker.js display only 3.
`;