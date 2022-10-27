<template>
  <div class="container">
    <h1>Search</h1>
    <!-- 搜索框 -->
    <div class="container-input">
      <input
        class="search-ipt"
        type="search"
        placeholder="请输入搜索内容"
        v-model.trim="inputValue"
        @input="change"
        @keydown.enter="search()"
      />
      <img
        class="search-btn"
        src="@/assets/iconfont/search.png"
        alt="加载中。。。"
        @click="search()"
      />
    </div>
    <!-- 搜索联想 -->
    <div class="container-suggest">
      <p
        class="suggest-item"
        v-for="item in searchDataList"
        :key="item[1]"
        @click="getValue(item[0])"
      >
        {{ item[0] }}
      </p>
    </div>
    <!-- 历史记录 -->
    <div class="container-record" v-show="recordShow">
      <div class="record-title">
        <p class="title">历史记录</p>
        <img
          class="record-del"
          src="@/assets/iconfont/delete.png"
          alt="正在加载。。。"
          @click="$store.commit('DELETE_RECORD')"
        />
      </div>
      <div class="record-content">
        <p
          class="record-item"
          v-for="(item, index) in $store.state.recordList"
          :key="index"
          @click="getValue(item)"
        >
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "@/utils/request";
import debounce from "@/utils/debounce";
export default {
  data() {
    return {
      inputValue: "",
      searchDataList: [],
    };
  },
  methods: {
    // 搜索方法
    search() {
      this.searchDataList = [];
      this.$store.dispatch("setValue", this.inputValue);
      this.$store
        .dispatch("setRecord", this.inputValue)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 搜索框内容改变触发搜索联想
    change: debounce(function () {
      request({ url: "/sug?q=" + this.inputValue, method: "get" })
        .then((res) => {
          this.dataShow = true;
          this.searchDataList = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 300),

    //点击联想词条，触发搜索
    getValue(value) {
      this.inputValue = value;
      this.search();
    },
  },
  computed: {
    // 计算属性判断历史内容盒子是否显示
    recordShow() {
      if (this.searchDataList.length > 0) return false;
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 24px;
    width: 380px;
    text-align: left;
    color: #fff;
  }
  .container-input {
    padding: 6px 20px;
    width: 340px;
    height: 40px;
    border-radius: 6px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .search-ipt {
      padding: 0 10px;
      width: 270px;
      height: 40px;
      background-color: transparent;
      border: none;
      border-radius: 5px;
      outline: none;
      font-size: 16px;
      background-color: #ececec;
    }

    .search-ipt[type="search"]::-webkit-search-cancel-button {
      color: #fff;
      cursor: pointer;
    }

    .search-ipt:hover {
      background-color: #fff;
    }
    .search-btn {
      margin-left: 20px;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  .container-suggest {
    margin-top: -6px;
    width: 380px;
    background-color: #fff;
    .suggest-item {
      margin: 5px 0;
      padding: 5px 0 5px 30px;
      text-align: start;
      font-size: 14px;
      cursor: pointer;
    }
    .suggest-item:hover {
      background-color: #ececec;
    }
  }
  .container-record {
    margin: 10px 0 0 -10px;
    .record-title {
      width: 300px;
      height: 30px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-weight: 400;
        font-size: 14px;
      }
      .record-del {
        vertical-align: middle;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
    .record-content {
      width: 300px;
      display: flex;
      flex-wrap: wrap;
      .record-item {
        max-width: 80px;
        margin: 0 10px 10px 0;
        padding: 3px 5px;
        border-radius: 5px;
        background-color: #ececec;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        cursor: pointer;
      }
      .record-item:hover {
        background-color: #fff;
      }
    }
  }
}
// }
</style>
