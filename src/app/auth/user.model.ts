export class User {
  constructor(public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date) { }

    // it is a special type of property, implements a code that runs when accessing this property; ex user.token
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
     return this._token;
  }
}
