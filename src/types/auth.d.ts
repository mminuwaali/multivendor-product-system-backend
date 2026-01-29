declare interface IJwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}
