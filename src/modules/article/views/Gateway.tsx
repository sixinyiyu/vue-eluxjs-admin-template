import FTable, {MColumns} from '@elux-admin-antd/stage/components/FTable';
import {DocumentHead, connectStore} from '@elux/vue-web';
import {defineComponent} from 'vue';
import {APPState, GetActions} from '@/Global';
import {ListItem, ListSearch} from '../entity';

interface StoreProps {
  prefixPathname: string;
  listSearch: ListSearch;
  curRender?: string;
}

const mapStateToProps: (state: APPState) => StoreProps = (state) => {
  const {prefixPathname, curRender, listSearch} = state.article!;
  console.log('Gateway mapStateToProps ---> invoked');
  return {prefixPathname, curRender, listSearch};
};

const {article: articleActions} = GetActions('article');

const actionColumns: MColumns<ListItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: {showTitle: false},
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: '10%',
  },
];

const selectedRows = [
  {
    title: 'Hello',
    author: '张三',
  },
  {
    title: 'World',
    author: '王五',
  },
];

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);
    return () => {
      return (
        <div class="g-page-content">
          <DocumentHead title="网关管理" />
          <div>
            <FTable columns={actionColumns} data={selectedRows} />
          </div>
        </div>
      );
    };
  },
});

export default Component;
