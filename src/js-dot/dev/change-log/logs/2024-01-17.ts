export default `
# 2024-01-17

Deprecated:

* csvEncode(), Use CSV.stringify() instead.
* csvEncodeFromObject(), Use CSV.stringify() instead.
* csvEncodeFromArray(), Use CSV.stringify() instead.
* csvDecode(), Use CSV.parse() instead.
* csvDecodeToArray(), Use CSV.parse() instead.

Moved:

* @js-dot/core to @js-dot/dev/compatible
	- renamedTo
	- movedTo
* @js-dot/data to @js-dot/data/frame.
	- frameInterpolate()
	- frameStringify()
	- frameToXYSeries()
	- frameToXYSeriesSet()
	- fromDataArrayKeySeries()
	- fromDataArraySeries()
	- fromDataMapKeySeries()
	- fromDataMapSeries()
	- fromDataSeries()
	- fromTimeSeriesArrayMap()
	- getTimeSeriesFromFrame()
	- transpose()

Added:

* INI namespace for Operating INI File.
* CSV namespace for Operating CSV File.
`;
