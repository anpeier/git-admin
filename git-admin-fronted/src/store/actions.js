import { getClassList, getClassBy, updateClaInfo } from "./../api/class";
import {
  getStudentList,
  getStuById,
  updateStu,
  getCommits,
  getRemindStu,
  sendRemind,
} from "./../api/students";
import { login } from "./../api/user";
import { setToken, removeToken } from "./../utils/auth.js";
export const classActions = {
  getClass({ commit }) {
    return new Promise((resolve, reject) => {
      getClassList()
        .then((res) => {
          commit("saveClassList", res);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getOneClass({ commit }, params) {
    return new Promise((resolve, reject) => {
      getClassBy({
        ...params,
      })
        .then((res) => {
          commit("saveCurClassInfo", res[0]);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateClaInfo({ commit }, classInfo) {
    return new Promise((resolve, reject) => {
      updateClaInfo({
        classInfo,
      })
        .then(() => {
          commit("saveCurClassInfo", {});
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  saveClassInfo({ commit }, classInfo) {
    commit("saveCurClassInfo", classInfo);
  },
};

export const studentActions = {
  getStudents({ commit }, params) {
    return new Promise((resolve, reject) => {
      getStudentList({
        ...params,
      })
        .then((res) => {
          commit("saveStuList", res.stuList);
          commit("saveStuTotal", res.total);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  saveStuInfo({ commit }, studentInfo) {
    commit("saveStuInfo", studentInfo);
  },
  getStuInfoById({ commit }, id) {
    return new Promise((resolve, reject) => {
      getStuById({
        id,
      })
        .then((res) => {
          commit("saveStuInfo", res[0]);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateStuInfo({ commit, dispatch }, studentInfo) {
    return new Promise((resolve, reject) => {
      updateStu({
        studentInfo,
      })
        .then(() => {
          commit("saveStuInfo", {});
          dispatch("getStudents");
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getCommitList({ commit }, id) {
    return new Promise((resolve, reject) => {
      getCommits({
        id,
      })
        .then((res) => {
          commit("saveStuCommits", res);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getRemindList({ commit }) {
    return new Promise((resolve, reject) => {
      getRemindStu()
        .then((res) => {
          for (const item of res) {
            // 设置提醒状态 true：需要提醒 false：不需要提醒
            item.status = true;
          }
          commit("saveRemindList", res);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  remind({}, stuArr) {
    const params = JSON.stringify(stuArr);
    console.log(params);
    return new Promise((resolve, reject) => {
      sendRemind({
        params,
      })
        .then((res) => {
          console.log(res);
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
};

export const userActions = {
  login({ commit }, loginData) {
    const { username, pwd } = loginData;
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: pwd,
      })
        .then((res) => {
          commit("saveToken", res.token);
          setToken(res.token);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delToken({ commit }) {
    return new Promise((resolve) => {
      commit("delToken");
      removeToken();
      resolve();
    });
  },
};
