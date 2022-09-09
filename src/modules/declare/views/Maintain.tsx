import {useAlter, useShowDetail} from '@elux-admin-antd/stage/utils/resource';
import {DocumentHead, connectStore, Dispatch, ModuleState} from '@elux/vue-web';
import {Tree, InputSearch, Row, Col, Form, Button, Input, RadioGroup, Radio} from 'ant-design-vue';
import type { TreeProps } from 'ant-design-vue';
import {defineComponent, onMounted, PropType, ref, reactive} from 'vue';
import {APPState, GetActions, Modules} from '@/Global';
import {DeclareResource, ListItem, ListSearch, Region} from '../entity';
import api from '../api';
import { DataNode } from 'ant-design-vue/lib/tree';
import { Rule } from 'ant-design-vue/lib/form';
import SearchForm from './SearchForm';
import ListTable from './ListTable';
import { PlusOutlined } from '@ant-design/icons-vue';
import { MBatchActions } from 'modules/stage/components/MTable';
import { ColumnProps } from 'ant-design-vue/lib/table';


interface RegionCreateRequest {
    parentCode: string;
    code: string;
    value: string;
    regionType: string;
  }

interface StoreProps {
  prefixPathname: string;
  listSearch: ListSearch;
  curRender?: string;
}

const mapStateToProps: (state: APPState) => StoreProps = (state) => {
  const {prefixPathname, curRender, listSearch } = state.declare! as ModuleState;
  return {prefixPathname, curRender, listSearch };
};

const {declare: declareActions} = GetActions('declare');


const Component = defineComponent({
  props: {
    dispatch: {
        type: Function as PropType<Dispatch>,
        required: true as const,
    },
  },
  setup(props) {
    const storeProps = connectStore(mapStateToProps);
    const {selectedRows, deleteItems, alterItems, updateItem} = useAlter<ListItem>(storeProps, declareActions);
    const {onShowDetail, onShowEditor} = useShowDetail(storeProps);
    const commActions = (
      <Button type="primary" icon={<PlusOutlined />} onClick={() => onShowEditor('', updateItem)}>
        新建
      </Button>
    );

    const actionColumns: ColumnProps<ListItem> = {
      title: '操作',
      dataIndex: 'id',
      width: '100px',
      align: 'center',
      fixed: 'right',
      customRender: ({value, record}) => {
        return (
          <div class="g-table-actions">
            <a onClick={() => onShowDetail(value)}>详细</a>
          </div>
        );
      },
    };

    return () => {
      const {prefixPathname, curRender, listSearch} = storeProps;
      return (
        <div class="g-page-content">
            <DocumentHead title="考核列表" />
            <div>
                <SearchForm listSearch={listSearch} listPathname={`${prefixPathname}/list/${curRender}`} />
                <ListTable
                // commonActions={commActions}
                actionColumns={actionColumns}
                selectedRows={selectedRows.value}
                listPathname={`${prefixPathname}/list/${curRender}`}
                />
            </div>
        </div>
      );
    };
  },
});

export default Component;