<template>
  <div class="home">
    <div class="layout">
      <Layout>
        <SelfHeader></SelfHeader>
        <Content :style="{padding: '0 50px'}">
          <Breadcrumb :style="{margin: '20px 0'}">
            <BreadcrumbItem>驾乘人员颅脑伤情监测平台</BreadcrumbItem>
          </Breadcrumb>
          <SelfContent></SelfContent>
        </Content>
        <SelfFooter></SelfFooter>
<!--        <Footer class="layout-footer-center">2023 &copy; 驾乘人员颅脑伤情监测平台</Footer>-->
      </Layout>
    </div>
  </div>
</template>
<script>
import SelfHeader from "@/components/SelfHeader";
import SelfContent from "@/components/content/SelfContent";
import SelfFooter from "@/components/SelfFooter";

export default {
  name: 'HomeView',
  components: {SelfFooter, SelfContent, SelfHeader}
}
</script>
<style>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-footer-center {
  text-align: center;
}
</style>
