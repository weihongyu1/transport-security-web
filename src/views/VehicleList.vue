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
            <Table border :columns="columns" :data="accidentList">
              <template #name="{ row }">
                <strong>{{ row.name }}</strong>
              </template>
              <template #type="{ row }">
                <Tag color="error" v-if="row.vehicleType === '小汽车'">{{ row.vehicleType }}</Tag>
                <Tag color="primary" v-if="row.vehicleType === '货运汽车'">{{ row.vehicleType }}</Tag>
                <Tag color="success" v-if="row.vehicleType === '大型客车'">{{ row.vehicleType }}</Tag>
              </template>
              <template #action="{ row }">
                <Button type="primary" size="small" style="margin-right: 5px" @click="editVehicle(row)">编辑</Button>
                <Button type="error" size="small" @click="resolve(row)">删除</Button>
              </template>
            </Table>
          </div>
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
              <Input v-model="vehicle.vehicleNumber" placeholder="车牌号" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Owner" label-position="top">
              <Select v-model="vehicle.vehicleType" placeholder="车辆类型">
                <Option value="小汽车">小汽车</Option>
                <Option value="货运汽车">货运汽车</Option>
                <Option value="大型客车">大型客车</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="车辆描述" label-position="top">
          <Input type="textarea" v-model="vehicle.vehicleDesc" :rows="4" placeholder="please enter the description"/>
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

export default {
  name: "VehicleList",
  components: {SelfFooter, SelfHeader},
  data() {
    return {
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
      accidentList: [
        {
          name: 'John Brown',
          vehicleNumber: '甘A-38267',
          vehicleType: '小汽车',
          vehicleTime: '2023-03-04',
          vehicleDesc: '小汽车'
        },
        {
          name: 'John Brown',
          vehicleNumber: '甘A-38267',
          vehicleType: '货运汽车',
          vehicleTime: '2023-03-05',
          vehicleDesc: '货运汽车'
        },
        {
          name: 'John Brown',
          vehicleNumber: '甘A-38267',
          vehicleType: '大型客车',
          vehicleTime: '2023-03-06',
          vehicleDesc: '大型客车'
        },
      ],
      // 编辑车辆信息数据
      edit: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      vehicle: {}
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
      console.log(row)
    },
    // 编辑车辆信息方法
    editVehicle(row) {
      this.edit = true
      this.vehicle = {
        name: row.name,
        vehicleNumber: row.vehicleNumber,
        vehicleType: row.vehicleType,
        vehicleTime: row.vehicleTime,
        vehicleDesc: row.vehicleDesc
      }
    },
    editVehicleSubmit() {
      this.edit = false
      console.log('提交')
    }
  }
}
</script>

<style scoped>

</style>
