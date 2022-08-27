import {useShowDetail} from '@elux-admin-antd/stage/utils/resource';
import {DocumentHead, connectStore, Dispatch, ModuleState} from '@elux/vue-web';
import {Tree, InputSearch, Row, Col, Form, Button, Input, RadioGroup, Radio} from 'ant-design-vue';
import type { TreeProps } from 'ant-design-vue';
import {defineComponent, onMounted, PropType, ref, reactive} from 'vue';
import {APPState, GetActions, Modules} from '@/Global';
import {DeclareResource, ListSearch, Region} from '../entity';
import api from '../api';
import { DataNode } from 'ant-design-vue/lib/tree';
import { Rule } from 'ant-design-vue/lib/form';


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

const Component = defineComponent({
  props: {
    dispatch: {
        type: Function as PropType<Dispatch>,
        required: true as const,
    },
  },
  setup(props) {
    const storeProps = connectStore(mapStateToProps);
    const {onShowDetail, onShowEditor} = useShowDetail(storeProps);
    const searchValue = ref<string>('');
    const expandedKeys = ref<string[]>([]);
    const selectedKeys = ref<string[]>([]);
    //TreeProps['treeData']
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
    const onSearch = (searchValue: string) => {

    };
    onMounted(() => {
        api.fetchProvinces().then(provinces => treeData.value = provinces)
    });
    const onSubmit = (event: MouseEvent) => {

    };
    const reginFrom = reactive<RegionCreateRequest>({
        parentCode: '',
        code: '',
        value: '',
        regionType: '',
    });
    return () => {
      const {prefixPathname, curRender, listSearch} = storeProps;
      return (
        <div class="g-page-content">
            <DocumentHead title="用户管理" />
            <div>
                <Row>
                    <Col flex={2}>
                        <InputSearch v-model:value={searchValue.value} onSearch={onSearch} style={{marginBottom: '8px', width: '200px'}} placeholder="请输入关键字进行过滤" />
                        <Tree
                            // autoExpandParent={true}
                            fieldNames={{children:'child', title:'value', key:'code' }}
                            v-model:expandedKeys={expandedKeys.value}
                            v-model:selectedKeys={selectedKeys.value}
                            load-data={loadData}
                            tree-data={treeData.value}
                        />
                    </Col>
                    <Col flex={3}>
                        <Form style={{paddingTop: '120px'}} model={reginFrom} labelCol={{ style: { width: '150px' } }} wrapperCol={{ span: 14 }}>
                            <Form.Item label="父级地区" rules={[{ required: true, message: '请选择父区域' }]}>
                                <Input v-model:value={reginFrom.parentCode} />
                            </Form.Item>

                            <Form.Item label="地区编码" rules={[{ required: true, message: '请输入地区编码' }]}>
                                <Input v-model:value={reginFrom.code} />
                            </Form.Item>

                            <Form.Item label="地区名称" rules={[{ required: true, message: '请输入地区名称' }]}>
                                <Input v-model:value={reginFrom.value}/>
                            </Form.Item>

                            <Form.Item label="地区类型"  rules={[{ required: true, message: '请选择地区类型' }]}>
                                <RadioGroup v-model:value={reginFrom.regionType}>
                                    <Radio value="1">省级</Radio>
                                    <Radio value="2">地市</Radio>
                                    <Radio value="3">区县</Radio>
                                    <Radio value="4">村/街道</Radio>
                                    <Radio value="5">乡/社区</Radio>
                                </RadioGroup>
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 14, offset: 8 }}>
                                <Button type="primary" onClick={onSubmit}>确认修改</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
      );
    };
  },
});

export default Component;