export interface IBaseRequest<T> {
  payload?: Partial<T>;
  limit?: number;
  offset?: number;
  requestId: string;
}

export interface IBaseListResponse<T> {
  data: {
    payload: T;
    total: number;
  };
}

export interface IBaseResponse<T> {
  data: T;
}
