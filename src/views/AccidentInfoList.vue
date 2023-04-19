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
                <Tag checkable color="success" v-if="row.accidentStatus === '已处理'">{{ row.accidentStatus}}</Tag>
                <Tag checkable color="error" v-if="row.accidentStatus === '未处理'">{{ row.accidentStatus}}</Tag>
                <Tag checkable color="warning" v-if="row.accidentStatus === '处理中'">{{ row.accidentStatus}}</Tag>
              </template>
              <template #action="{ row }">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)"
                        v-if="row.accidentStatus === '已处理' || row.accidentStatus === '处理中'">查看</Button>
                <Button type="error" size="small" @click="resolve(row)"
                        v-if="row.accidentStatus === '未处理'">处理</Button>
              </template>
            </Table>
          </div>
        </Card>
      </Content>
      <SelfFooter></SelfFooter>
    </Layout>
  </div>
</template>

<script>
import SelfHeader from "@/components/SelfHeader";
import SelfFooter from "@/components/SelfFooter";

export default {
  name: "AccidentInfoList",
  components: {SelfFooter, SelfHeader},
  data() {
    return {
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
          key: 'vehicleType'
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
      accidentList: [
        {
          id: 1,
          name: 'John Brown',
          vehicleNumber: 18,
          vehicleType: '小汽车',
          accidentAddress: '甘肃省兰州市',
          accidentTime: '2023-03-04',
          accidentStatus: '已处理'
        },
        {
          id: 2,
          name: 'John Brown',
          vehicleNumber: 18,
          vehicleType: '小汽车',
          accidentAddress: '甘肃省兰州市',
          accidentTime: '2023-03-05',
          accidentStatus: '未处理'
        },
        {
          id: 3,
          name: 'John Brown',
          vehicleNumber: 18,
          vehicleType: '小汽车',
          accidentAddress: '甘肃省兰州市',
          accidentTime: '2023-03-06',
          accidentStatus: '处理中'
        }
      ]
    }
  },
  methods: {
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
