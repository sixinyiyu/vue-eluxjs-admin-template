import DialogPage from '@elux-admin-antd/stage/components/DialogPage';
import {Descriptions, Skeleton} from 'ant-design-vue';
import {ItemDetail} from '../entity';

const DescriptionsItem = Descriptions.Item;

interface Props {
  itemDetail?: ItemDetail;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = ({itemDetail}: Props) => {
  return (
    <DialogPage title="角色详情" subject="角色详情" mask>
      <div class="g-dialog-content" style={{width: '800px', height: '300px'}}>
        {itemDetail ? (
          <Descriptions bordered column={2}>
            <DescriptionsItem label="编号">{itemDetail.id}</DescriptionsItem>
            <DescriptionsItem label="名称">{itemDetail.name}</DescriptionsItem>
            <DescriptionsItem label="描述">{itemDetail.desc}</DescriptionsItem>
            <DescriptionsItem label="创建时间">{itemDetail.createTime}</DescriptionsItem>
            <DescriptionsItem label="用户数">{itemDetail.userCount}</DescriptionsItem>
          </Descriptions>
        ) : (
          <Skeleton active />
        )}
      </div>
    </DialogPage>
  );
};

export default Component;
