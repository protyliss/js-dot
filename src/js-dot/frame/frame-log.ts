import {PrimitiveLogger} from '@js-dot/core';


/**
 * console for frame module
 */
export const FRAME_LOG = new PrimitiveLogger({
		rely: 'info',
		relyify: 'debug',
		reliable: 'debug'
});

/**
 * @deprecated Renamed to FRAME_LOG
 */
export const FrameLogger = FRAME_LOG;