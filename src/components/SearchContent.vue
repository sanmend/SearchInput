<template>
  <div class="container">
    <p>您搜索的结果为：{{$store.state.inputValue}}</p>
    <p>...... ...... ......</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  bottom: 20vh;
  color:#fff;
  font-size: 18px;
}
</style>