<template>
  <div class="echarts-box">
    <div id="lineChart" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {onMounted, onUnmounted, watchEffect} from "vue";

export default {
  props:['date', 'value'],
  name: "LineChart",
  setup(props) {
    /// 声明定义一下echart
    let echart = echarts;

    watchEffect(() => {
      console.log(`date ` + props.date)
    })

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
          data: props.date
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
            data: props.value
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
