import {BaseResource} from '@elux-admin-antd/stage/utils/resource';
import {pathToRegexp} from 'path-to-regexp';
import api from './api';
import {ArticleResource, defaultListSearch, RouteParams} from './entity';

export class Model extends BaseResource<ArticleResource> {
  protected api = api;
  protected defaultListSearch = defaultListSearch;


  protected extraRoute(): RouteParams {
    console.log('article 模块 extraRoute invoked');
    const routeParams: RouteParams  = {prefixPathname: 'article', curView: 'list'};
    return routeParams;
  }

  public onMount(env: 'init' | 'route' | 'update'): void {
    console.warn('article---onMount --> invoked');
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
}
