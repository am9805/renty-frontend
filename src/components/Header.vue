<template>
    <nav class="nav navbar ">
        <div class="navbar-brand">
            <img alt="Renty logo" src="../assets/Renty-ico.png">
            <a  href="/home">RENTY</a>
        </div>
        
        <form class="form-inline">
            <div class="form-group">
                <router-link v-if="user" to="/reservations">Mis Reservas</router-link>
            </div>
            <div class="form-group">
                <router-link v-if="!user" to="/login">Registrarse/Ingresar</router-link>
                <router-link v-if="user" to="/profile">{{user.displayName}}</router-link>            
            </div>
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
