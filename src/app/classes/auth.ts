export class Auth {
  private _result;
  private _success;

  constructor(result: string, success: boolean) {
    this._result = result;
    this._success = success;
  }

  get result() {
    return this._result;
  }

  set result(value) {
    this._result = value;
  }

  get success() {
    return this._success;
  }

  set success(value) {
    this._success = value;
  }
}
