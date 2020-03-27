export const classMutations = {
  saveClassList(state, payload) {
    state.classList = payload;
  },
  saveCurClassInfo(state, payload){
    state.classInfo = payload
  }
};

export const studentMutations = {
  saveStuList(state, payload) {
    state.studentList = payload;
  },
  saveStuTotal(state, payload) {
    state.stuTotal = payload;
  },

  saveStuInfo(state, payload) {
    state.studentInfo = payload;
  }
};
