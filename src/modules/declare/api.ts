import {BaseApi} from '@elux-admin-antd/stage/utils/base';
import request from '@elux-admin-antd/stage/utils/request';
import {IGetList, IReion, IGetItem} from './entity';

export class API implements BaseApi {
  public getList(params: IGetList['Request']): Promise<IGetList['Response']> {
    console.log('-------------> declare api invoke');
    return request.get<IGetList['Response']>('/api/performance/search', {params}).then((res) => {
      return res.data;
    });
  }

  public getItem(params: IGetItem['Request']): Promise<IGetItem['Response']> {
    if (!params.id) {
      return Promise.resolve({} as any);
    }
    return request.get<IGetItem['Response']>(`/api/performance/${params.id}`).then((res) => {
      return res.data;
    });
  }

  public fetchProvinces(): Promise<IReion['Response']> {
    return request.get<IReion['Response']>('/api/region/province', {}).then((res) => {
      return res.data;
    });
  }

  public fetchRegionByParentCode(code: IReion['Request']): Promise<IReion['Response']> {
    console.log('-------------> declare api invoke');
    return request.get<IReion['Response']>(`/api/region/fetch-by-parent-code/${code}`, {}).then((res) => {
      return res.data;
    });
  }
}

export default new API();
