<template>
  <div>
    <project-header></project-header>
    <project-sider></project-sider>
  </div>
</template>
<script>
import ProjectHeader from './components/header'
import ProjectSider from './components/sider'
export default {
  name: 'Project',
  components: {
    ProjectHeader,
    ProjectSider
  }
}
</script>

<style>
</style>
