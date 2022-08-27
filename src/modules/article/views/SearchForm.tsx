import {ListSearch as MemberListSearch, Role, Status} from '@elux-admin-antd/member/entity';
import FSearch from '@elux-admin-antd/stage/components/FSearch';
import {SchemaItem} from '@elux-admin-antd/stage/components/FSearch/module';
import MSearch from '@elux-admin-antd/stage/components/MSearch';
import MSelect from '@elux-admin-antd/stage/components/MSelect';
import {useSearch} from '@elux-admin-antd/stage/utils/resource';
import {SearchFromItems} from '@elux-admin-antd/stage/utils/tools';
import {Input, Select} from 'ant-design-vue';
import {defineComponent} from 'vue';
import {DStatus, ListSearch, ListSearchFormData, defaultListSearch} from '../entity';

interface Props {
  listPathname: string;
  listSearch: ListSearch;
}

// 不可使用的搜索项
const fixedFields: Partial<any> = {title: false};

const schemas: SchemaItem[] = [
  {
    name: 'user_name',
    title: '用户名',
    required: true,
    component: 'Input',
    defaultValue: '刘备',
    value: '',
    placeholder: '请输入用户名',
    allowClear: true,
  },
  {
    name: 'address',
    title: '地址',
    required: true,
    component: 'Input',
    defaultValue: '',
    value: '',
    placeholder: '请输入地址',
    allowClear: true,
  },
  {
    name: 'password',
    title: '密码',
    required: true,
    component: 'Input',
    defaultValue: '',
    value: '',
    placeholder: '请输入密码',
    allowClear: true,
  },
  {
    name: 'language',
    title: '语言',
    required: true,
    component: 'Select',
    defaultValue: 'TypeScript',
    value: '',
    placeholder: '--请选择--',
    allowClear: true,
    options: [
      {label: 'RUST', value: 'Rust'},
      {label: 'Java', value: 'Java'},
      {label: 'TypeScript', value: 'TypeScript'},
      {label: 'Python', value: 'Python'},
      {label: 'C++', value: 'C++'},
    ],
  },
  {
    name: 'directive',
    title: '指令',
    required: true,
    component: 'Select',
    defaultValue: 'Misc',
    value: '',
    placeholder: '--请选择--',
    allowClear: true,
    options: [
      {label: 'Misc', value: 'Misc'},
      {label: 'Java', value: 'Java'},
      {label: 'TypeScript', value: 'TypeScript'},
      {label: 'Python', value: 'Python'},
      {label: 'C++', value: 'C++'},
    ],
  },
];

const Component = defineComponent<Props>({
  props: ['listPathname', 'listSearch'] as any,
  setup(props) {
    const {onSearch} = useSearch<ListSearchFormData>(props, defaultListSearch);

    return () => {
      const {listSearch} = props;
      return null;
      // return <MSearch<ListSearchFormData> values={listSearch} fixedFields={fixedFields} items={formItems} onSearch={onSearch} />;
      // return <FSearch<ListSearchFormData> schemas={schemas} values={listSearch} fixedFields={fixedFields} onSearch={onSearch} />;
    };
  },
});

export default Component;
