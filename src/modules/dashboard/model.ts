import {BaseModel} from '@elux/vue-web';
import {pathToRegexp} from 'path-to-regexp';
import {CurView} from './entity';

export interface ModuleState {
  curView?: CurView;
}

interface RouteParams {
  curView?: CurView;
}

export class Model extends BaseModel<ModuleState> {
  protected routeParams!: RouteParams;
  protected privateActions = this.getPrivateActions({});

  protected getRouteParams(): RouteParams {
    const {pathname} = this.getRouter().location;
    console.warn('<dashboard当前>:', pathname);
    // 按/分隔
    const [, , , curViewStr = ''] = pathToRegexp('/:admin/:dashboard/:curView').exec(pathname) || [];
    const curView: CurView | undefined = CurView[curViewStr] || undefined;
    console.log('curView = ' + curView);
    return {curView};
  }

  public onMount(): void {
    // 完成当前模块的 ModuleState 的初始化
    this.routeParams = this.getRouteParams();
    const {curView} = this.routeParams;
    const initState: ModuleState = {curView};
    this.dispatch(this.privateActions._initState(initState));
  }
}
