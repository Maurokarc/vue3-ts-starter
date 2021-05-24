export interface resultDTO {
  isSucceed: boolean;
  resultCode: number;
  message: string;
  meta?: any;
  dataSet: { [key: string]: object };
}
