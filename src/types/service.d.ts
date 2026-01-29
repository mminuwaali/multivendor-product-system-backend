declare interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

declare interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}
