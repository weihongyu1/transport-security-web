<template>
  <div class="echarts-box">
    <div id="ayLineChart" :style="{ width: '100%', height: '200px' }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "AyLineChart",
  props: {
    ays: {
      type: String,
      default: ''
    }
  },
  watch: {
    ays: {
      handler (val) {
        this.ayList = val
        this.initChart(val)
      },
      deep: true
    }
  },
  data() {
    return {
      date: [],
      ayList: []
    }
  },
  methods: {
    initChart(val) {
      let chart = echarts.init(document.getElementById("ayLineChart"));
      // 配置和数据
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: 'Ay纵向加速度变化'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.date
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        series: [
          {
            name: '纵向加速度',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: val
          }
        ]
      });
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }
  }
}
</script>

<style scoped>

</style>
