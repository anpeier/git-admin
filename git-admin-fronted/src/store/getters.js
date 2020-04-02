export const classGetters = {
  classList(state) {
    return state.classList;
  },
  classInfo(state) {
    return state.classInfo;
  }
};

export const studentGetters = {
  studentList(state) {
    return state.studentList;
  },
  studentInfo(state) {
    return state.studentInfo;
  },
  commits(state) {
    return state.curStuCommits;
  }
};

export const userGetters = {
  getToken(state) {
    return state.token;
  }
};
