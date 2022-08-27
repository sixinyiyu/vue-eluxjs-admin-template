import MTable, {MBatchActions, MColumns, MSelection} from '@elux-admin-antd/stage/components/MTable';
import {Pagination} from 'modules/stage/utils/base';
import {useSingleWindow, useTableChange, useTableSize} from '@elux-admin-antd/stage/utils/resource';
import {LoadingState, connectStore} from '@elux/vue-web';
import {ColumnProps} from 'ant-design-vue/lib/table';
import {VNode, computed, defineComponent} from 'vue';
import {APPState} from '@/Global';
import {ListItem, ListSearch, defaultListSearch} from '../entity';

interface StoreProps {
  listSearch: ListSearch;
  list?: ListItem[];
  pagination?: Pagination;
  listLoading?: LoadingState;
}

interface Props {
  listPathname: string;
  mergeColumns?: {[field: string]: MColumns<ListItem>};
  actionColumns?: ColumnProps<ListItem>;
  commonActions?: VNode;
  batchActions?: MBatchActions;
  selectedRows?: Partial<ListItem>[];
  selection?: MSelection<ListItem>;
}

const mapStateToProps: (state: APPState) => StoreProps = (state) => {
  const {listSearch, list, pagination, listLoading} = state.declare!;
  return {listSearch, list, pagination, listLoading};
};

const Component = defineComponent<Props>({
  props: ['listPathname', 'mergeColumns', 'actionColumns', 'commonActions', 'batchActions', 'selectedRows', 'selection'] as any,
  setup(props) {
    const storeProps = connectStore(mapStateToProps);
    const onTableChange = useTableChange(storeProps, props.listPathname, defaultListSearch);
    const singleWindow = useSingleWindow();
    const tableSize = useTableSize();
    const columns = computed<MColumns<ListItem>[]>(() => {
      const {actionColumns, mergeColumns} = props;
      const cols: MColumns<ListItem>[] = [
        {
          title: '社区名称',
          dataIndex: 'community',
          width: '15%',
        },
        {
          title: '省份',
          dataIndex: 'province',
          width: '60px',
        },
        {
          title: '地市',
          dataIndex: 'city',
          width: '80px',
        },
        {
          title: '区县',
          dataIndex: 'country',
          width: '100px',
        },
        {
          title: '当前状态',
          dataIndex: 'status',
          width: '100px',
        },
        {
          title: '申报年度',
          dataIndex: 'year',
          width: '200px',
        },
        {
          title: '考核文件',
          dataIndex: 'attachs',
          width: '200px',
        },
        {
          title: '接收时间',
          dataIndex: 'createdTime',
          width: '200px',
          timestamp: true,
        },
      ];

      if (actionColumns) {
        cols.push(actionColumns);
      }
      if (mergeColumns) {
        cols.forEach((col) => {
          const field = col.dataIndex as string;
          if (field && mergeColumns[field]) {
            Object.assign(col, mergeColumns[field]);
          }
        });
      }
      return cols;
    });

    return () => {
      const {commonActions, batchActions, selectedRows, selection} = props;
      const {listSearch, list, pagination, listLoading} = storeProps;
      return (
        <MTable<ListItem>
          size={tableSize}
          commonActions={commonActions}
          batchActions={batchActions}
          onChange={onTableChange}
          selectedRows={selectedRows}
          columns={columns.value}
          listSearch={listSearch}
          dataSource={list}
          pagination={pagination}
          selection={selection}
          loading={listLoading === 'Start' || listLoading === 'Depth'}
        />
      );
    };
  },
});

export default Component;
