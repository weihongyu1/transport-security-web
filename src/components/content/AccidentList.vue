<template>
  <Row :gutter="16">
    <Col span="8">
      <Card>
        <h3>已处理数据</h3>
        <Table :columns="alreadyTableColumns" :data="alreadyData"></Table>
      </Card>
    </Col>
    <Col span="8">
      <Card>
        <h3>正在处理数据</h3>
        <Table :columns="workingTableColumns" :data="workingData"></Table>
      </Card>
    </Col>
    <Col span="8">
      <Card>
        <h3>未处理数据</h3>
        <Table :columns="noneTableColumns" :data="noneData"></Table>
      </Card>
    </Col>
  </Row>
</template>

<script>
import {Card} from "view-ui-plus";
import {accidentHome} from "@/api/AccidentApi";
export default {
  name: "AccidentList",
  components: {Card},
  mounted() {
    this.accidentHomeInfo()
  },
  data () {
    return {
      alreadyTableColumns: [
        {
          title: '日期',
          key: 'date',
          sortable: true,
          className: 'already'
        },
        {
          title: '车牌号',
          key: 'vehicleNumber',
          className: 'already'
        },
        {
          title: '伤情',
          key: 'accidentLevel',
          className: 'already'
        }
      ],
      workingTableColumns: [
        {
          title: '日期',
          key: 'date',
          sortable: true,
          className: 'already'
        },
        {
          title: '车牌号',
          key: 'vehicleNumber',
          className: 'already'
        },
        {
          title: '伤情',
          key: 'accidentLevel',
          className: 'already'
        }
      ],
      noneTableColumns: [
        {
          title: '日期',
          key: 'date',
          sortable: true,
          className: 'already'
        },
        {
          title: '车牌号',
          key: 'vehicleNumber',
          className: 'already'
        },
        {
          title: '伤情',
          key: 'accidentLevel',
          className: 'already'
        }
      ],
      alreadyData: [],
      workingData: [],
      noneData: []
    }
  },
  methods: {
    /**
     * 获取首页事故信息
     * @param state
     * @param index
     * @param limit
     */
    accidentInfo() {
      accidentHome(0, 1, 10).then(res => {
        if (res.code === 200) {
          this.workingData = res.data
        }
      })
      accidentHome(1, 1, 10).then(res => {
        if (res.code === 200) {
          this.alreadyData = res.data
        }
      })
      accidentHome(2, 1, 10).then(res => {
        if (res.code === 200) {
          this.noneData = res.data
        }
      })
    },
    accidentHomeInfo() {
      this.accidentInfo()
    }
  }
}
</script>

<style scoped>
.already {
  background-color: #19be6b;
  color: #fff;
}
.working {
  background-color: #43a3fb;
  color: #fff;
}
.none {
  background-color: #ed4014;
  color: #fff;
}
</style>
