<template>
  <div>
<!--    顶层数据展示 -->
    <Card>
      <TopNumberShow></TopNumberShow>
    </Card>

<!--    事件处理数据展示 -->
    <Card style="margin-top: 1rem">
      <EventProcessShow></EventProcessShow>
    </Card>

<!--    事件处理状态数据 -->
    <AccidentList style="margin-top: 1rem"></AccidentList>
  </div>
</template>

<script>
import TopNumberShow from "@/components/content/TopNumberShow";
import EventProcessShow from "@/components/content/EventProcessShow";
import {Card} from "view-ui-plus";
import AccidentList from "@/components/content/AccidentList";
export default {
  name: "SelfContent",
  components: {AccidentList, Card, EventProcessShow, TopNumberShow}
}
</script>

<style scoped>

</style>
