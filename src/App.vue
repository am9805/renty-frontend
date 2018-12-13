<template > 
    <div id="app" class="app">
        <Header/>
        <img alt="Vue logo" src="./assets/Renty-mid.png">
            <router-view></router-view>
        <Footer class="footer"/>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  }
};
</script>

<style>

.app {
  text-align: center;
  color: #2c3e50;
  background-image: url("assets/Fondo.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 600px;
}
.app img {
    margin-top: 5px;
    margin-bottom: 2px;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgb(201, 209, 211);
  margin-top: 90%;
}
</style>
