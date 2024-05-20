export default `
# 2024-05-10

Prepare for Stage 3 Decorators.
Stage 3 decorators may not support depending on tsconfig.json and bundler options.

Stage 2 decorators are still available, but real processing in stage 3 decorator.


## @js-dot/core

* Stage 3 decorators are added.
	- \`@debounce()\`
	- \`@throttle()\`
	- \`@syncLocal()\`
		- \`@WithLocal()\` renamed to \`@SyncLocal()\`
	- \`@syncSession()\`
		- \`@WithSession()\` renamed to \`@SyncSession()\`
* Stage 3 decorator transform functions are added, makes Stage 2 decorator from stage 3 decorator.
	- \`downgradeClassDecorator()\`
	- \`downgradeMethodDecorator()\`
	- \`downgradePropertyDecorator()\`


## @js-dot/frame

- \`@reliable()\` decorator is added.

`;