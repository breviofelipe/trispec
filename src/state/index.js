import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // mode: "light",
  mode: "dark",
  user: null,
  token: null,
  posts: [],
  tasks: [],
  turmas: []
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
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setTasks, setTurmas } =
  authSlice.actions;
export default authSlice.reducer;
