import MSearch from '@elux-admin-antd/stage/components/MSearch';
import {useSearch} from '@elux-admin-antd/stage/utils/resource';
import {SearchFromItems} from '@elux-admin-antd/stage/utils/tools';
import {Input, Select} from 'ant-design-vue';
import {defineComponent} from 'vue';
import {DStatus, ListSearch, ListSearchFormData, defaultListSearch} from '../entity';

const formItems: SearchFromItems<ListSearchFormData> = [
  {name: 'province', label: '省份', formItem: <Input allowClear placeholder="--请选择省份--" />},
  {name: 'city', label: '地市', formItem: <Input allowClear placeholder="--请选择地市--" />},
  {name: 'country', label: '地市', formItem: <Input allowClear placeholder="--请选择区县--" />},
  {name: 'community', label: '社区', formItem: <Input allowClear placeholder="--请选择社区--" />},
  {name: 'year', label: '申报年度', formItem: <Input allowClear placeholder="--请选择--" />},
  {
    name: 'status',
    label: '状态',
    formItem: <Select allowClear placeholder="--请选择状态--" options={DStatus.options} />,
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
          expand={!!listSearch.community}
          items={formItems}
          onSearch={onSearch}
        />
      );
    };
  },
});

export default Component;
