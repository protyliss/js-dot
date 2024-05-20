const EARTH_RADIUS = 6378.137; // as km
const {PI, sin, cos, sqrt, atan2} = Math;

export function getDistance(fromLng: number, fromLat: number, toLng: number, toLat: number): number;
export function getDistance(from: [number, number], to: [number, number]): number;
export function getDistance(from_or_fromLng, to_or_fromLat, toLng?, toLat?) {

	let fromLng = from_or_fromLng;
	let fromLat = to_or_fromLat;

	if (Array.isArray(fromLng)) {
		toLat = fromLat[1];
		toLng = fromLat[0];
		fromLat = fromLng[1];
		fromLng = fromLng[0];
	}
	
	const distanceLat = toLat * PI / 180 - fromLat * PI / 180;
	const distanceLng = toLng * PI / 180 - fromLng * PI / 180;
	const a = sin(distanceLat / 2) * sin(distanceLat / 2) + cos(fromLat * PI / 180) * cos(toLat * PI / 180) * sin(distanceLng / 2) * sin(distanceLng / 2);
	const c = 2 * atan2(sqrt(a), sqrt(1 - a));
	const d = EARTH_RADIUS * c;
	return d * 1000;
}