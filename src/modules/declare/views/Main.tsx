import ErrorPage from '@elux-admin-antd/stage/components/ErrorPage';
import {Switch, connectStore, exportView} from '@elux/vue-web';
import {defineComponent, onMounted} from 'vue';
import {APPState} from '@/Global';
import {CurRender, CurView, ItemDetail} from '../entity';
import Index from './Index';
import Maintain from './Maintain';
import Detail from './Detail';
import Attach from './Attach';

export interface StoreProps {
  curView?: CurView;
  curRender?: CurRender;
  itemDetail?: ItemDetail;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {curView, curRender, itemDetail, } = appState.declare!;
  return {curView, curRender, itemDetail};
}

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);

    onMounted(() => {
      console.warn(`declare--->onMount : ${storeProps.curView} | ${storeProps.curRender}`);
    });

    return () => {
      const {curView, curRender, dispatch, itemDetail} = storeProps;
      return <Switch elseView={<ErrorPage />}>
        {curView === 'list' && curRender === 'maintain' && <Maintain  dispatch={dispatch}/>}
        {curView === 'list' && curRender === 'index' && <Index/>}
        {curView === 'item' && curRender === 'detail' && <Detail itemDetail={itemDetail} />}
        {curView === 'item' && curRender === 'attach' && <Attach/>}
      </Switch>;
    };
  },
});

export default exportView(Component);
