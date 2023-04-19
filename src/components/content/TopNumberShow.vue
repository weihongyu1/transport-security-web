<template>
  <div style="width: 90%; margin-left: 5%">
<!--    <div style="margin-left: 1rem">事故人数处理规模占比</div>-->
    <Row>
      <Col span="8">
        <Circle :size="circleSize" :trail-width="4" :stroke-width="5" :percent="workingPercent" stroke-linecap="square" stroke-color="#43a3fb">
          <div class="demo-Circle-custom">
            <h1>300</h1>
            <p>正在处理人数规模</p>
            <span>
                总占人数
                <i>30%</i>
            </span>
          </div>
        </Circle>
      </Col>
      <Col span="8">
        <Circle :size="circleSize" :trail-width="4" :stroke-width="5" :percent="alreadyPercent" stroke-linecap="square" stroke-color="#19be6b">
          <div class="demo-Circle-custom">
            <h1>600</h1>
            <p>已处理人数规模</p>
            <span>
                总占人数
                <i>60%</i>
            </span>
          </div>
        </Circle>
      </Col>
      <Col span="8">
        <Circle :size="circleSize" :trail-width="4" :stroke-width="5" :percent="nonePercent" stroke-linecap="square" stroke-color="#ed4014">
          <div class="demo-Circle-custom">
            <h1>100</h1>
            <p>未处理人数规模</p>
            <span>
                总占人数
                <i>10%</i>
            </span>
          </div>
        </Circle>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "TopNumberShow",
  data() {
    return {
      circleSize: 200,
      workingPercent: 30,
      alreadyPercent: 60,
      nonePercent: 10
    }
  }
}
</script>

<style scoped>

</style>
