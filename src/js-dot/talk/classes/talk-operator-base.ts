export abstract class TalkOperatorBase {
    protected _talkOperator: any;

    constructor(
        url_or_parent?: string | TalkOperatorBase
    ) {
    }

    open(url) {
        this._talkOperator.open(url);
    }

    close() {
        this._talkOperator.close();
    }
}