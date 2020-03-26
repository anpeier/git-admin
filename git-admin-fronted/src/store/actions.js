import { getClassList } from "./../api/class";
import { getStudentList, getStuById, updateStu } from "./../api/students";
export const classActions = {
  getClass({ commit }) {
    getClassList().then(res => {
      commit("saveClassList", res);
    });
  }
};

export const studentActions = {
  getStudents({ commit }, params) {
    getStudentList({
      params: {
        ...params
      }
    }).then(res => {
      commit("saveStuList", res.stuList);
      commit("saveStuTotal", res.total);
    });
  },
  addStudentOne({ commit }, studentInfo) {
    commit("addStudent", studentInfo);
  },
  saveStuInfo({ commit }, studentInfo) {
    commit("saveStuInfo", studentInfo);
  },
  getStuInfoById({ commit }, id) {
    getStuById({
      id
    }).then(res => {
      commit("saveStuInfo", res[0]);
    });
  },
  updateStuInfo({ commit }, studentInfo) {
    console.log(studentInfo);
    updateStu({
      studentInfo
    }).then(() => {
      commit('saveStuInfo',{})
    })
  }
};
