import {createStore} from'vuex';
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';

const registerModule={
  // plugins: [createPersistedState()],

state : {
  name: '',
  email: '',
  password: '',
  user: null,
  error:'',
  authToken:'',
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
  },
  SET_Token(state, authToken) {
    state.authToken = authToken;
  },
  SET_Error(state, error) {
    state.error = error;
  },
},
actions : {
  async register({ commit, state }) {
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: state.name,
        email: state.email,
        password: state.password,
      });
      

      if (response.status === 201) {

        console.log(response.data.token);
        alert("SignUp Done");
        commit('SET_USER', response.data);
        commit('SET_Token',response.data.token);
       
      } else {
        console.error("Registration failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      commit('SET_error',this.response.status)
    }
  },
  async login({ commit,state }) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: state.email,
        password: state.password,
      });

      console.log('Login successful', response.data);
      commit('SET_USER', response.data);
      commit('SET_Token',response.data.token);
      console.log(state.user,state.authToken);
      

      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },
    async logout({ commit,state }) {
      try {
        const authToken = state.authToken

        if (!authToken) {
          console.error('Authentication token not found.');
          return;
        }

        const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log('Logout successful', response.data);

       
        commit('SET_USER', null);
        this.$router.push({ name: 'Login' });

      } catch (error) {
        console.error('Logout failed');
        
      }
    },
},

}


const homeModule={
  state: {
    restaurants: [],
    name:null,
    address:null,
    contact_number:null,
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
    setAddress(state, address) {
      state.address = address;
    },
    setContact(state, contact_number) {
      state.contact_number = contact_number;
    },
    setRestaurants(state, restaurants) {
      state.restaurants = restaurants;
    },
    addRestaurant(state, restaurant) {
      state.restaurants.push(restaurant);
    },
    deleteRestaurant(state, restaurantId) {
      state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== restaurantId);
    },
    updateRestaurant(state, restId, restaurant ) {
      const restaurantIndex = state.restaurants.find(restaurant => restaurant.id === restId);
        state.restaurants[restaurantIndex] = restaurant;
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
    async updateRestaurant({ commit }, { restId, restaurant }) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/restaurants/${restId}`, restaurant);
        if (response.status === 200) {
          commit('updateRestaurant',  restId, restaurant );
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  }

export default createStore({
    modules:{
        register:registerModule,
        home:homeModule,
    },
    plugins: [createPersistedState()], 
  })