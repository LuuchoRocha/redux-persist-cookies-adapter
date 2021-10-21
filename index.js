export default class CookiesStorage {
  constructor(cookies, options = {}) {
    this.getItem = this.getItem.bind(this);
    this.setItem = this.setItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this._getAll = this._getAll.bind(this);

    this.cookies = cookies;
    this.indexKey = options?.indexKey || 'reduxPersistIndex';
    this.keyPrefix = options?.keyPrefix || '';
    this.expiration = options?.expiration || {};
    this.cookieOptions = options?.cookieOptions;

    if (!this.expiration.default) {
      this.expiration.default = null;
    }
  }

  async getItem(key) {
    return this.cookies.get(this.keyPrefix + key) || null;
  }

  async setItem(key, value) {
    const options = Object.assign({}, this.cookieOptions);
    let expires = this.expiration.default;

    if (this.expiration[key]) {
      expires = this.expiration[key];
    }

    if (expires) {
      options['expires'] = expires;
    }

    this.cookies.set(this.keyPrefix + key, value, options);

    const indexOptions = Object.assign({}, {expires: this.expiration.default}, this.cookieOptions);
    const allKeys = await this._getAll();

    if (allKeys.indexOf(key) === -1) {
      allKeys.push(key);
      this.cookies.set(this.indexKey, JSON.stringify(allKeys), indexOptions);
    }
  }

  async removeItem(key) {
    this.cookies.expire(this.keyPrefix + key);
    this.cookies.set(
      this.indexKey,
      JSON.stringify(
        this._getAll().filter(function (k) {
          return k !== key;
        }),
      ),
    );
  }

  _getAll() {
    const cookie = this.cookies.get(this.indexKey);
    return cookie ? JSON.parse(cookie) : [];
  }
}
