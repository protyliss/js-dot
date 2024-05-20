export default `
# Thread.throttle

> @node-dot/work

Do you want run worker thread for only once when even it requested many times in time of timeout duration.

\'Thread.throttle\' override old request to new request in fast time.

main.js:

"""js

Thread.throttle({
   filename: 'worker.js',
   workerData: 1
});

Thread.throttle({
   filename: 'worker.js',
   workerData: 2
});

setTimeout(
    () => {
        Thread.throttle({
           filename: 'worker.js',
           workerData: 3
        });
    },
    1000
);

"""

worker.js:

"""js
import {workerData} from 'worker_thread';

console.log(workerData);
"""

main.js requested worker.js for 3 times with 1, 2, 3 as workerData
But worker.js display 2 and display 3 after 1 second.

`;