<template>
  <GlobalFooter :links="links" :copyright="copyright" />
</template>

<script>
export default {
  name: "SelfFooter",
  data () {
    return {
      links: [
        {
          key: '帮助',
          title: '帮助',
          href: '#',
          blankTarget: true
        },
        {
          key: 'github',
          icon: 'logo-github',
          href: 'https://github.com/weihongyu1/transport-security-web',
          blankTarget: true
        },
        {
          key: '条款',
          title: '条款',
          href: '',
          blankTarget: true
        }
      ],
      copyright: 'UJS © 2023 驾乘人员颅脑伤情监测平台'
    }
  }
}
</script>

<style scoped>

</style>
