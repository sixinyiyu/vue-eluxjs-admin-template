import {CloseCircleFilled, CloseOutlined, FullscreenOutlined} from '@ant-design/icons-vue';
import {Form} from 'ant-design-vue';
import {computed, defineComponent} from 'vue';
import {useRouter} from '@/Global';
import {BaseLocationState} from '../../utils/base';
import {DialogPageClassname} from '../../utils/const';
import styles from './index.module.less';

interface Props<T = Record<string, any>> {
  class?: string;
  selectorPathname: string;
  showSearch?: boolean;
  fixedSearch?: Partial<T>;
  limit?: number | [number, number];
  placeholder?: string;
  rowKey?: string;
  rowName?: string;
  value?: string | any[];
  returnArray?: boolean;
  onChange?: (value?: string | string[]) => void;
}

const Component = defineComponent<Props>({
  name: styles.root,
  props: [
    'class',
    'selectorPathname',
    'showSearch',
    'fixedSearch',
    'limit',
    'placeholder',
    'rowKey',
    'rowName',
    'value',
    'returnArray',
    'onChange',
  ] as any,
  emits: ['update:value'],
  setup(props, {emit}) {
    const formItemContext = Form.useInjectFormItemContext();
    const triggerChange = (changedValue: string | any[]) => {
      const {rowKey = 'id', rowName = 'name'} = props;
      const value = changedValue ? (typeof changedValue === 'string' ? [changedValue] : changedValue) : [];
      const _value = value.map((item) => {
        const [id, ...others] = item.split(',');
        const name = others.join(',');
        return {[rowKey]: id, [rowName]: name || id};
      });
      emit('update:value', _value);
      formItemContext.onFieldChange();
    };
    const selectedRows = computed(() => {
      const {value, rowKey = 'id', rowName = 'name'} = props;
      const arr = value ? (typeof value === 'string' ? [value] : value) : [];
      console.log('>>>>' + JSON.stringify(arr));
      return arr;
      // return arr.map((item) => {
      //   const [id, ...others] = item.split(',');
      //   const name = others.join(',');
      //   return {[rowKey]: id, [rowName]: name || id};
      // });
    });
    const removeItem = (index: number) => {
      const {rowKey = 'id', rowName = 'name', returnArray} = props;
      const rows = selectedRows.value
        .slice(0, index)
        .concat(selectedRows.value.slice(index + 1))
        .map((row) => [{rowKey: row[rowKey], rowName: row[rowName]}]);
      triggerChange(rows.length === 1 && !returnArray ? rows[0] : rows);
    };
    const onSelectedSubmit = (selectedItems: Record<string, any>[]) => {
      const {rowKey = 'id', rowName = 'name', returnArray} = props;
      console.log(JSON.stringify(selectedItems));
      // const rows : any[]= selectedItems.map((item) => {
      //   let obj = {};
      //   obj[rowKey] = item[rowKey];
      //   obj[rowName] = item[rowName];
      //   return obj;
      // });
      const rows = selectedItems.map((item) => [item[rowKey], item[rowName]].filter(Boolean).join(','));
      console.log('选择的结果:', JSON.stringify(rows));
      triggerChange(rows.length === 1 && !returnArray ? rows[0] : rows);
    };
    const removeAll = () => {
      const {returnArray} = props;
      triggerChange(returnArray ? [] : '');
    };
    const router = useRouter();

    const onSelect = () => {
      console.log('on-select invoked.....');
      const {limit, selectorPathname, showSearch, fixedSearch} = props;
      const state: BaseLocationState = {selectLimit: limit, selectedRows: selectedRows.value, showSearch, fixedSearch, onSelectedSubmit};
      router.push({pathname: selectorPathname, searchQuery: fixedSearch, classname: DialogPageClassname, state}, 'window');
    };

    const children = computed(() => {
      const {rowKey = 'id', rowName = 'name', placeholder} = props;
      return (
        <>
          <div class="ant-select-selector" onClick={onSelect}>
            <div class="ant-select-selection-overflow">
              {selectedRows.value.map((row, index) => (
                <div key={row[rowKey]} class="ant-select-selection-overflow-item">
                  <span class="ant-select-selection-item" title={row[rowName]}>
                    <span class="ant-select-selection-item-content">{row[rowName]}</span>
                    <span
                      class="ant-select-selection-item-remove icon-button"
                      unselectable="on"
                      aria-hidden="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(index);
                      }}
                    >
                      <CloseOutlined />
                    </span>
                  </span>
                </div>
              ))}
            </div>
            {placeholder && selectedRows.value.length < 1 && <span class="ant-select-selection-placeholder">{placeholder}</span>}
          </div>
          <span class="ant-select-arrow icon-button" unselectable="on" aria-hidden="true" onClick={onSelect}>
            <FullscreenOutlined />
          </span>
          {selectedRows.value.length > 0 && (
            <span class="ant-select-clear icon-button" unselectable="on" aria-hidden="true" onClick={removeAll}>
              <CloseCircleFilled />
            </span>
          )}
        </>
      );
    });

    return () => {
      const {class: className = ''} = props;
      return (
        <div class={`${styles.root} ${className} ant-select ant-select-multiple ant-select-show-search ant-select-allow-clear`}>{children.value}</div>
      );
    };
  },
}) as any;

export default Component as <T>(props: Props<T>) => JSX.Element;
