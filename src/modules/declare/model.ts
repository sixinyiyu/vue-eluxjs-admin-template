import {BaseResource} from '@elux-admin-antd/stage/utils/resource';
import {BaseModel, effect, reducer} from '@elux/vue-web';
import {pathToRegexp} from 'path-to-regexp';
import {APPState} from '@/Global';
import api from './api';
import {DeclareResource, defaultListSearch, Region} from './entity';

export class Model extends BaseResource<DeclareResource> {
  protected api = api;
  protected defaultListSearch = defaultListSearch;

  public onMount(env: 'init' | 'route' | 'update'): void {
    console.warn('declare---onMount --> invoked');
    const {pathname, searchQuery} = this.getRouter().location;
    const [, admin = '', subModule = '', curViewStr = '', curRenderStr = '', id = ''] =
      pathToRegexp('/:admin/:subModule/:curView/:curRender/:id?').exec(pathname) || [];
    console.log(`resource===> ${subModule} | ${curViewStr} | ${curRenderStr}`);
    // 路由前缀eg: /admin/article
    const prefixPathname = ['', admin, subModule].join('/');
    // 判断是列表查询页、详情页、还是什么
    // 全靠这个页面初始化了
    super.onMount(env);
  }


  @effect()
  public async fetchRegionByParentCode(code: string): Promise<Region[]> {
    console.error('调用后端接口------->' + code)
    return await api.fetchRegionByParentCode(code);
  }
}
