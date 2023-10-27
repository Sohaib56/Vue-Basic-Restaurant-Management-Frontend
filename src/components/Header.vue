<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-4 mb-5">
        <div class="container-fluid">
          <a class="navbar-brand fs-2" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item ">
                <a class="nav-link active fs-4 px-4" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active fs-4 px-4" aria-current="page" href="/add">Add Resturant</a>
              </li>
              <li class="nav-item ">
                <a @click="handleLogout" class="nav-link active fs-4 px-4 d-flex justify-content-end" aria-current="page" href="#">Logout</a>
              </li>
             
             
            </ul>
           
          </div>
        </div>
      </nav>
</template>
<script>
import axios from 'axios';

export default {
  name:"HeaderNav",

  methods: {
    async handleLogout() {
      try {
        const authToken = localStorage.getItem('authToken');
        
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

        localStorage.removeItem('authToken');
        localStorage.removeItem('user-info');

        this.$router.push({name:'Login'})
        
        
      } catch (error) {
       
        console.error('Logout failed', error.response.data);
      }
    },
  },
};
</script>