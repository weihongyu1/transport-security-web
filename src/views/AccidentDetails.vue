<template>
  <div class="layout">
    <Layout>
      <SelfHeader></SelfHeader>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>监测平台 - 事故详细信息</BreadcrumbItem>
        </Breadcrumb>


        <div class="detail-info">
          <!-- 车辆信息 -->
          <div class="detail-info-accident">
            <div style="margin: 20px;">
              <div style="font-weight: bold; margin-top: 5px">车辆信息</div>
              <div style="margin: 10px;">
                <div style="margin-top: 10px">车主姓名: why</div>
                <div style="margin-top: 10px">车牌号: 甘A-34605</div>
                <div style="margin-top: 10px">车辆类型: 小汽车</div>
              </div>
            </div>
          </div>

          <!-- 事故信息 -->
          <div class="detail-info-accident">
            <div style="margin: 10px;">
              <div style="font-weight: bold;margin-top: 5px">事故信息</div>
              <div style="margin: 10px;">
                <div style="margin-top: 10px">驾驶员头部伤情: 严重损伤</div>
                <div style="margin-top: 10px">安全气囊是否弹开: 弹开</div>
                <div style="margin-top: 10px">事故时间: 2021-07-26 18:55:14</div>
              </div>
            </div>
          </div>
        </div>

        <!--地址信息-->
        <div class="detail-info-accident-address">
          <div style="margin: 10px;">
            <div style="font-weight: bold;margin-top: 5px">地址信息</div>
            <div style="margin: 10px;">
              <div style="margin-top: 10px">经度: 121.48</div>
              <div style="margin-top: 10px">纬度: 31.22</div>
              <div style="margin-top: 10px">地址: 上海市黄浦区合肥路550号-淮海路,复兴中路,打浦桥</div>
            </div>
          </div>
        </div>

        <!--碰撞数据-->
        <div class="detail-info-accident-right">
          <div class="detail-info-accident-data">
            <div style="margin: 10px;">
              <div style="font-weight: bold;margin-top: 5px">碰撞数据</div>
              <div style="margin: 10px;">
                <Table :columns="columns" :data="data"></Table>
              </div>
              <LineChart></LineChart>
              <div style="margin: 0 auto">
                <div style="padding-bottom: 10px; text-align: center">
                  <Button type="success">数据下载</Button>
                  <Button  style="margin-left: 30px" type="error">事故处理</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <BaiDUMap></BaiDUMap>
      <SelfFooter></SelfFooter>
    </Layout>
  </div>
</template>

<script>
import SelfHeader from "@/components/SelfHeader";
import SelfFooter from "@/components/SelfFooter";
import BaiDUMap from "@/components/accident/BaiDUMap";
import LineChart from "@/components/charts/LineChart";

export default {
  name: "AccidentDetails",
  components: {BaiDUMap, SelfFooter, SelfHeader, LineChart},
  created() {
    this.create()
  },
  data() {
    return {
      // 碰撞数据
      columns: [
        {
          title: '纵向加速度',
          key: 'ax'
        },
        {
          title: '横向加速度',
          key: 'ay'
        }
      ],
      data: [
        {
          ax: -0.335,
          ay: -0.14447
        },
        {
          ax: -0.335,
          ay: -0.14447
        },
        {
          ax: '...',
          ay: '...'
        },
      ]
    }
  },
  methods: {
    create() {
      console.log(this.$route.query.id);
    },
    rowClassName() {
      return 'demo-table-info-row';
    }
  }
}
</script>

<style scoped>
.detail-info {
  width: 25%;
  position: absolute;
  text-align: left;
  margin-top: 5%;
  z-index: 999;
  height: 70vh;
  overflow: hidden;
}

.detail-info-accident {
  background-color: rgba(255, 255, 255, 0.1);
  width: 90%;
  color: #d7dde4;
  box-shadow: #d9d9d9 0px 0px 10px;
  margin: 30px;
  padding: 20px;
}

.detail-info-accident-address {
  width: 20%;
  position: absolute;
  text-align: left;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.1);
  color: #d7dde4;
  box-shadow: #d9d9d9 0px 0px 10px;
  margin: 0 auto;
  left: 40%;
  top: 30%;
}

.detail-info-accident-address:hover {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: #d9d9d9 0px 0px 20px;
}

.detail-info-accident-right {
  width: 20%;
  position: absolute;
  right: 4%;
  text-align: left;
  margin-top: 30px;
  z-index: 999;
}

.detail-info-accident-data {
  background-color: rgba(255, 255, 255, 0.1);
  color: #d7dde4;
  box-shadow: #d9d9d9 0px 0px 10px;
  padding: 10px;
  overflow: hidden;
}

.detail-info-accident:hover {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: #d9d9d9 0px 0px 20px;
}

.detail-info-accident-data:hover {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: #d9d9d9 0px 0px 20px;
}

.ivu-table .demo-table-info-row td {
  background-color: rgb(255, 255, 255, 0);
  color: #fff;
}

/*背景*/
/deep/ .ivu-table {
  background-color: rgb(255, 255, 255, 0) !important;
  border: none !important;
}

/*边框*/
/deep/ .ivu-table-wrapper-with-border {
  border: none !important;
}

/*表头*/
/deep/ .ivu-table th {
  background: rgb(255, 255, 255, 0) !important;
  border-right: 0.05rem solid rgba(255, 255, 255, 0.15) !important;
  border-top: 0.05rem solid rgba(255, 255, 255, 0.15) !important;
  border-bottom: 0.05rem solid rgba(255, 255, 255, 0.15) !important;
  font-size: 0.7rem !important;
  color: rgba(250, 250, 250, 0.6) !important;
}

/*表格数据*/
/deep/ .ivu-table tr {
  background: rgb(255, 255, 255, 0) !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: none !important;
  font-size: 0.7rem !important;
  color: #d7dde4 !important;
}

/deep/ .ivu-table tr td {
  background: rgb(255, 255, 255, 0) !important;
  border-right: 0.05rem solid rgba(255, 255, 255, 0.15) !important;
  border-top: 0.05rem solid rgba(255, 255, 255, 0.15) !important;
  border-bottom: 0.05rem solid rgba(255, 255, 255, 0.15) !important;
  font-size: 0.7rem !important;
  color: #d7dde4 !important;
}
</style>
