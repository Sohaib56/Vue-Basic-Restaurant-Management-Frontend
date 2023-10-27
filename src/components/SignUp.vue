<template>
   <div class="reg">
    <img alt="Vue logo" src="../assets/resturant-img.png">
    <h1 class="mt-5 mb-3">Sign Up</h1>
    <div class="register">
        <input v-model="name" type="text" placeholder="Enter Name">
        <input v-model="email" type="email" placeholder="Enter Email">
        <input v-model="password" type="password" placeholder="Enter Password">
        <button @click="handleRegister">Submit</button>
        <router-link to="/login">Login</router-link>
      </div>
   </div>
</template>
<script>
// import axios from 'axios'
export default {
    name:'SignUp',
//     data(){
//         return{
//             name:'',
//             email:'',
//             password:'',
//         }
//     },
//     mounted() {
//             console.log('mount')
//       let user=localStorage.getItem('user-info');
//       if(user){
//         this.$router.push({name:'Home'});
//       }
//    },
//     methods: {
        
//     async handleRegister() {
//         console.warn("Register", this.name, this.email, this.password, this.password_confirmation);
//         try {
//             let response = await axios.post("http://127.0.0.1:8000/api/register", {
//                 name: this.name,
//                 email: this.email,
//                 password: this.password,
//             });

//             console.warn(response);

//             if (response.status === 201) {
//                 alert("SignUp Done");
//                 this.$router.push({name:'Home'});
//             } else {
//                 console.error("Registration failed with status: " + response.status);
//             }
//             localStorage.setItem("user-info",JSON.stringify(response.data))

//         } catch (error) {
//             console.error("Error during registration:", error);

//         }

//     },
  

// }
computed: {
    name: {
      get() {
        return this.$store.state.register.name;
      },
      set(value) {
        this.$store.commit('SET_NAME', value);
      }
    },
    email: {
      get() {
        return this.$store.state.register.email;
      },
      set(value) {
        this.$store.commit('SET_EMAIL', value);
      }
    },
    password: {
      get() {
        return this.$store.state.register.password;
      },
      set(value) {
        this.$store.commit('SET_PASSWORD', value);
      }
    }
  },

  methods: {
    async handleRegister() {
      await this.$store.dispatch('register');
      this.$router.push({ name: 'Home' });
    }
  },
  mounted() {
    let user=localStorage.getItem('user-info')
    if(user){
      this.$router.push({ name: 'Home' });
    }
  },

 }
</script>
<style scoped>
.reg{
  margin-top: 50px;
}
.register input{
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
  .register button{
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
