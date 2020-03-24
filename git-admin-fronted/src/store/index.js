import Vue from "vue";
import Vuex from "vuex";
import { classActions, studentActions } from "./actions";
import { classMutations, studentMutations } from "./mutations";
import { classGetters,studentGetters } from "./getters";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classList: [],
    studentList: [],
    studentInfo: {}
  },
  mutations: {
    ...classMutations,
    ...studentMutations
  },
  actions: {
    ...classActions,
    ...studentActions
  },
  getters: {
    ...classGetters,
    ...studentGetters
  }
});
