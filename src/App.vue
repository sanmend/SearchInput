<template>
  <div id="app">
    <search-input></search-input>
    <search-content></search-content>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput.vue";
import SearchContent from "@/components/SearchContent.vue";
export default {
  name: "App",
  components: {
    SearchInput,
    SearchContent,
  },
  created() {
    // 将localStorage的搜索记录存入vuex
    if (localStorage.getItem("recordList")) {  //判断localStorage是否有历史记录
      this.$store.state.recordList = JSON.parse(
        localStorage.getItem("recordList")
      );
    }
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  left: 0;
  top: 0;
  background: url('./assets/Purplepine.jpg');
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
