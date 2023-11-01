<template>
  <div>
    <Header />
    <h1 class="mb-5">Welcome From Add Restaurant tab</h1>
    <div class="addRestaurant">
      <input v-model="name" type="text" placeholder="Enter Name" />
      <input v-model="address" type="text" placeholder="Enter Address" />
      <input
        v-model="contact_number"
        type="text"
        placeholder="Enter Contact Number"
      />
      <button @click="submitRestaurant">Submit</button>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { mapActions, mapState } from "vuex";
// import axios from 'axios';

export default {
  name: "AddRestaurant",
 

  computed: {
    ...mapState({
      userName: (state) => state.register.name,
      token: (state) => state.register.authToken,
    
    }),
    name: {
            get() {
              return this.$store.state.home.name;
            },
            set(value) {
              this.$store.commit("setName", value);
            },
          },
          address: {
            get() {
              return this.$store.state.home.address;
            },
            set(value) {
              this.$store.commit("setAddress", value);
            },
          },
          contact_number: {
            get() {
              return this.$store.state.home.contact_number;
            },
            set(value) {
              this.$store.commit("setContact", value);
            },
          },
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions(["addRestaurant"]),
    async submitRestaurant() {
      const restaurantData = {
        name: this.name,
        address: this.address,
        contact_number: this.contact_number,
    
          
    
      };
      await this.addRestaurant(restaurantData);
      this.$router.push({ name: "Home" });
    },
  },
  mounted() {
    
    if (!this.token) {
      this.$router.push({ name: "SignUp" });
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
