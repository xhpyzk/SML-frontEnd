<template>
  <a-col :span="6">
    <a-menu class="menu-style" mode="vertical" @click="handleClick">
      <a-menu-item key="1" @click="projectOverview">
        <a-icon type="calendar"/>工程概况
      </a-menu-item>
      <a-menu-item key="2" @click="monitorOverview">
        <a-icon type="calendar"/>监测概况
      </a-menu-item>
      <a-menu-item key="3" @click="monitorPoints">
        <a-icon type="calendar"/>监测点
      </a-menu-item>
      <a-menu-item key="4" @click="monitorContents">
        <a-icon type="calendar"/>监测内容
      </a-menu-item>
    </a-menu>
  </a-col>
</template>

<script>
export default {
  name: 'ProjectSider',
  methods: {
    handleClick (e) {
      console.log('click', e)
    },
    projectOverview () {
      this.$emit('change', 'project_overview')
    },
    monitorOverview () {
      this.$emit('change', 'monitor_overview')
    },
    monitorPoints () {
      this.$emit('change', 'monitor_points')
    },
    monitorContents () {
      this.$emit('change', 'monitor_contents')
    }
  }
}
</script>

<style>
.menu-style {
  width: 256px;
}
</style>


