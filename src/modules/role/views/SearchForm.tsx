import MSearch from '@elux-admin-antd/stage/components/MSearch';
import {useSearch} from '@elux-admin-antd/stage/utils/resource';
import {SearchFromItems} from '@elux-admin-antd/stage/utils/tools';
import {Input} from 'ant-design-vue';
import {defineComponent} from 'vue';
import {ListSearch, ListSearchFormData, defaultListSearch} from '../entity';

const formItems: SearchFromItems<ListSearchFormData> = [
  {name: 'name', label: '名称', formItem: <Input allowClear placeholder="请输入关键字" />},
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
          items={formItems}
          onSearch={onSearch}
        />
      );
    };
  },
});

export default Component;
