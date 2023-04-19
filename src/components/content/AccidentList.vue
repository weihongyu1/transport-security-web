<template>
  <Row :gutter="16">
    <Col span="8">
      <Card>
        <Table :columns="alreadyColumns" :data="alreadyData"></Table>
      </Card>
    </Col>
    <Col span="8">
      <Card>
        <Table :columns="alreadyColumns" :data="alreadyData"></Table>
      </Card>
    </Col>
    <Col span="8">
      <Card>
        <Table :columns="alreadyColumns" :data="alreadyData"></Table>
      </Card>
    </Col>
  </Row>
</template>

<script>
import {Card} from "view-ui-plus";
export default {
  name: "AccidentList",
  components: {Card},
  data () {
    return {
      alreadyColumns: [
        {
          title: '日期',
          key: 'date',
          sortable: true,
          className: 'already'
        },
        {
          title: '车牌号',
          key: 'name',
          className: 'already'
        },
        {
          title: '伤情',
          key: 'age',
          className: 'already'
        },
        {
          title: '处理状态',
          key: 'address',
          className: 'already'
        }
      ],
      alreadyData: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
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
