import DialogPage from '@elux-admin-antd/stage/components/DialogPage';
import {connectStore, DocumentHead} from '@elux/vue-web';
import {defineComponent} from 'vue';
import {APPState} from '@/Global';
import {CurRender, ListSearch} from '../entity';
import ListTable from './ListTable';
import SearchForm from './SearchForm';

interface StoreProps {
  prefixPathname: string;
  curRender?: CurRender;
  listSearch: ListSearch;
}

const mapStateToProps: (state: APPState) => StoreProps = (state) => {
  const {prefixPathname, curRender, listSearch, } = state.declare!;
  return {prefixPathname, curRender, listSearch,};
};

const selection = {limit: -1};

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {prefixPathname, curRender, listSearch} = storeProps;
      return (
        <div class="g-page-content">
        {/* <DialogPage subject="申报列表" mask> </DialogPage>*/}
          <DocumentHead title="申报列表" />
          <div>
          {/* <div class="g-dialog-content" style={{width: '900px', height: '560px'}}> */}
            <SearchForm listSearch={listSearch} listPathname={`${prefixPathname}/list/${curRender}`} />
            <ListTable listPathname={`${prefixPathname}/list/${curRender}`} selection={selection} />
          {/* </div> */}
          </div>
        </div>
      );
    };
  },
});

export default Component;
