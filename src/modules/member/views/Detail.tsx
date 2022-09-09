import DateTime from '@elux-admin-antd/stage/components/DateTime';
import DialogPage from '@elux-admin-antd/stage/components/DialogPage';
import {Link} from '@elux/vue-web';
import {Descriptions, Skeleton, Space, Tag} from 'ant-design-vue';
import {DGender, DRole, DStatus, ItemDetail} from '../entity';

const DescriptionsItem = Descriptions.Item;

interface Props {
  itemDetail?: ItemDetail;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = ({itemDetail}: Props) => {
  return (
    <DialogPage title="用户详情" subject="用户详情" mask>
      <div class="g-dialog-content" style={{width: '800px', height: '300px'}}>
        {itemDetail ? (
          <Descriptions bordered column={2}>
            <DescriptionsItem label="账号">{itemDetail.accountNo}</DescriptionsItem>
            <DescriptionsItem label="姓名">{itemDetail.accountName}</DescriptionsItem>
            <DescriptionsItem label="手机">{itemDetail.mobile}</DescriptionsItem>
            <DescriptionsItem label="区划和社区名称">{itemDetail.address}</DescriptionsItem>
            <DescriptionsItem label="角色">{
              <Space>
              {
                itemDetail.roles?.map((item) => (
                  <Tag color="blue">{item.name}</Tag>
                ))
              }
              </Space>
            }
            </DescriptionsItem>
            {/* <DescriptionsItem label="发布文章">
              <Link to={`/admin/article/list/index?author=${itemDetail.id}`} action="push" target="page">
                {itemDetail.articles}
              </Link>
            </DescriptionsItem> */}
            {/* <DescriptionsItem label="状态">
              <span class={`g-${itemDetail.status}`}>{DStatus.valueToLabel[itemDetail.status]}</span>
            </DescriptionsItem> */}
            <DescriptionsItem label="注册时间">{itemDetail.registerTime}</DescriptionsItem>
            {/* <DescriptionsItem label="注册时间">
              <DateTime date={itemDetail.createdTime} />
            </DescriptionsItem> */}
          </Descriptions>
        ) : (
          <Skeleton active />
        )}
      </div>
    </DialogPage>
  );
};

export default Component;
