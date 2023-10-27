<template>
    <div>
        <Header/>
        <h1 class="mb-5">Welcome From Update Restaurant tab</h1>
        <div class="addRestaurant">
            <input v-model="restaurant.name" type="text" placeholder="Enter Name">
            <input v-model="restaurant.address" type="text" placeholder="Enter Address">
            <input v-model="restaurant.contact_number" type="text" placeholder="Enter Contact Number">
            <button @click="updateRestaurant">Submit</button>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';

export default {
    name: 'AddRestaurant',
    data() {
        return {
            restaurant:{
            name: '',
            address: '',
            contact_number: ''
            }
        };
    },
    components: {
        Header
    },
    async mounted(){
        console.warn(this.$route.params.id)
       
      const result=await axios.get('http://127.0.0.1:8000/api/restaurants/'+this.$route.params.id)

      console.log(result.data)
      this.restaurant=result.data
      let user=localStorage.getItem('user-info')
    if(!user){
      this.$router.push({ name: 'SignUp' });
    }
    },
    methods: {
       async updateRestaurant(){
            console.warn(this.restaurant)
            const result=await axios.put('http://127.0.0.1:8000/api/restaurants/'+this.$route.params.id,{
            name:this.restaurant.name,
            address:this.restaurant.address,
            contact_number:this.restaurant.contact_number
            });
            if(result.status==200){
                this.$router.push({name:'Home'})
            }
        }
    },
   
   
};
</script>

<style scoped>
.addRestaurant input {
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

.addRestaurant button {
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
