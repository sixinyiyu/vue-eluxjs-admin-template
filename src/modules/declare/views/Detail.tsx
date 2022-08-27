import DateTime from '@elux-admin-antd/stage/components/DateTime';
import {DialogPageClassname} from '@elux-admin-antd/stage/utils/const';
import DialogPage from '@elux-admin-antd/stage/components/DialogPage';
import {DownloadOutlined} from '@ant-design/icons-vue';
import {Link} from '@elux/vue-web';
import {Descriptions, Tooltip,Collapse, CollapsePanel, Space, Skeleton, Steps,Step, PageHeader, Table, Card, TypographyTitle, TypographyText, TableColumnType, Row, Col} from 'ant-design-vue';
import { onMounted, reactive,ref } from 'vue';
import {DStatus, ItemDetail} from '../entity';
import { useSingleWindow } from '@elux-admin-antd/stage/utils/resource';

const DescriptionsItem = Descriptions.Item;

interface Props {
  itemDetail?: ItemDetail;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = ({itemDetail}: Props) => {
  const singleWindow = useSingleWindow();
  const qualificationColumns = [
    {
      title: '示范社区基本条件',
      dataIndex: 'title',
      // customCell: (record: any, rowIndex: any) => {
      //   console.log(JSON.stringify(record));
      //   console.log("@行号:" + rowIndex);
      //   return {rowSpan: xx(rowIndex)}
      // }
    },
    {
      title: '是否满足',
      dataIndex: 'match',
    },
  ];

  const qualificationData = [
    {
      key: '1',
      title: '（一）有社区灾害风险定期排查制度，有社区灾害风险地图，有事故隐患清单和脆弱人群清单',
      match: '是',
    },
    {
      key: '2',
      title: '（二）有预警信息发布渠道，预警信息覆盖率100%',
      match: '是',
    }
  ];
  let factorData = [{"id":"10","name":"组织领导","content":{"id":"1","content":"加强对社区综合减灾工作的组织领导，明确具体负责本社区防灾减灾救灾、安全生产工作的领导机构。每年至少召开一次会议。","required":true,"indices":[]},"subs":[]},{"id":"11","name":"工作制度","content":{"id":"2","content":"制定社区综合减灾规章制度，与乡镇（街道）有关单位及社会组织、邻近社区建立协调联动机制，规范开展综合减灾工作。","required":true,"indices":[]},"subs":[]},{"id":"12","name":"网格化管理","content":{"id":"3","content":"在社区推进灾害事故风险隐患网格化管理，社区网格化覆盖率100%。","required":true,"indices":[{"id":"1","index":"网格__@__个","value":"4"},{"id":"2","index":"网格员__@__人","value":"18"}]},"subs":[]},{"id":"12","name":"网格化管理","content":{"id":"4","content":"网格员发现的事故隐患处置率100%。","required":true,"indices":[{"id":"3","index":"发现__@__个问题","value":"3"}]},"subs":[]},{"id":"13","name":"经费投入","content":{"id":"5","content":"在防灾减灾救灾、安全生产等方面有一定的经费投入，并严格管理和规范使用。","required":true,"indices":[{"id":"4","index":"经费投入金额__@__万元","value":"5"}]},"subs":[]},{"id":"14","name":"参加保险","content":{"id":"6","content":"鼓励社区居民参加各类灾害事故保险。","required":true,"indices":[]},"subs":[]},{"id":"15","name":"工作档案","content":{"id":"7","content":"建立规范、齐全的创建管理工作档案，每年通过示范社区创建管理系统上报一次有关情况。","required":true,"indices":[]},"subs":[]}];  ;

  const xx = (id: number| string, index: any): number =>   {
    if (index === 0) {
      return 1;
    }
    let s = factorData.filter((item) => item.id.toString() === id);
    if (factorData[index -1]['id'].toString() === id) {
      return 0;
    } else {
      return s.length;
    }
  }

  const factorColumns: TableColumnType[] = [
    {
      title: '指标',
      dataIndex: 'name',
      customCell: (record: any, rowIndex) => {
        const {id} = record;
        return {rowSpan: xx(id, rowIndex)}
      },
      customRender: ({value, record}: {value: string; record: {id: string}}) => (
        // <Space>
        //   <TypographyText>{value}</TypographyText>
          <Link to={`/admin/member/item/detail/${record.id}`} action="push" target={singleWindow} cname={DialogPageClassname}>
            {value}
          </Link>
        // </Space>
      ),
    },
    {
      title: '创建内容',
      dataIndex: 'content',
      // text 当前['contents']数据,record 当前索引行数据
      customRender: ({text, record, index, column}) => {
        return text?.content;
      },
    },
    {
      title: '要素',
      dataIndex: 'required',
      customRender: ({record}: {record: any}) => {
        return record.content?.required ? '是' : '否';
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      customRender: ({record}) => {
        let indices: any[] = record.content?.indices;
        return (
        <Space  direction={"vertical"}>
            {
              indices.map(item => {
                return <TypographyText>{item.index.replace('__@__', item.value)}</TypographyText>
              })
            }
        </Space>
        );
      },
    }
  ];

  return (
    <DialogPage title="申报详情" subject="申报详情" mask>
      <div class="g-dialog-content" >
        {itemDetail ? (
          <div>
          <Descriptions bordered column={2}>
            <DescriptionsItem label="社区名称">河南省郑州市郑东新区祭城街道正光街社区</DescriptionsItem>
            <DescriptionsItem label="区划代码">河南省郑州市郑东新区祭城街道正光街社区</DescriptionsItem>

            <DescriptionsItem label="城镇人口（万人）">河南省,郑州市,金水区,郑东新区祭城路街道正光路与众旺路交叉口东北角向东50米路北</DescriptionsItem>
            <DescriptionsItem label="农村人口（万人）">河南省郑州市郑东新区祭城街道正光街社区</DescriptionsItem>

            <DescriptionsItem label="总人口（万人）">河南省,郑州市,金水区,郑东新区祭城路街道正光路与众旺路交叉口东北角向东50米路北</DescriptionsItem>
            <DescriptionsItem label="总面积（平方米）">河南省郑州市郑东新区祭城街道正光街社区</DescriptionsItem>

            <DescriptionsItem label="经 办 人">河南省,郑州市,金水区,郑东新区祭城路街道正光路与众旺路交叉口东北角向东50米路北</DescriptionsItem>
            <DescriptionsItem label="经办人电话">河南省,郑州市,金水区,郑东新区祭城路街道正光路与众旺路交叉口东北角向东50米路北</DescriptionsItem>

            <DescriptionsItem label="负 责 人">河南省,郑州市,金水区,郑东新区祭城路街道正光路与众旺路交叉口东北角向东50米路北</DescriptionsItem>
            <DescriptionsItem label="负责人电话">河南省,郑州市,金水区,郑东新区祭城路街道正光路与众旺路交叉口东北角向东50米路北</DescriptionsItem>

            <DescriptionsItem label="详细地址">河南省,郑州市,金水区,郑东新区祭城路街道正光路与众旺路交叉口东北角向东50米路北</DescriptionsItem>

          </Descriptions>

          <Steps current={2}>
                <Step title="已上报" sub-title="袁家惠" description="2022-07-14 15:00:00" />
                <Step title="县考核" sub-title="陈国平" description="2022-07-16 16:00:00" />
                <Step title="市考核" description="2022-07-24 15:00:00" />
                <Step title="省考核" description="2022-08-14 15:00:00" />
                <Step title="部考核" description="" />
                <Step title="已公示" description="" />
            </Steps>

          <TypographyTitle level={5}>基础信息</TypographyTitle>

          <Card bordered={false}>
            Inner Card content
          </Card>

          <TypographyTitle level={5}>附件信息</TypographyTitle>

          <Card bordered={false}>
              <Row gutter={{xs: 8, sm: 16, md: 24}}>
                <Col>
                  <Link to={`/admin/article/list/index?author=${itemDetail.id}`} action="push" target="page">
                  全国综合减灾示范社区申报表---郑东新区祭城路街道办事处正光街社区.pdf
                  </Link>
                </Col>
                <Col>
                <Tooltip title={"下载"}>
                  <DownloadOutlined/>
                </Tooltip>
                </Col>
              </Row>
              <Row style={{paddingTop: '10px'}}>
                <Link to={`/admin/article/list/index?author=${itemDetail.id}`} action="push" target="page">全国综合减灾示范社区申报表---郑东新区祭城路街道办事处正光街社区.doc</Link>
              </Row>
          </Card>

          <TypographyTitle level={4}>示范社区基本条件申报</TypographyTitle>

          <Table pagination={false} rowKey={record => record.key} columns={qualificationColumns} data-source={qualificationData} bordered/>

          <TypographyTitle level={4}>示范社区基本条件申报</TypographyTitle>

          <Table pagination={false} rowKey={record => record.content.id} columns={factorColumns} data-source={factorData} bordered>
          </Table>

          {/** 审核历史 */}

          <Collapse activeKey={['1','2']}>
            <CollapsePanel key="1" header="市级考核">
                <Descriptions labelStyle={{fontWeight: 800, background: '#fafafa'}} title={"考核记录"} column={2}>
                <DescriptionsItem label="考核意见">通过</DescriptionsItem>
                <DescriptionsItem label="请示文件">郑东新区减灾委员会办公室关于申请国家级综合减灾示范社区的请示.pdf </DescriptionsItem>
                <DescriptionsItem label="经办人">袁家惠</DescriptionsItem>
                <DescriptionsItem label="经办人电话">
                17839165821
                </DescriptionsItem>
                <DescriptionsItem label="考核时间">2022-05-03 07:33:15</DescriptionsItem>
                <DescriptionsItem label="考核内容">成果报告、成果图片、成果视频三大要素均需完成填报</DescriptionsItem>
              </Descriptions>
            </CollapsePanel>
            <CollapsePanel key="2" header="县级考核">
                <Descriptions labelStyle={{fontWeight: 800, background: '#fafafa'}} title={"考核记录"} column={2}>
                <DescriptionsItem label="考核意见">退回</DescriptionsItem>
                <DescriptionsItem label="请示文件">郑减办文〔2021〕14号 郑州市减灾委员会办公室关于申报2021年度全国综合减灾示范社区的报告.pdf</DescriptionsItem>
                <DescriptionsItem label="经办人">陈国平</DescriptionsItem>
                <DescriptionsItem label="经办人电话">
                67170005
                </DescriptionsItem>
                <DescriptionsItem label="考核时间">2022-05-03 07:33:15</DescriptionsItem>
                <DescriptionsItem label="考核内容">成果报告、成果图片、成果视频三大要素均需完成填报</DescriptionsItem>
              </Descriptions>
            </CollapsePanel>
          </Collapse>



          </div>
        ) : (
          <Skeleton active />
        )}
      </div>
    </DialogPage>
  );
};

export default Component;
