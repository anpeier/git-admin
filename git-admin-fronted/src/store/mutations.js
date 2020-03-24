export const classMutations = {
  saveClassList(state, payload) {
    state.classList = payload;
  }
};

export const studentMutations = {
  saveStuList(state, payload) {
    state.studentList = payload;
  },
  addStudent(state,payload){
    console.log(payload)
    state.studentList.push(payload)
    state.studentInfo = {}
  }
};
