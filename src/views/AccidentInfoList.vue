<template>
  <div class="layout">
    <Layout>
      <SelfHeader></SelfHeader>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>监测平台 - 事故列表</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div>
            <Table border :columns="columns" :data="accidentList" >
              <template #name="{ row }">
                <strong>{{ row.name }}</strong>
              </template>
              <template #status="{ row }">
                <Tag checkable color="success" v-if="row.accidentStatus === 1">已处理</Tag>
                <Tag checkable color="warning" v-if="row.accidentStatus === 2">处理中</Tag>
                <Tag checkable color="error" v-if="row.accidentStatus === 0">未处理</Tag>
              </template>
              <template #type="{ row }">
                <p v-if="row.vehicleType === 1">小型汽车</p>
                <p v-if="row.vehicleType === 2">大型客车</p>
                <p v-if="row.vehicleType === 3">小型货运汽车</p>
                <p v-if="row.vehicleType === 4">大型货运汽车</p>
              </template>
              <template #action="{ row }">
                <Button type="success" size="small" style="margin-right: 5px" @click="show(row)"
                        v-if="row.accidentStatus === 1">查看</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)"
                        v-if="row.accidentStatus === 2">结束</Button>
                <Button type="error" size="small" @click="resolve(row)"
                        v-if="row.accidentStatus === 0">处理</Button>
              </template>
            </Table>
          </div>
          <Page :total="total" :current="index" :page-size="pageSize" style="margin-top: 20px" @on-change="getAccidentInfo"/>
        </Card>
      </Content>
      <SelfFooter></SelfFooter>
    </Layout>
  </div>
</template>

<script>
import SelfHeader from "@/components/SelfHeader";
import SelfFooter from "@/components/SelfFooter";
import {accidentInfo} from "@/api/AccidentApi";

export default {
  name: "AccidentInfoList",
  components: {SelfFooter, SelfHeader},
  created() {
    this.getAccidentInfo(1)
    setInterval(() => {
      this.getAccidentInfo(1)
    }, 10000)
  },
  data() {
    return {
      // 分页
      total: 100,
      index: 1,
      pageSize: 10,
      // 表格相关数据
      resolveStatus: false,
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
          title: '事故地点',
          key: 'accidentAddress'
        },
        {
          title: '事故/处理时间',
          key: 'accidentTime',
          sortable: true
        },
        {
          title: '处理状态',
          slot: 'status',
          width: 150,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      accidentList: []
    }
  },
  methods: {
    getAccidentInfo(index) {
      this.index = index
      this.accidentList = []
      accidentInfo(this.index, this.pageSize).then(res => {
        if (res.code === 200) {
          this.total = res.data.total
          this.pageSize = res.data.count
          this.index = res.data.index
          for (let index in res.data.data) {
            let accident = res.data.data[index]
            let columnData = {
              id: accident.id,
              name: accident.vehicleOwner,
              vehicleNumber: accident.vehicleNumber,
              vehicleType: accident.vehicleType,
              accidentAddress: accident.accidentAddress,
              accidentTime: accident.accidentDate,
              accidentStatus: accident.resolveState
            }
            this.accidentList.push(columnData)
          }
        }
      })
    },
    show (row) {
      this.$router.push({
        name: 'AccidentDetails',
        query: {
          id: row.id
        }
      })
    },
    resolve (row) {
      this.$router.push({
        name: 'AccidentDetails',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>

<style scoped>
.demo-table-working-row {
  background-color: #ff9900;
  color: #fff;
}

.demo-table-resolve-row {
  background-color: #19be6b;
  color: #fff;
}

.demo-table-none-row {
  background-color: #ed4014;
  color: #fff;
}
</style>
