export const classMutations = {
  saveClassList(state, payload) {
    state.classList = payload;
  }
};

export const studentMutations = {
  saveStuList(state, payload) {
    state.studentList = payload;
  },
  saveStuTotal(state, payload) {
    state.stuTotal = payload;
  },
  addStudent(state, payload) {
    console.log(payload);
    if (state.studentList.length == 0) {
      state.studentList = payload;
    } else {
      state.studentList.push(payload);
    }

    state.studentInfo = {};
  },
  saveStuInfo(state, payload) {
    state.studentInfo = payload;
  }
};
