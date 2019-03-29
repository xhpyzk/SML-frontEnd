<template>
  <a-col :span="17">
    <points-list></points-list>
    <br>
    <new-points></new-points>
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
