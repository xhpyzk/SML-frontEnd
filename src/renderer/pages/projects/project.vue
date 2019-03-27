<template>
  <div>
    <project-header></project-header>
    <br>
    <br>
    <a-row>
      <project-sider @change="changeShow"></project-sider>
      <project-overview v-if="show === 'project_overview'"></project-overview>
      <monitor-overview v-else-if="show === 'monitor_overview'"></monitor-overview>
      <monitor-points v-else-if="show === 'monitor_points'"></monitor-points>
      <monitor-contents v-else-if="show === 'monitor_contents'"></monitor-contents>
    </a-row>
  </div>
</template>
<script>
import ProjectHeader from './components/header'
import ProjectSider from './components/sider'
import ProjectOverview from './components/projectOverview'
import monitorOverview from './components/contents/monitorOverview'
import monitorPoints from './components/contents/monitorPoints'
import monitorContents from './components/contents/monitorContents'
export default {
  name: 'Project',
  components: {
    ProjectHeader,
    ProjectSider,
    ProjectOverview,
    monitorOverview,
    monitorPoints,
    monitorContents
  },
  data () {
    return {
      show: 'project_overview'
    }
  },
  methods: {
    changeShow (showWhat) {
      this.show = showWhat
    }
  }
}
</script>

<style>
</style>