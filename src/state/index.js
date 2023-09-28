import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // mode: "light",
  mode: "dark",
  user: null,
  token: null,
  posts: [],
  tasks: [],
  turmas: [],
  turma: null,
  ator: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.payload.post.id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setTurmas: (state, action) => {
      state.turmas = action.payload.turmas;
    },
    setTurma: (state, action) => {
      state.turma = action.payload.turma;
    },
    setAtor: (state, action) => {
      state.ator = action.payload.ator;
      const atoresUpdated = state.turma.atores.map((ator) => {
        if (ator.id === action.payload.ator.id) return action.payload.ator;
        return ator;
      });
      state.turma.atores = atoresUpdated;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setTasks, setTurmas, setTurma, setAtor } =
  authSlice.actions;
export default authSlice.reducer;
