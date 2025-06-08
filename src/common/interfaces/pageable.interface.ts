export interface Pageable {
  index: number;
  length: number;
}

export interface PageMeta {
  index: number;
  length: number;
  lastIndex: number;
  totalCount: number;
}

export interface Page<Data> {
  meta: PageMeta;
  data: Data[];
}
