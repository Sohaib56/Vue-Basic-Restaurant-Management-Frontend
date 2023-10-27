<template>
    <div>
      <Header />
      <div class="homeHeading">
        <h1>Welcome From Home tab</h1>
      </div>
      <div class="homeTable">
        <table class="table table-light table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="restaurant in restaurants" :key="restaurant.id">
              <th> {{ restaurant.id }}</th>
              <td> {{ restaurant.name }}</td>
              <td> {{ restaurant.address }}</td>
              <td> {{ restaurant.contact_number }}</td>
              <td><router-link  class="btn btn-primary mx-1" :to="/update/+restaurant.id">Update</router-link>
              <button class="btn btn-danger" @click="deleteRestaurant(restaurant.id)">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import Header from './Header.vue';
  import { mapState,mapActions } from 'vuex';

  
  export default {
    name: 'HomeScreen',
   
    computed: {
      ...mapState({
        userName: state => state.register.name
      }),
      restaurants() {

        return this.$store.state.home.restaurants;
      },
    },
    components: {
      Header
    },
    methods:{
    
        ...mapActions(['deleteRestaurant']),
      loadData(){

        console.log('mount');
       
        this.$store.dispatch('fetchRestaurants');
      }
    },
    mounted() {
      this.loadData()
      let user=localStorage.getItem('user-info')
    if(!user){
      this.$router.push({ name: 'SignUp' });
    }
    },
    

  };
  </script>
  <style scoped>
  .homeHeading{
    text-align: center;
  }
  .homeTable{
    width: 80%;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }
  </style>
  