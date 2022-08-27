/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
import CountTo from '@elux-admin-antd/stage/components/CountTo';
import {DocumentHead, Link} from '@elux/vue-web';
import { Chart } from '@antv/g2';
import { Choropleth, ChoroplethOptions } from '@antv/l7plot';
import styles from './index.module.less';
import {MoneyCollectOutlined, } from '@ant-design/icons-vue';
import { Card, Row, Col, Space, } from 'ant-design-vue';
import { defineComponent, onMounted, ref } from 'vue';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = defineComponent({
  setup() {
    const barRef = ref<HTMLElement|string>('');

    const renderBarChart =() => {
      const data = [
        { type: '金水区', value: 12,  },
        { type: '二七区', value: 8,  },
        { type: '管城\n回族区', value: 5,  },
        { type: '高新区', value: 3,  },
        { type: '郑州航\n空港经济综合试验区\n郑州新郑综合保税区', value: 2,  },
        { type: '郑州\n郑东新区\n管理委员会', value: 1,  },
        { type: '荥阳市', value: 1,  }
      ];

      const chart = new Chart({
        container: barRef.value,
        autoFit: true,
        height: 500,
        padding: [50, 20, 50, 20]
      });
      chart.data(data);
      chart.scale('value', {
        alias: '示范社区(个)'
      });
      chart.axis('type', {
        tickLine: {
          alignTick: false
        }
      });
      chart.axis('value', false);
      chart.tooltip({
        showMarkers: false
      });
      chart.interval().position('type*value');
      chart.interaction('element-active');
      // 添加文本标注
      data.forEach(item => {
        chart
          .annotation()
          .text({
            position: [item.type, item.value],
            content: item.value,
            style: {
              textAlign: 'center'
            },
            offsetY: -30
          });
      });
      chart.render();
    };

    const renderFactorChart = () => {
      const factorData = [
        { time: '2018年', value: 30 },
        { time: '2019年', value: 90 },
        { time: '2020年', value: 50 },
        { time: '2021年', value: 30 },
        { time: '2022年', value: 70 }
      ];

      const chart = new Chart({
        container: 'factorChart',
        autoFit: true,
        height: 500,
      });
      chart.data(factorData);
      chart.scale('value', {
        alias: '销售额(万)',
        nice: true,
      });
      chart.axis('time', {
        tickLine: null
      });

      chart.tooltip({
        showMarkers: false
      });
      chart.interaction('active-region');

      chart.interval().position('time*value');

      chart.render();
    };

    const reanderArea = () => {

      var url = "https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.2/administrative-data/area-list.json";
      fetch(`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=410100_full`)
      .then((response) => response.json())
      .then((list) => {
        const data = list.features
        .map((feature: any) => {
          let obj = {};
          obj['value'] = Math.random() * 5000;
          obj['adcode'] = feature.properties.adcode;
          obj['name'] =feature.properties.name;
          return obj;
        });
          // .filter(({ level, parent }: {level: string, parent: number}) => level === 'district' && parent === 410100)
          // .map((item: any) => Object.assign({}, item, { value: Math.random() * 5000 }));
          let options: ChoroplethOptions = {
            map: {
              type: 'mapbox',
              style: 'blank',
              center: [113.546928, 34.780838],
              // center: [117.30794, 31.79322],
              // center: [120.19382669582967, 30.258134],
              zoom: 3,
              pitch: 0,
            },
            source: {
              data: data,
              joinBy: {
                sourceField: 'adcode',
                geoField: 'adcode',
              },
            },
            viewLevel: {
              level: 'city',
              adcode: 410100,
              granularity: 'district',
            },
            autoFit: true,
            color: {
              field: 'value',
              value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
              scale: { type: 'quantize' },
            },
            style: {
              opacity: 1,
              stroke: '#ccc',
              lineWidth: 0.6,
              lineOpacity: 1,
            },
            label: {
              visible: true,
              field: 'name',
              style: {
                fill: '#000',
                opacity: 0.8,
                fontSize: 10,
                stroke: '#fff',
                strokeWidth: 1.5,
                textAllowOverlap: false,
                padding: [5, 5],
              },
            },
            state: {
              active: { stroke: 'black', lineWidth: 1 },
            },
            tooltip: {
              items: [
                { field: "name", alias: "名称" },
                { field: "value", alias: "示范社区数" },
              ],
            },
            zoom: {
              position: 'bottomright',
            },
            legend: {
              position: 'bottomleft',
            },
          };
          const choropleth = new Choropleth('areaChoropleth', options);
      });

    }

    onMounted(() => {
      renderBarChart();
      renderFactorChart();
      reanderArea();
    });

    return () => {
      // const {listSearch, prefixPathname, curRender} = storeProps;
      return (
        <div class={styles.root}>
          <DocumentHead title="我的工作台" />
          <Row gutter={24}>
            <Col xs={12} md={12} sm={12} lg={6}>
              <div class="card-item card-item-one">
                <div class="card-title">
                  <Space size={8}> <MoneyCollectOutlined style={{fontSize: '24px'}}/> 总销售额 </Space>
                </div>
                <div class="all-count">
                  ¥ <CountTo autoplay={true} startValue={0} endValue={551245} duration={5}/>
                  <span class="suffix">万</span>
                </div>
              </div>
            </Col>
            </Row>

            <Card bordered={false} title="示范社区统计">
              <div  style="position: relative; width: 100%; height: 100vh;" id="areaChoropleth"></div>
            </Card>

            <Card bordered={false} title="示范社区排行TOP10">
              <div ref={barRef}></div>
            </Card>
            <Card bordered={false} title="预案演练">
              <div id="factorChart"></div>
            </Card>

        </div>
      );
    };
  },
});

export default Component;
