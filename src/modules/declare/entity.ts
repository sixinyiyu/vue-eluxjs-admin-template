import {
  BaseCurRender,
  BaseCurView,
  BaseListItem,
  BaseListSearch,
  Pagination,
  BaseModuleState,
  BaseRouteParams,
  DefineResource,
  IRequest,
  enumOptions,
} from '@elux-admin-antd/stage/utils/base';

export type CurView = BaseCurView;
export type CurRender = BaseCurRender & 'attach';


// 列表搜索
export interface ListSearch extends BaseListSearch {
  province?: string;
  city?: string;
  country?: string;
  community?: string;
  year?: number;
  status?: number;
}

// 子项实体
export interface ListItem extends BaseListItem {
  province: string;
  city: string;
  country: string;
  community: string;
  address: string;
  status: string[];
  createdTime: number;
}

export interface Region {
  code: string;
  value: string;
  child: Region[];
}

export interface ItemDetail extends ListItem {}

// export type UpdateItem = Pick<ItemDetail, 'title' | 'summary' | 'content' | 'editors'>;

export type ListSearchFormData = Omit<ListSearch, keyof BaseListSearch>;

export type IGetList = IRequest<ListSearch, {items: ListItem[]; pagination: Pagination}>;
export type IGetItem = IRequest<{id: string}, ItemDetail>;
export type IReion = IRequest<string, Region[]>;

export enum Status {
  '待审核' = 1,
  '已退回' = 0,
  '待复核' = 2,
  '待公示' = 3,
}
export const DStatus = enumOptions(Status);

export type RouteParams = BaseRouteParams<DeclareResource>;
export type ModuleState = BaseModuleState<DeclareResource>;

export interface DeclareResource extends DefineResource {
  RouteParams: RouteParams;
  ModuleState: ModuleState;
  ListSearch: ListSearch;
  ListItems: ListItem;
  Pagination: Pagination;
  CurView: CurView;
  ItemDetail: ItemDetail;
  CurRender: CurRender;
}

export const defaultListSearch: ListSearch = {
  pageIndex: 1,
  pageSize: 10,
  // sorterOrder: undefined,
  // sorterField: '',
};
