export class CookieProcessor {
  getSessionCookieExpirationDate() {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  }

  getSetCookieHeader(cookieName: string, cookieValue: string, expirationDate: Date) {
    return `${cookieName}=${cookieValue}; Expires=${expirationDate.toUTCString()}; Path=/; HttpOnly`;
  }
}

export const cookieProcessor = new CookieProcessor();
