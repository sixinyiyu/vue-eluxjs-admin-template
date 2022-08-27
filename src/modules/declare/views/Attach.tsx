import MTable, {MBatchActions, MColumns, MSelection} from '@elux-admin-antd/stage/components/MTable';
import {DialogPageClassname} from '@elux-admin-antd/stage/utils/const';
import {useSingleWindow, useTableChange, useTableSize} from '@elux-admin-antd/stage/utils/resource';
import {Link, LoadingState, connectStore} from '@elux/vue-web';
import {FileWordOutlined, FilePdfOutlined} from '@ant-design/icons-vue';
import {Tooltip, TypographyTitle, TypographyText, List, ListItem, Row, Col} from 'ant-design-vue';
import {ColumnProps} from 'ant-design-vue/lib/table';
import {VNode, computed, defineComponent} from 'vue';
import {APPState} from '@/Global';
import {ListSearch, } from '../entity';

// interface StoreProps {
//   listSearch: ListSearch;
//   listLoading?: LoadingState;
// }

interface Props {
  listPathname?: string;
}

// const mapStateToProps: (state: APPState) => StoreProps = (state) => {
//   const {listSearch, listLoading} = state.declare!;
//   return {listSearch, listLoading};
// };

const listData = [
    {
        url: "www.juejin.com",
    },
    {
        url: "www.baidu.com",
    }
];

const Component = defineComponent<Props>({
//   props: ['listPathname'] as any,
  setup() {
    // const storeProps = connectStore(mapStateToProps);

    return () => {
    //   const {listPathname} = props;
    //   const {listSearch, listLoading} = storeProps;
      return (
        <div class="g-page-content">
            <TypographyTitle level={5}>成果报告</TypographyTitle>

            <List grid={{ gutter: 16, column: 4 }} dataSource={listData} renderItem={
                ({item, index}) =>
                        <ListItem key={index}>
                            <Row justify="space-around" align="middle">
                                <Col>
                                    <FilePdfOutlined style={{fontSize: '45px', color: '#08c'}}/>
                                    <TypographyText>组织领导.pdf</TypographyText>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </ListItem>
                }>
            </List>

            <TypographyTitle level={5}>成果图片</TypographyTitle>

            <List grid={{ gutter: 16, column: 4 }} dataSource={listData} renderItem={
                ({item, index}) =>
                        <ListItem key={index}>
                            <Row justify="space-around" align="middle">
                                <Col>
                                    <img
                                        width="272"
                                        alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    />
                                </Col>
                                <Col>
                                    <TypographyText>组织领导.png</TypographyText>
                                </Col>
                            </Row>
                        </ListItem>
                }>
            </List>

            <TypographyTitle level={5}>成果视频</TypographyTitle>

            <video width="100%" src="http://218.205.198.59:8097/group1/M00/04/71/rBJoBWJxReGAMbnVABcW31bhaAY740.mp4" muted="true" controls="true">您的浏览器不支持在线播放。</video>
        </div>
      );
    };
  },
});

export default Component;