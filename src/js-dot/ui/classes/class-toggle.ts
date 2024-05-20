/**
 * Set Class Name by Boolean
 * @example
 * ```js
 * const classToggle = new ClassToggle(document.body, '_true', '_false');
 *
 * // body[className=_true]
 * classToggle.set(true);
 *
 * // body[className=_false]
 * classToggle.set(false);
 *
 * // body[className=]
 * classToggle.pop();
 * ```
 */
export class ClassToggle {
    protected _classList: DOMTokenList;

    protected _whenTrue: string;
    protected _whenFalse: string;

    protected _lastFlag: boolean;

    constructor(node: Element, whenTrue?: string, whenFalse?: string) {
        this._classList = node.classList;

        this._whenTrue = whenTrue;
        this._whenFalse = whenFalse;
    }

    /**
     * Set Enabled Class Name and Disabled Class Name as Optional
     * @param whenTrue
     * @param whenFalse
     */
    setClassName(whenTrue: string, whenFalse?: string) {
        this._whenTrue = whenTrue;
        this._whenFalse = whenFalse;
        return this;
    }

    /**
     * Set Enabled Class Name
     * @param whenTrue
     */
    setTrueClassName(whenTrue) {
        this._whenTrue = whenTrue;
        return this;
    }

    /**
     * Disabled Class Name
     * @param whenFalse
     */
    setFalseClassName(whenFalse: string) {
        this._whenFalse = whenFalse;
        return this;
    }

    /**
     * Set Class Toggle State
     * @param flag
     */
    set(flag = true) {
        const {_classList, _whenTrue, _whenFalse} = this;

        if (flag === this._lastFlag) {
            return this;
        }

        this._lastFlag = flag;

        if (flag) {
            _whenFalse && _classList.remove(_whenFalse);
            _classList.add(_whenTrue);
        } else {
            _whenFalse && _classList.add(_whenFalse);
            _classList.remove(_whenTrue);
        }

        return this;
    }

    /**
     * Remove Class Names
     */
    pop() {
        if (this._lastFlag === undefined) {
            return this;
        }

        this._classList.remove(
            this._whenTrue,
            this._whenFalse
        );

        return this;
    }

    /**
     * Apply Truthy Class Name
     * @param flag
     */
    enable(flag = true) {
        this.set(flag);
    }

    /**
     * Apply Falsy Class Name
     * @param flag
     */
    disable(flag = true) {
        return this.enable(!flag);
    }
}
