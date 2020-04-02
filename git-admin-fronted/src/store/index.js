import Vue from "vue";
import Vuex from "vuex";
import { classActions, studentActions, userActions } from "./actions";
import { classMutations, studentMutations, userMutations } from "./mutations";
import { classGetters, studentGetters, userGetters } from "./getters";
import { getToken } from "./../utils/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classList: [],
    classInfo: {},
    studentList: [],
    stuTotal: 0,
    studentInfo: {},
    curStuCommits: [],
    token: getToken()
  },
  mutations: {
    ...classMutations,
    ...studentMutations,
    ...userMutations
  },
  actions: {
    ...classActions,
    ...studentActions,
    ...userActions
  },
  getters: {
    ...classGetters,
    ...studentGetters,
    ...userGetters
  }
});
