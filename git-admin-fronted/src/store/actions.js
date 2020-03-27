import { getClassList, getClaById, updateClaInfo } from "./../api/class";
import { getStudentList, getStuById, updateStu } from "./../api/students";
export const classActions = {
  getClass({ commit }) {
    getClassList().then(res => {
      commit("saveClassList", res);
    });
  },
  saveClassInfo({ commit }, classInfo) {
    commit("saveCurClassInfo", classInfo);
  },
  getClassById({ commit }, id) {
    getClaById({
      id
    }).then(res => {
      commit("saveCurClassInfo", res[0]);
    });
  },
  updateClaInfo({ commit }, classInfo) {
    updateClaInfo({
      classInfo
    }).then(() => {
      commit("saveCurClassInfo", {});
    });
  }
};

export const studentActions = {
  getStudents({ commit }, params) {
    // console.log(params)
    getStudentList({
      params: {
        ...params
      }
    }).then(res => {
      commit("saveStuList", res.stuList);
      commit("saveStuTotal", res.total);
    });
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
    updateStu({
      studentInfo
    }).then(() => {
      commit("saveStuInfo", {});
    });
  }
};
