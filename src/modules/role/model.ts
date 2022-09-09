import {BaseResource} from '@elux-admin-antd/stage/utils/resource';
import { mergeDefaultParams } from '@elux-admin-antd/stage/utils/tools';
import { pathToRegexp } from 'path-to-regexp';
import api from './api';
import {MemberResource, defaultListSearch, RouteParams, CurView, CurRender} from './entity';

export class Model extends BaseResource<MemberResource> {
  protected api = api;
  protected defaultListSearch = defaultListSearch;


  protected extraRoute(): RouteParams {
    console.log('system 模块 extraRoute invoked');
    const {pathname, searchQuery} = this.getRouter().location;
    //   /admin/system/role/list/maintain
    const [, admin = '', subModule = '', curViewStr = '', curRenderStr = '', id = ''] =
    pathToRegexp('/:admin/:subModule/:curView/:curRender/:id?').exec(pathname) || [];
    console.log(`resource===>  ${subModule} | ${curViewStr} | ${curRenderStr}`);
    const curView = curViewStr as CurView;
    const curRender = curRenderStr as CurRender;
    // const curModule = curModuleStr as CurModule;
    const prefixPathname = ['', admin, subModule].join('/');
    const routeParams: RouteParams = { prefixPathname, curView};
    if (curView === 'list') {
      routeParams.curRender = curRender || 'maintain';
      const listQuery = this.parseListQuery(searchQuery);
      routeParams.listSearch = mergeDefaultParams(this.defaultListSearch, listQuery);
    } else if (curView === 'item') {
      routeParams.curRender = curRender || 'detail';
      routeParams.itemId = id;
    }
    return routeParams;
  }
}
