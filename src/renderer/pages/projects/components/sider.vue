<template>
  <a-row>
    <a-col :span="6">
      <a-menu style="width: 256px" mode="vertical" @click="handleClick">
        <a-menu-item key="1">
          <a-icon type="mail"/>工程概况
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="calendar"/>监测概况
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="calendar"/>Navigation Three
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col :span="18"></a-col>
  </a-row>
</template>

<script>
export default {
  name: 'ProjectSider',
  methods: {
    handleClick (e) {
      console.log('click', e)
    }
  }
}
</script>

