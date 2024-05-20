export abstract class ClassRendererBase<T = any> {
	protected constructor(protected target: T) {
	}

	protected _addClass(classNames: string[]) {
		(this.target as any).classList.add(...classNames);
	}

	protected _removeClass(classNames: string[]) {
		(this.target as any).classList.remove(...classNames);
	}
}
