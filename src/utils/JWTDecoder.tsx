export type Role = "USER" | "ADMIN";

export type JwtPayload = {
  sub?: string;
  username?: string;
  role?: Role;
  exp?: number;
};

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return null;

    const json = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}
