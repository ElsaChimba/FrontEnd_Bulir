export type JwtPayload = {
  id: any;
  sub: string;
  email: string;
  role: 'CLIENT' | 'PROVIDER';
};
