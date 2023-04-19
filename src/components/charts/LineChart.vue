<template>
  <div class="echarts-box">
    <div id="lineChart" :style="{ width: '100%', height: '300px' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {onMounted, onUnmounted} from "vue";

export default {
  name: "LineChart",
  setup() {
    /// 声明定义一下echart
    let echart = echarts;

    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      echart.dispose;
    });

    // Echarts基础配置
    function initChart() {
      let chart = echart.init(document.getElementById("lineChart"));
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
          data: ['2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04',
                 '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04',
                 '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04',
                 '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04', '2022/03/04',
                 '2022/03/04', '2022/03/04']
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
            data: [10, 60, 30, 45, -56, 60, 70, 100, 34, 79,
              10, 60, 30, 45, 56, 60, 70, 100, 34, 79,
              10, 60, 30, 45, 56, 60, 70, 100, 34, 79,]
          }
        ]
      });
      window.onresize = function() {
        //自适应大小
        chart.resize();
      };
    }
    return { initChart };
  }
}
</script>

<style scoped>

</style>
