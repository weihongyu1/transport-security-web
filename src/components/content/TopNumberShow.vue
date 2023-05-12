<template>
  <div style="width: 90%; margin-left: 5%">
<!--    <div style="margin-left: 1rem">事故人数处理规模占比</div>-->
    <Row>
      <Col span="8">
        <Circle :size="circleSize" :trail-width="4" :stroke-width="5" :percent="workingPercent" stroke-linecap="square" stroke-color="#43a3fb">
          <div class="demo-Circle-custom">
            <h1>{{ circleNum.working }}</h1>
            <p>正在处理人数规模</p>
            <span>
                总占人数
                <i>{{ workingPercent }}</i>
            </span>
          </div>
        </Circle>
      </Col>
      <Col span="8">
        <Circle :size="circleSize" :trail-width="4" :stroke-width="5" :percent="alreadyPercent" stroke-linecap="square" stroke-color="#19be6b">
          <div class="demo-Circle-custom">
            <h1>{{ circleNum.already }}</h1>
            <p>已处理人数规模</p>
            <span>
                总占人数
                <i>{{ alreadyPercent }}</i>
            </span>
          </div>
        </Circle>
      </Col>
      <Col span="8">
        <Circle :size="circleSize" :trail-width="4" :stroke-width="5" :percent="nonePercent" stroke-linecap="square" stroke-color="#ed4014">
          <div class="demo-Circle-custom">
            <h1>{{ circleNum.none }}</h1>
            <p>未处理人数规模</p>
            <span>
                总占人数
                <i>{{ nonePercent }}</i>
            </span>
          </div>
        </Circle>
      </Col>
    </Row>
  </div>
</template>

<script>
import {accidentState} from "@/api/AccidentApi";

export default {
  name: "TopNumberShow",
  created() {
    this.getState()
  },
  data() {
    return {
      circleSize: 200,
      workingPercent: 30,
      alreadyPercent: 60,
      nonePercent: 10,
      circleNum: {}
    }
  },
  methods: {
    getState() {
      accidentState().then(res => {
        if (res.code === 200) {
          this.workingPercent = this.sumPercent(res.data.working, res.data.total)
          this.alreadyPercent = this.sumPercent(res.data.already, res.data.total)
          this.nonePercent = this.sumPercent(res.data.none, res.data.total)
          this.circleNum = res.data
        }
      })
    },
    sumPercent(num, total) {
      return (num * 1.0 / total).toFixed(2)
    }
  }
}
</script>

<style scoped>

</style>
