import MSearch from '@elux-admin-antd/stage/components/MSearch';
import {useSearch} from '@elux-admin-antd/stage/utils/resource';
import {SearchFromItems} from '@elux-admin-antd/stage/utils/tools';
import {Input, Select} from 'ant-design-vue';
import {defineComponent} from 'vue';
import {DStatus, ListSearch, ListSearchFormData, defaultListSearch} from '../entity';

const formItems: SearchFromItems<ListSearchFormData> = [
  {name: 'name', label: '账号', formItem: <Input allowClear placeholder="请输入关键字" />},
  {name: 'nickname', label: '姓名', formItem: <Input allowClear placeholder="请输入姓名" />},
  {
    name: 'status',
    label: '状态',
    formItem: <Select allowClear placeholder="请选择用户状态" options={DStatus.options} />,
  },
];

interface Props {
  listPathname: string;
  listSearch: ListSearch;
  fixedFields?: Partial<ListSearchFormData>;
}

const Component = defineComponent<Props>({
  props: ['listPathname', 'listSearch', 'fixedFields'] as any,
  setup(props) {
    const {onSearch} = useSearch<ListSearchFormData>(props, defaultListSearch);

    return () => {
      const {listSearch, fixedFields} = props;
      return (
        <MSearch<ListSearchFormData>
          values={listSearch}
          fixedFields={fixedFields}
          expand={!!listSearch.email}
          items={formItems}
          onSearch={onSearch}
        />
      );
    };
  },
});

export default Component;
