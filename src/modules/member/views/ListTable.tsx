import MTable, {MBatchActions, MColumns, MSelection} from '@elux-admin-antd/stage/components/MTable';
import {DialogPageClassname} from '@elux-admin-antd/stage/utils/const';
import {Pagination} from '@elux-admin-antd/stage/utils/base';
import {useSingleWindow, useTableChange, useTableSize} from '@elux-admin-antd/stage/utils/resource';
import {Link, LoadingState, connectStore} from '@elux/vue-web';
import {Tag, Tooltip, Space} from 'ant-design-vue';
import {ColumnProps} from 'ant-design-vue/lib/table';
import {VNode, computed, defineComponent} from 'vue';
import {APPState} from '@/Global';
import {DGender, DRole, DStatus, ListItem, ListSearch, defaultListSearch, RoleDTO} from '../entity';

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
  const {listSearch, list, pagination, listLoading} = state.member!;
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
          title: '账号',
          dataIndex: 'accountNo',
          width: '6%',
          customRender: ({value, record}: {value: string; record: {id: string}}) => (
            <Link to={`/admin/member/item/detail/${record.id}`} action="push" target={singleWindow} cname={DialogPageClassname}>
              {value}
            </Link>
          ),
        },
        {
          title: '姓名',
          dataIndex: 'accountName',
          width: '10%',
        },
        {
          title: '手机',
          dataIndex: 'mobile',
          width: '10%',
        },
        {
          title: '地区或社区名称',
          dataIndex: 'address',
          align: 'center',
          // sorter: true,
          width: '120px',
          customRender: ({value, record}: {value: string; record: {id: string}}) => (
            <Link to={`/admin/article/list/index?author=${record.id}`} action="push" target={singleWindow} cname={DialogPageClassname}>
              {value}
            </Link>
          ),
        },
        {
          title: '角色',
          dataIndex: 'roles',
          width: '100px',
          ellipsis: true,
          customRender: ({value}: {value: RoleDTO[]}) => (
            <Space>
            {
              value.map((item) => (
                <Tag color="blue">{item.name}</Tag>
              ))
            }
            </Space>
          ),
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
