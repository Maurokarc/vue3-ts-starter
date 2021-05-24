export interface Identity {
  userId: number;
  userName: string;
  authorizeTime?: Date;
  expireTime?: Date;
}
