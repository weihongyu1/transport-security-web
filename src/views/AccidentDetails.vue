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
                <div style="margin-top: 10px">车主姓名: {{ accidentVehicle.vehicleOwner }}</div>
                <div style="margin-top: 10px">车牌号: {{ accidentVehicle.vehicleNumber }}</div>
                <div style="margin-top: 10px">
                  车辆类型:
                  <Tag color="error" v-if="accidentVehicle.vehicleType === 1">小型汽车</Tag>
                  <Tag color="primary" v-if="accidentVehicle.vehicleType === 2">大型客车</Tag>
                  <Tag color="success" v-if="accidentVehicle.vehicleType === 3">小型货运汽车</Tag>
                  <Tag color="success" v-if="accidentVehicle.vehicleType === 4">大型货运汽车</Tag>
                </div>
              </div>
            </div>
          </div>

          <!-- 事故信息 -->
          <div class="detail-info-accident">
            <div style="margin: 10px;">
              <div style="font-weight: bold;margin-top: 5px">事故信息</div>
              <div style="margin: 10px;">
                <div style="margin-top: 10px">驾驶员头部伤情: {{ accidentDetails.degreeInjury }}</div>
                <div style="margin-top: 10px">安全气囊是否弹开: {{ accidentDetails.isPop }}</div>
                <div style="margin-top: 10px">事故时间: {{ accidentDetails.accidentDate }}</div>
              </div>
            </div>
          </div>
        </div>

        <!--地址信息-->
        <div class="detail-info-accident-address">
          <div style="margin: 10px;">
            <div style="font-weight: bold;margin-top: 5px">地址信息</div>
            <div style="margin: 10px;">
              <div style="margin-top: 10px">经度: {{ accidentAddress.lng }}</div>
              <div style="margin-top: 10px">纬度: {{ accidentAddress.lat }}</div>
              <div style="margin-top: 10px">地址: {{ accidentAddress.address }}</div>
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
              <AxLineChart :axes="axList"></AxLineChart>
              <AyLineChart :ays="ayList"></AyLineChart>
              <div style="margin: 0 auto">
                <div style="padding-bottom: 10px; text-align: center">
                  <Button type="success" @click="accidentDownLoad">数据下载</Button>
                  <Button v-if="accidentResolveState === 0"  style="margin-left: 30px" type="error" @click="updateAccidentState">事故处理</Button>
                  <Button v-if="accidentResolveState === 1"  style="margin-left: 30px" type="error">已处理</Button>
                  <Button v-if="accidentResolveState === 2"  style="margin-left: 30px" type="error" @click="endResolve">结束处理</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <BaiDUMap :lngP="lng" :latP="lat"></BaiDUMap>
      <SelfFooter></SelfFooter>
    </Layout>
  </div>
</template>

<script>
import SelfHeader from "@/components/SelfHeader";
import SelfFooter from "@/components/SelfFooter";
import BaiDUMap from "@/components/accident/BaiDUMap";
import AxLineChart from "@/components/charts/AxLineChart";
import AyLineChart from "@/components/charts/AyLineChart";
import {
  accidentAx,
  accidentAy, download,
  getAccidentAddress,
  getAccidentDetails,
  getAccidentVehicle,
  updateAccidentState
} from "@/api/AccidentApi";
import {Message} from "view-ui-plus";

export default {
  name: "AccidentDetails",
  components: {AyLineChart, AxLineChart, BaiDUMap, SelfFooter, SelfHeader},
  created() {
    this.accidentId = this.$route.query.id;
    this.getAccidentVehicle()
    this.getAccidentDetails()
    this.getAccidentAddress()
    this.getAcceleration()
  },
  data() {
    return {
      // 碰撞数据
      accidentId: 1,
      accidentVehicle: {},
      accidentDetails: {},
      accidentAddress: {},
      accidentResolveState: 0,
      axList: [],
      ayList: [],
      lng: 0.00,
      lat: 0.00,
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
      data: []
    }
  },
  methods: {
    create() {
      this.accidentId = this.$route.query.id;
    },
    getAccidentVehicle() {
      getAccidentVehicle(this.accidentId).then(res => {
        if (res.code === 200) {
          this.accidentVehicle = res.data
        }
      })
    },
    getAccidentDetails() {
      getAccidentDetails(this.accidentId).then(res => {
        if (res.code === 200) {
          this.accidentDetails = res.data
          this.accidentResolveState = res.data.accidentState
        }
      })
    },
    getAccidentAddress() {
      getAccidentAddress(this.accidentId).then(res => {
        if (res.code === 200) {
          this.accidentAddress = res.data
          this.lng = res.data.lng
          this.lat = res.data.lat
        }
      })
    },
    async getAcceleration() {
      let axes
      let ays
      await accidentAx(this.accidentId).then(res => {
        if (res.code === 200) {
          axes = res.data.value
          this.axList = res.data.value
        }
      })
      await accidentAy(this.accidentId).then(res => {
        if (res.code === 200) {
          ays = res.data.value
          this.ayList = res.data.value
        }
      })
      let columnData = {
        ax: axes[0],
        ay: ays[0]
      }
      this.data.push(columnData)
      columnData = {
        ax: '...',
        ay: '...'
      }
      this.data.push(columnData)
    },
    updateAccidentState() {
      updateAccidentState(2, this.accidentId).then(res => {
        if (res.code === 200) {
          Message['success']({
            background: true,
            content: '更新处理状态成功！'
          });
          this.accidentResolveState = 2
        } else {
          Message['error']({
            background: true,
            content: '更新处理状态失败！'
          });
        }
      })
    },
    endResolve() {
      updateAccidentState(1, this.accidentId).then(res => {
        if (res.code === 200) {
          Message['success']({
            background: true,
            content: '更新处理状态成功！'
          });
          this.accidentResolveState = 1
        } else {
          Message['error']({
            background: true,
            content: '更新处理状态失败！'
          });
        }
      })
    },
    accidentDownLoad() {
      download(this.accidentId).then(res => {
        let blob = new Blob([res], {type: 'application/vnd.ms-excel'});
        console.log(blob)
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        console.log(href)
        downloadElement.href = href;
        downloadElement.setAttribute('download', this.accidentVehicle.vehicleNumber)
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      })
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
