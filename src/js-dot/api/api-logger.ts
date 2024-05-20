import { PrimitiveLogger } from "@js-dot/core";

/**
 * console for api module
 */
export const API_LOG = new PrimitiveLogger({
	debug: 'debug'
});

/**
 * @deprecated Renamed to API_LOG
 */
export const ApiLogger = API_LOG;