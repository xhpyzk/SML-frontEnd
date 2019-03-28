<template>
  <a-col :span="18">
    <points-list></points-list>
    <!-- <new-points></new-points> -->
  </a-col>
</template>

<script>
import pointsList from './monitorPointsList'
import newPoints from './newMonitorPoints'
export default {
  name: 'monitorPoints',
  components: {
    pointsList,
    newPoints
  }
}
</script>

<style>

</style>
