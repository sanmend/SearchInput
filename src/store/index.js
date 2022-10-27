import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 输入框内容和历史记录
const state = {
    inputValue: "",
    recordList: [],
};

const mutations = {
    // 改变输入框内容
    SET_INPUTVALUE(state, value) {
        state.inputValue = value;
    },
    // 添加历史记录
    SET_RECORD(state, record) {
        if (state.recordList.includes(record)) {
            let index = state.recordList.findIndex(item => item == record)
            state.recordList.splice(index, 1)
        }
        if (state.recordList.length >= 10) {
            state.recordList.pop()
        }
        state.recordList.unshift(record)

        localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    // 清除历史记录
    DELETE_RECORD(state) {
        state.recordList = []
        localStorage.removeItem("recordList")
    }
};

const actions = {
    setValue({ commit }, value) {
        return new Promise((resolve, reject) => {
            commit("SET_INPUTVALUE", value);
            resolve("success!");
        });
    },
    setRecord({ commit }, record) {
        return new Promise((resolve, reject) => {
            //搜索内容为空则reject
            if (record) {
                commit("SET_RECORD", record);
                resolve("success!");
            } else {
                reject("搜索为空")
            }
        });
    },
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
});