export default `
# 2024-05-06

## @js-dot/core

* Typings
	- \`Property\` type is removed.
	- \`FunctionProperty\` type is renamed to \`ExtractMethod\`
	- \`NoneFunctionProperty\` type is renamed to \`ExtractProperty\`
	- \`FunctionPropertyName\` type is deprecated, Use \`keyof ExtractMethod\` instead.
	- \`NoneFunctionPropertyName\` type is deprecated, Use \`keyof ExtractProperty\` instead.
	- \`TypedPropertyName\` type is deprecated, Use \`keyof ExtractMember\`
	- \`ExcludeProperty\` type is deprecated, Use \`Omit\`
	- \`ExcludePropertyFrom\` type is deprecated, Use \`Omit\`
	- \`ExtractTypedPropertyName\` type is deprecated, Use \`keyof ExtractMember\`
	* \`ToRequired\` type added, make partial optional property to required property.
	* \`WeakenParameters\` type added, ignore type errors when reference of dynamic method.
	* \`WeakenReturnType\` type added, ignore type errors when reference of dynamic method.
* \`IteratorBase\` class
	- \`._items\` property is removed, Use \`$$items\` symbol instead.
	- \`._iterMap()\` method is removed, Use \`$$map\` symbol instead.
	- \`._iterFilter()\` method is removed, Use \`$$filter\` symbol instead.
	- \`._map()\` method is removed, Use \`$$map\` symbol instead.
	- \`._filter()\` method is removed, Use \`$$filter\` symbol instead.
	- \`ObjectIteratorBase\` renamed to \`ObjectEntriesIteratorBase\`
* \`Bulk\` class
	- \`.apply()\` method added.
	- \`.call()\` method added.
* \`PrimitiveLogger\` is added.


## @js-dot/frame

* \`relyifiable()\` function accept tokens as array
* \`@Reliable()\` decorator
	- Accept any meta argument as rely token except Object type
	- No longer apply \`constructor.name\` to rely-ify
		- Use explicit token like \`@Reliable({token: 'FooClass'}) class Foo {}\`, instead
* \`FrameLogger\` renamed to \`FRAME_LOG\`, extends \`PrimitiveLogger\`

	
## @js-dot/api

* \`ApiLogger\` renamed to \`API_LOG\`, extends \`PrimitiveLogger\`
`;