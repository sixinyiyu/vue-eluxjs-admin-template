// import {useUpdateItem} from '@elux-admin-antd/stage/utils/resource';
import {getFormDecorators} from '@elux-admin-antd/stage/utils/tools';
import {Dispatch} from '@elux/vue-web';
import {Button, Form, FormInstance, Input, Select, TreeSelect} from 'ant-design-vue';
import type { TreeProps } from 'ant-design-vue';
import {defineComponent, onMounted, ref, shallowReactive} from 'vue';
import {GetActions, useRouter} from '@/Global';
import {DGender, DRole, DStatus, ItemDetail, UpdateItem} from '../entity';
import MSelect from '@elux-admin-antd/stage/components/MSelect';
import {ListSearch as RoleListSearch} from '@elux-admin-antd/role/entity';
import api  from '@elux-admin-antd/declare/api';
import { Region } from 'modules/declare/entity';
const FormItem = Form.Item;

export const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
};

const fromDecorators = getFormDecorators<UpdateItem>({
  accountNo: {label: '账号', rules: [{required: true, message: '请输入账号'}]},
  accountName: {label: '姓名', rules: [{required: true, message: '请输入姓名'}]},
  mobile: {label: '手机', rules: [{required: true, message: '请输入手机号'}]},
  roles: {label: '角色', rules: [{required: true, message: '请选择角色'}]},
  address: {label: '地市/社区', rules: [{required: true, message: '请选择性别'}]},
});

interface Props {
  dispatch: Dispatch;
  itemDetail: ItemDetail;
}

const {member: memberActions} = GetActions('member');

const Component = defineComponent<Props>({
  props: ['dispatch', 'itemDetail'] as any,
  setup(props) {
    const router = useRouter();
    const formRef = ref<FormInstance>();
    const formState = shallowReactive<UpdateItem>({
      ...props.itemDetail,
    });

    const onFinish = (values: UpdateItem) => {
      console.log(JSON.stringify(values));
      const id = props.itemDetail.id;
      if (id) {
        props.dispatch(memberActions.updateItem(id, values));
      } else {
        props.dispatch(memberActions.createItem(values));
      }
    };
    const treeData = ref<Region[]>([]);
    const loadData : TreeProps['loadData'] = async (treeNode) => {
      if (treeNode.child && treeNode.child.length > 0) {
          return;
      }
      const data = await api.fetchRegionByParentCode(treeNode.code);
      if (data && data.length > 0) {
          treeNode.dataRef && (treeNode.dataRef.child = data as any);
          treeData.value = [...treeData.value]
      }
    };
    const onReset = () => {
      formRef.value?.resetFields();
    };

    const goBack = () => router.back(1, 'window');
    onMounted(() => {
      api.fetchProvinces().then(provinces => treeData.value = provinces)
    });
    // const {loading, onFinish} = useUpdateItem(itemDetail.id, dispatch, memberActions);

    return () => {
      return (
        <Form layout="horizontal" {...formItemLayout} ref={formRef} model={formState} onFinish={onFinish}>
          <FormItem {...fromDecorators.accountNo}>
            <Input v-model:value={formState.accountNo} allowClear placeholder="请输入账号" />
          </FormItem>
          <FormItem {...fromDecorators.address}>
            <TreeSelect
              v-model:value={formState.address}
              show-search
              fieldNames={{children:'child', label:'value', value:'code' }}
              style="width: 100%"
              dropdown-style={{ maxHeight: '380px', overflow: 'auto' }}
              placeholder="请选择地区/社区"
              allow-clear
              load-data={loadData}
              tree-data={treeData.value}
            />
          </FormItem>
          <FormItem {...fromDecorators.mobile}>
            <Input v-model:value={formState.mobile} allowClear placeholder="请输入手机" />
          </FormItem>
          <FormItem {...fromDecorators.accountName}>
            <Input v-model:value={formState.accountName} allowClear placeholder="请输入用户名" />
          </FormItem>
          <FormItem {...fromDecorators.roles}>
            <MSelect<RoleListSearch>
                v-model:value={formState.roles}
                placeholder="请选择角色"
                selectorPathname="/admin/role/list/selector"
                // fixedSearch={{role: Role.责任编辑, status: Status.启用}}
                // limit={[1]}
                returnArray
                showSearch
              ></MSelect>
          </FormItem>
          <div class="g-form-actions">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button type="dashed" onClick={onReset}>
              重置
            </Button>
            <Button onClick={goBack}>取消</Button>
          </div>
        </Form>
      );
    };
  },
});

export default Component;
