<template>
  <div class="layout">
    <Layout>
      <SelfHeader></SelfHeader>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>监测平台 - 车辆信息</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div>
            <div style="width: 100px; position: relative; left: 93%; margin-bottom: 20px">
              <Button type="primary" @click="insertVehicle">新增</Button>
            </div>
            <Table border :columns="columns" :data="vehicleList">
              <template #name="{ row }">
                <strong>{{ row.name }}</strong>
              </template>
              <template #type="{ row }">
                <Tag color="error" v-if="row.vehicleType === 1">小型汽车</Tag>
                <Tag color="primary" v-if="row.vehicleType === 2">大型客车</Tag>
                <Tag color="success" v-if="row.vehicleType === 3">小型货运汽车</Tag>
                <Tag color="success" v-if="row.vehicleType === 4">大型货运汽车</Tag>
              </template>
              <template #action="{ row }">
                <Button type="primary" size="small" style="margin-right: 5px" @click="editVehicle(row)">编辑</Button>
                <Button type="error" size="small" @click="resolve(row)">删除</Button>
              </template>
            </Table>
          </div>
          <Page :total="total" :current="index" :page-size="pageSize" style="margin-top: 20px" @on-change="selectVehicles"/>
        </Card>
      </Content>
      <SelfFooter></SelfFooter>
    </Layout>

    <!--    车辆信息编辑-->
    <Drawer
        title="编辑车辆信息"
        v-model="edit"
        width="720"
        :mask-closable="false"
        :styles="styles"
    >
      <Form :model="vehicle">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="车主姓名" label-position="top">
              <Input v-model="vehicle.name" placeholder="车主姓名"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="车牌号" label-position="top">
              <Input v-model="vehicle.vehicleNumber" placeholder="车牌号"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Owner" label-position="top">
              <Select v-model="vehicle.vehicleType" placeholder="车辆类型">
                <Option value="1">小型汽车</Option>
                <Option value="2">大型客车</Option>
                <Option value="3">小型货运汽车</Option>
                <Option value="4">大型货运汽车</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="车辆描述" label-position="top">
          <Input type="textarea" v-model="vehicle.vehicleDesc" placeholder="请输入车辆描述"/>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="edit = false">取消</Button>
        <Button type="primary" @click="editVehicleSubmit">添加</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import SelfHeader from "@/components/SelfHeader";
import SelfFooter from "@/components/SelfFooter";
import {addVehicle, deleteVehicle, selectVehicles} from '@/api/VehicleApi'
import {Message} from "view-ui-plus";

export default {
  name: "VehicleList",
  components: {SelfFooter, SelfHeader},
  created() {
    this.selectVehicles(1)
  },
  data() {
    return {
      // 分页
      total: 100,
      index: 1,
      pageSize: 10,
      row: 1,
      // 表格数据
      columns: [
        {
          title: '车主姓名',
          slot: 'name'
        },
        {
          title: '车牌号',
          key: 'vehicleNumber'
        },
        {
          title: '车辆类型',
          slot: 'type',
          width: 150,
          align: 'center'
        },
        {
          title: '车辆登记时间',
          key: 'vehicleTime',
          sortable: true
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      vehicleList: [],
      // 编辑车辆信息数据
      edit: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      vehicle: {},
      vehicelForm: {}
    }
  },
  methods: {
    show(row) {
      this.$Modal.info({
        title: 'User Info',
        content: `车牌号：${row.vehicleNumber}<br>车主姓名：${row.name}<br>事故地址：${row.accidentAddress}`
      })
    },
    resolve(row) {
      deleteVehicle(row.id).then(res => {
        if (res.code === 200) {
          Message['success']({
            background: true,
            content: '删除成功！'
          });
          location.reload()
        } else {
          Message['error']({
            background: true,
            content: res.msg
          });
        }
      })
    },
    // 获取车辆信息列表
    selectVehicles(index) {
      this.index = index
      this.vehicleList= []
      selectVehicles(this.index, this.pageSize).then(res => {
        if (res.code === 200) {
          this.total = res.data.total
          this.pageSize = res.data.count
          this.index = res.data.index
          for (let index in res.data.data) {
            let vehicle = res.data.data[index]
            let columnData = {
              id: vehicle.id,
              name: vehicle.vehicleOwner,
              vehicleNumber: vehicle.vehicleNumber,
              vehicleType: vehicle.vehicleType,
              vehicleTime: vehicle.createTime,
              vehicleDesc: vehicle.vehicleDesc
            }
            this.vehicleList.push(columnData)
          }
        }
      })
    },
    // 编辑车辆信息方法
    editVehicle(row) {
      this.edit = true
      this.vehicle = {
        id: row.id,
        name: row.name,
        vehicleNumber: row.vehicleNumber,
        vehicleType: row.vehicleType,
        vehicleTime: row.vehicleTime,
        vehicleDesc: row.vehicleDesc
      }
    },
    insertVehicle() {
      this.edit = true
    },
    editVehicleSubmit() {
      this.vehicelForm = {
        id: this.vehicle.id,
        vehicleNumber: this.vehicle.vehicleNumber,
        vehicleOwner: this.vehicle.name,
        vehicleType: this.vehicle.vehicleType,
        vehicleDesc: this.vehicle.vehicleDesc
      }
      addVehicle(this.vehicelForm).then(res => {
        if (res.code === 200) {
          Message['success']({
            background: true,
            content: '添加成功！'
          });
          this.edit = false
          location.reload()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
