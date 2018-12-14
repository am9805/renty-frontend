<template>
    <nav class="nav navbar ">
        <div class="navbar-brand">
            <img alt="Renty logo" src="../assets/Renty-ico.png">
            <router-link to="/home">RENTY</router-link>
        </div>
        
        <form class="form-inline">
            <router-link v-if="!user" to="/login">Registrarse/Ingresar</router-link>
            <router-link v-if="user" to="/booking">Reservas</router-link>
            <router-link v-if="user" to="/profile">{{user.displayName}}</router-link>
        </form>
    </nav>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            user() {
                return this.$store.getters['user/user']
            }
        },
        props: {
            msg: String
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .nav {
        background-color: #12223D;
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #ffffff;
        margin-left: 80px;
    }
    .form-inline{
        margin-right: 80px;
    }
    
</style>
