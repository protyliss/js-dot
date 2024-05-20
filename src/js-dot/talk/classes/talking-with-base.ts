export abstract class TalkingWithBase {
    protected _talkOperator: any;

    constructor(
        url_or_parent?: string | TalkingWithBase
    ) {
    }

    open(url) {
        this._talkOperator.open(url);
    }

    close() {
        this._talkOperator.close();
    }
}