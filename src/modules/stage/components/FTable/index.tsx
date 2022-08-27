import {Table} from 'ant-design-vue';
import {ColumnProps, TableProps} from 'ant-design-vue/lib/table';
import {computed, defineComponent} from 'vue';
import {Pagination} from '../../utils/base';
import styles from './index.module.less';

export type MColumns<T> = ColumnProps<T> & {timestamp?: boolean; disable?: boolean};

interface Props<T = Record<string, any>> extends TableProps<T> {
  class?: string;
  columns: MColumns<T>[];
  data?: any;
  pagination?: Pagination;
}

const Component = defineComponent<Props>({
  name: styles.root,
  props: ['class', 'columns', 'pagination', 'dataSource', 'onChange', 'rowKey', 'loading', 'size', 'bordered', 'scroll'] as any,
  setup(props: Props) {
    const pagination = computed(() => {
      const {pageIndex, pageSize, total} = props.pagination || {pageIndex: 1, pageSize: 10, total: 0};
      return {
        showTotal: (total: number) => `共${total}条`,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showSizeChanger: true,
        current: pageIndex,
        pageSize,
        total,
      };
    });

    return () => {
      const {class: className = '', dataSource, columns, onChange, rowKey = 'id', loading, size, bordered, scroll} = props;
      return (
        <div class={styles.root + ' ' + className}>
          <Table
            columns={columns}
            pagination={pagination.value}
            // rowSelection={rowSelection.value}
            dataSource={dataSource}
            onChange={onChange}
            rowKey={rowKey}
            loading={loading}
            size={size}
            bordered={bordered}
            scroll={scroll}
          />
        </div>
      );
    };
  },
}) as any;

export default Component as <T>(props: Props<T>) => JSX.Element;
