import 'cookies-js';

export default class CookiesStorage {
  constructor(
    cookies: CookiesStatic,
    options?: {
      keyPrefix?: string;
      indexKey?: string;
      expiration?: any;
      cookieOptions?: CookieOptions;
    },
  );

  getItem(key: string): Promise<string>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}
