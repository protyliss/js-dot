import {HttpResponse} from './http-response';

/**
 * Response of Http Error
 */
export class HttpError extends HttpResponse {
	get message() {
		return this.originResponse['message'];
	}
}
