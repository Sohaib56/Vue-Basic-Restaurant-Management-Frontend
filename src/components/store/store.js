import {createStore} from'vuex';
import axios from 'axios';

const registerModule={

state : {
  name: '',
  email: '',
  password: '',
  user: null,
  error:''
},

mutations : {
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
},
actions : {
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
        localStorage.setItem('authToken', response.data.token);
      } else {
        console.error("Registration failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      });

      console.log('Login successful', response.data);
      commit('SET_USER', response.data);
      localStorage.setItem('user-info', JSON.stringify(response.data));
      localStorage.setItem('authToken', response.data.token);

      return response.data; // Return the response for further handling in the component
    } catch (error) {
      console.error('Login failed', error);
      throw error; // This line can be omitted, the error will be caught in the component
    }
  },
},
}


const homeModule={
  state: {
    restaurants: [],
  },
  mutations: {
    setRestaurants(state, restaurants) {
      state.restaurants = restaurants;
    },
    addRestaurant(state, restaurant) {
      state.restaurants.push(restaurant);
    },
    deleteRestaurant(state, restaurantId) {
      state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== restaurantId);
    },
  },
  actions: {
    async fetchRestaurants({ commit }) {
      try {
        let response = await axios.get('http://127.0.0.1:8000/api/restaurants');
        commit('setRestaurants', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addRestaurant({ commit }, restaurantData) {
      try {
        let response = await axios.post('http://127.0.0.1:8000/api/restaurants', restaurantData);
        commit('addRestaurant', response.data); 
      
      } catch (error) {
        console.error(error);
      }
    },
    async deleteRestaurant({ commit }, restaurantId) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/restaurants/${restaurantId}`);
        
        commit('deleteRestaurant', restaurantId);
      } catch (error) {
        console.error(error);
      }
    },
  },
  }




export default createStore({
    modules:{
        register:registerModule,
        home:homeModule,
    },
})