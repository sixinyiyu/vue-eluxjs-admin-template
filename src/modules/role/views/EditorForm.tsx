import {getFormDecorators} from '@elux-admin-antd/stage/utils/tools';
import {Dispatch} from '@elux/vue-web';
import {Button, Form, FormInstance, Input, Tree} from 'ant-design-vue';
import type { TreeProps } from 'ant-design-vue';
import {defineComponent, ref, shallowReactive} from 'vue';
import {GetActions, useRouter} from '@/Global';
import {ItemDetail, UpdateItem} from '../entity';

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
  name: {label: '名称', rules: [{required: true, message: '请输入名称'}]},
  desc: {label: '描述', rules: [{required: false, message: '请输入描述'}]},
});

interface Props {
  dispatch: Dispatch;
  itemDetail: ItemDetail;
}

const {role: apiActions} = GetActions('role');

const Component = defineComponent<Props>({
  props: ['dispatch', 'itemDetail'] as any,
  setup(props) {
    const router = useRouter();
    const formRef = ref<FormInstance>();

    const selectedKeys = ref<string[]>(['index', 'role']);
    const checkedKeys = ref<string[]>(['index', 'role']);

    const formState = shallowReactive<UpdateItem>({
      ...props.itemDetail,
    });

    const onFinish = (values: UpdateItem) => {
      const id = props.itemDetail.id;
      if (id) {
        props.dispatch(apiActions.updateItem(id, values));
      } else {
        props.dispatch(apiActions.createItem(values));
      }
    };

    const onReset = () => {
      formRef.value?.resetFields();
    };

    const goBack = () => router.back(1, 'window');

    const treeData = ref([{"label":"首页","value":"index","child":[]},{"label":"系统管理","value":"system","child":[{"label":"用户管理","value":"member","child":[]},{"label":"角色管理","value":"role","child":[]}]},{"label":"申报管理","value":"declare","child":[]}]);

    return () => {
      return (
        <Form layout="horizontal" {...formItemLayout} ref={formRef} model={formState} onFinish={onFinish}>
          <FormItem {...fromDecorators.name}>
            <Input v-model:value={formState.name} allowClear placeholder="请输入名称" />
          </FormItem>
          <FormItem {...fromDecorators.desc}>
            <Input v-model:value={formState.desc} allowClear placeholder="请输入描述" />
          </FormItem>
          <FormItem label={'菜单'}>
            <Tree
              v-model:selectedKeys={selectedKeys.value}
              v-model:checkedKeys={checkedKeys.value}
              fieldNames={{children:'child', title:'label', key:'value' }}
              autoExpandParent
              checkable
              height={233}
              tree-data={treeData.value}
            ></Tree>
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
