/**
 * Stage 3 Class Decorator
 */
export interface ClassDecorator3 {
	(target: new(...args: any) => any, context: ClassDecoratorContext): (...args: any[]) => void | (new(...args: any) => any);
}

/**
 * Stage 3 Class Decorator factory
 */
export interface ClassDecorator3Factory {
	(...args: any[]): ClassDecorator3;
}

/**
 * Stage 3 Class Method Decorator
 */
export interface ClassMethodDecorator3 {
	(target: Function, context: ClassMethodDecoratorContext): ((...args: any[]) => any)
}

/**
 * Stage 3 Class Method Decorator factory
 */
export interface ClassMethodDecorator3Factory {
	(...args: any[]): ClassMethodDecorator3;
}


export interface ClassPropertyDecorator3 {
	(target: Function,
	 context: ClassFieldDecoratorContext
		 | ClassGetterDecoratorContext
		 | ClassSetterDecoratorContext
	): () => void;
}

export interface ClassPropertyDecorator3Factory {
	(...args: any[]): ClassPropertyDecorator3;
}