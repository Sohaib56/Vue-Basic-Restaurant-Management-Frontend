<template>
    <img class="mt-5 mb-5" alt="Vue logo" src="../assets/resturant-img.png">
<h1 class="mb-3">Login</h1>
<div class="login">
    <input v-model="email" type="email" placeholder="Enter Email">
    <input v-model="password" type="password" placeholder="Enter Password">
    <button @click="handleLogin">Submit</button>
    <div v-if="loginError" class="error-message text-danger">{{ loginError }}</div>
    <router-link to="/sign-up">Sign Up</router-link>
  </div>
</template>
<script>
// import axios from 'axios'
import { mapActions } from 'vuex';

export default {
    name:'LogIn',
    data(){
        return{

            email:'',
            password:'',
            loginError:'',
        }
    },
    methods: {
        ...mapActions(['login']),
        async handleLogin() {
      try {
        const response = await this.login({
          email: this.email,
          password: this.password,
        });

        console.log('Login successful', response);
        this.$router.push({ name: 'Home' });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.loginError = 'Invalid credentials. Please try again.';
        } else {
          console.error('Login failed', error);
        }
      }
    },


},
};
</script>
<style scoped>
.login input{
    height: 50px;
    width: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    padding-left: 10px;
    border: 1px solid rgb(146, 146, 219);
    border-radius: 20px;
  }
  .login button{
    font-size: larger;
    font-weight: bolder;
    height: 50px;
    width: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    border: 1px solid rgb(146, 146, 219);
    border-radius: 20px;
    color: #2c3e50;
  }
</style>
