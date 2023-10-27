// auth.js

import axios from 'axios';

const state = {
  name: '',
  email: '',
  password: '',
  user: null
};

const mutations = {
  SET_NAME(state, name) {
    state.name = name;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  SET_PASSWORD(state, password) {
    state.password = password;
  },
  SET_USER(state, user) {
    state.user = user;
  }
};

const actions = {
  async register({ commit, state }) {
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: state.name,
        email: state.email,
        password: state.password
      });

      if (response.status === 201) {
        alert("SignUp Done");
        commit('SET_USER', response.data);
        localStorage.setItem("user-info", JSON.stringify(response.data));
      } else {
        console.error("Registration failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
};

export default {
  state,
  mutations,
  actions
};
