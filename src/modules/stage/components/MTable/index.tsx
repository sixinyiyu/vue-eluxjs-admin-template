import {AlignLeftOutlined, CheckOutlined, DownOutlined, InfoCircleOutlined, LeftOutlined} from '@ant-design/icons-vue';
import {Alert, Button, Dropdown, Menu, Modal, Table, message} from 'ant-design-vue';
import {ColumnProps, TableProps} from 'ant-design-vue/lib/table';
import {VNode, computed, defineComponent, ref, shallowReactive, shallowRef, watch} from 'vue';
import {useRouter} from '@/Global';
import DateTime from '../../components/DateTime';
import {BaseListSearch, Pagination, BaseLocationState} from '../../utils/base';
import styles from './index.module.less';

export type Key = string | number;
export interface BatchAction {
  key: string;
  label: string;
  icon?: VNode;
  confirm?: boolean | ((props: {selected: number}) => JSX.Element);
}

export type MBatchActions = {actions: BatchAction[]; handler: (target: BatchAction, ids: Key[]) => void};

export type MColumns<T> = ColumnProps<T> & {timestamp?: boolean; disable?: boolean};

export type MSelection<T> = {
  onChange?: (keys: Key[], rows: Partial<T>[], maps: {[key: Key]: Partial<T>}) => void;
  limit?: number | [number, number];
  autoSubmit?: boolean;
};

interface Props<T = Record<string, any>> extends TableProps<T> {
  class?: string;
  columns: MColumns<T>[];
  commonActions?: VNode;
  batchActions?: MBatchActions;
  pagination?: Pagination;
  listSearch?: BaseListSearch;
  selectedRowKeys?: Key[];
  selectedRows?: Partial<T>[];
  selection?: MSelection<T>;
}

const Component = defineComponent<Props>({
  name: styles.root,
  props: [
    'class',
    'columns',
    'commonActions',
    'batchActions',
    'pagination',
    'listSearch',
    'selectedRowKeys',
    'selectedRows',
    'selection',
    'dataSource',
    'onChange',
    'rowKey',
    'loading',
    'size',
    'bordered',
    'locale',
    'scroll',
  ] as any,
  setup(props: Props) {
    const router = useRouter();
    const limit = shallowReactive({limitMax: -1, limitMin: -1, limitArr: [-1, -1]});
    watch(
      () => {
        const {limit = 0} = props.selection || {};
        const limitArr = typeof limit === 'number' ? [limit] : limit;
        console.log(limit);
        console.log(limitArr);
        const limitMax = limitArr[1] !== undefined ? limitArr[1] : limitArr[0];
        const limitMin = limitArr[1] !== undefined ? limitArr[0] : 0;
        return {limitMax, limitMin, limitArr};
      },
      (val) => {
        Object.assign(limit, val);
      },
      {immediate: true}
    );
    const reviewMode = ref(false);
    watch(
      () => {
        return (props.selectedRowKeys || props.selectedRows || []).length > 0;
      },
      (val) => {
        reviewMode.value = val;
      },
      {immediate: true}
    );
    watch(
      () => props.dataSource,
      () => {
        reviewMode.value = false;
      }
    );
    const selected = shallowRef<{
      keys: Key[];
      rows: Partial<Record<string, any>>[];
      maps: Partial<Record<string, any>>;
    }>({keys: [], rows: [], maps: {}});
    watch(
      () => {
        const {selectedRowKeys, selectedRows, rowKey = 'id'} = props;
        const keys = selectedRowKeys || (selectedRows || []).map((item) => item[rowKey as string] as Key);
        const rows = selectedRows || (selectedRowKeys || []).map((key) => ({[rowKey as string]: key} as Partial<Record<string, any>>));
        const maps = rows.reduce((data, cur) => {
          data[cur[rowKey as string] as Key] = cur;
          return data;
        }, {} as {[key: Key]: Partial<Record<string, any>>});
        return {keys, rows, maps};
      },
      (val) => {
        selected.value = val;
      },
      {immediate: true}
    );
    const updateSelected = (val: {keys: Key[]; rows: Partial<Record<string, any>>[]; maps: Partial<Record<string, any>>}) => {
      selected.value = val;
      if (val.keys.length === 0) {
        closeReviewMode();
      }
      const onChange = props.selection?.onChange;
      onChange && onChange(val.keys, val.rows, val.maps);
    };
    const clearSelected = () => updateSelected({keys: [], rows: [], maps: {}});
    const onSelectedSubmit = () => {
      router.back(1, 'window');
      const {onSelectedSubmit} = (router.location.state || {}) as BaseLocationState;
      onSelectedSubmit && onSelectedSubmit(selected.value.rows);
    };

    const rowSelection = computed(() => {
      const {limitMax} = limit;
      const {autoSubmit = true} = props.selection || {};
      if (limitMax > -1) {
        return {
          preserveSelectedRowKeys: true,
          columnWidth: 60,
          type: limitMax === 1 ? 'radio' : 'checkbox',
          selectedRowKeys: selected.value.keys,
          onChange: (selectedRowKeys: Key[], selectedRows: Partial<Record<string, any>>[]) => {
            const rows: Partial<Record<string, any>>[] = [];
            const maps: {[key: string]: Record<string, any>; [key: number]: Record<string, any>} = {};
            if (limitMax > 0) {
              if (selectedRowKeys.length > limitMax) {
                message.error('???????????? 0 ??????');
                return;
              }
            }
            const keys = selectedRowKeys.map((key, index) => {
              const item = selectedRows[index] || selected.value.maps[key];
              rows.push(item);
              maps[key] = item;
              return key;
            });
            updateSelected({keys, rows, maps});
            if (limitMax > 0 && selectedRowKeys.length === limitMax && autoSubmit) {
              setTimeout(onSelectedSubmit, 0);
              return;
            }
          },
        } as TableProps['rowSelection'];
      } else {
        return undefined;
      }
    });

    const batchMenuClickHandler = ({key}: {key: string | number}) => {
      const {keys} = selected.value;
      const {actions, handler} = props.batchActions!;
      const target = actions.find((item) => item.key === key);
      if (target && target.confirm) {
        Modal.confirm({
          icon: <InfoCircleOutlined />,
          content:
            target.confirm === true ? (
              <div class={styles.batchConfirm}>
                ???????????????<span class="em">{target.label}</span>??????????????? <a>{keys.length}</a> ?????????
                {typeof target.confirm === 'string' ? <div>{target.confirm}</div> : null}
              </div>
            ) : (
              <target.confirm selected={keys.length} />
            ),
          onOk: () => {
            reviewMode.value = false;
            handler(target, keys);
          },
        });
      } else {
        handler(target!, keys);
      }
    };

    const batchMenu = computed(() => {
      const {batchActions} = props;
      if (batchActions) {
        if (batchActions.actions.length === 1) {
          const item = batchActions.actions[0];
          return (
            <Button icon={<AlignLeftOutlined />} onClick={() => batchMenuClickHandler({key: item.key})}>
              {item.label}
            </Button>
          );
        }
        return (
          <Dropdown
            overlay={
              <Menu onClick={batchMenuClickHandler}>
                {batchActions.actions.map(({key, label, icon}) => (
                  <Menu.Item key={key} icon={icon}>
                    {label}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button>
              ???????????? <DownOutlined />
            </Button>
          </Dropdown>
        );
      }
      console.log('batchMenu ??????');
      return null;
    });

    const pagination = computed(() => {
      const {pageIndex, pageSize, total} = props.pagination || {pageIndex: 1, pageSize: 2, total: 0};
      return {
        showTotal: (total: number) => `???${total}???`,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showSizeChanger: true,
        current: pageIndex,
        pageSize,
        total: total,
      };
    });

    const columnList = computed(() => {
      // const {sorterField, sorterOrder} = props.listSearch || {};
      return props.columns
        .filter((col) => !col.disable)
        .map((col) => {
          col = {...col};
          // if (col.sorter && typeof col.sorter === 'boolean' && !col.sortOrder) {
          //   col.sortOrder = (sorterField === col.dataIndex && sorterOrder) || null;
          // }
          if (col.timestamp && !col.customRender) {
            col.customRender = (opts: {text: string}) => <DateTime date={opts.text} />;
          }
          return col as ColumnProps;
        });
    });

    const setReviewMode = () => (reviewMode.value = true);
    const closeReviewMode = () => (reviewMode.value = false);
    const toggleReviewMode = () => (reviewMode.value = !reviewMode.value);

    const headArea = computed(() => {
      const {commonActions, batchActions} = props;
      const {limitMax, limitMin, limitArr} = limit;
      console.log('headArea' + JSON.stringify(limit));
      console.log('headArea batchMenu' + batchMenu.value);
      console.log('headArea commonActions' + commonActions);
      if (!commonActions && !batchMenu.value && limit.limitMax < 0) {
        return;
      }
      return (
        <div class="hd">
          {limitMax > -1 && batchActions && !batchMenu.value && (

            <Button onClick={onSelectedSubmit} disabled={!!limitMin && selected.value.keys.length < limitMin} type="primary" icon={<CheckOutlined />}>
              ??????<span class="tip">{`(??????${limitArr.map((n) => (n === 0 ? '???' : n)).join('-')}???)`}</span>
            </Button>
          )}
          {selected.value.keys.length === 0 ? commonActions : batchMenu.value}
          {reviewMode.value && (
            <Button onClick={closeReviewMode} type="dashed" icon={<LeftOutlined />}>
              ????????????
            </Button>
          )}
          {selected.value.keys.length > 0 && (
            <Alert
              message={
                <div>
                  <span>?????? </span>
                  <a onClick={setReviewMode} class="em">
                    {selected.value.keys.length}
                  </a>
                  <span> ??????</span>
                  {limitMax > 0 && (
                    <>
                      <span>???????????? </span>
                      <span class="em">{limitMax - selected.value.keys.length}</span> ??????
                    </>
                  )}
                  <a onClick={toggleReviewMode}>{reviewMode.value ? '??????' : '??????'}</a>
                  <span> ??? </span>
                  <a onClick={clearSelected}>????????????</a>
                </div>
              }
              type="info"
              showIcon
            />
          )}
        </div>
      );
    });

    return () => {
      const {class: className = '', dataSource, onChange, rowKey = 'id', loading, size, bordered, locale, scroll} = props;
      return (
        <div class={styles.root + ' ' + className}>
          {headArea.value}
          <Table
            columns={columnList.value}
            pagination={reviewMode.value ? false : pagination.value}
            rowSelection={rowSelection.value}
            dataSource={reviewMode.value ? selected.value.rows : dataSource}
            onChange={onChange}
            rowKey={rowKey}
            loading={loading}
            size={size}
            bordered={bordered}
            locale={locale}
            scroll={scroll}
          />
        </div>
      );
    };
  },
}) as any;

export default Component as <T>(props: Props<T>) => JSX.Element;
