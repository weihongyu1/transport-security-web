<template>
  <div class="echarts-box">
    <div id="lineChart" :style="{ width: '100%', height: '300px' }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {accidentTrend} from "@/api/AccidentApi";

export default {
  name: "AccidentLineChart",
  data() {
    return {
      date: [],
      value: []
    }
  },
  async created() {
    await this.getTrend()
    this.initChart()
  },
  methods: {
    async getTrend() {
      await accidentTrend().then(res => {
        if (res.code === 200) {
          this.date = res.data.date
          this.value = res.data.value
        }
      })
    },
    initChart() {
      let chart = echarts.init(document.getElementById("lineChart"));
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
          text: '近30天车辆事故数据量'
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
            name: '车辆事故数量',
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
            data: this.value
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
