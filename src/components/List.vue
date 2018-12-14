<template>
    <div>

        <div class="card">
            <div class="container">
                <div class="panel-defoutl">
                    <Form></Form>
                    <div class="btn-buscar">
                        <Buscar :SearchRenty="SearchRenty"></Buscar>
                    </div>
                </div>
            </div>
        </div>

        <div class="list-group" v-for="listCars in listCars" :key=listCars.id>

            <h5 class="car-title">{{listCars.brand}}</h5>
            <p class="card-text">Tipo: {{listCars.type}}</p>
            <p class="card-text">Modelo: {{listCars.model}}</p>
            <p class="card-text">Precio: ${{listCars.price}}</p>
            <div class="image">
                <td><img :src="listCars.thumbnail"/></td>
            </div>
        </div>


    </div>
</template>

<script>
    import Form from "./Form.vue";
    import Buscar from "./Buscar.vue";
    import Axios from "axios";

    export default {
        name: "List",
        components: {
            Buscar,
            Form
        },
        props: {},
        mounted() {
            //console.log(this.listCars);
        },
        data() {
            return {
                listCars: []
            };
        },
        methods: {
            SearchRenty() {
                Axios.get("https://api.myjson.com/bins/nau0y").then(
                    response => {
                        this.listCars = response.data;
                    }
                    // error => {
                    //   // console.log(error);
                    // }
                );
            }
        }
    };
</script>

<style scoped>
    .container {
        width: 1000px;
        height: 235px;
        text-align: left;
        margin-top: -5px;
        font-family: "Raleway", sans-serif;
        background: #12223d;
        overflow: hidden;
        position: relative;
        color: #fff;

    }

    .btn-primary {
        width: 140px;
        background-color: #2dc4bb;
        color: #fff;
        border-color: #2dc4bb;
        margin-left: 87%;
        margin-top: 5px;
        margin-bottom: 5px;
        text-align: center;
    }

    .panel-defoutl {
        width: 93%;
        background: #12223d;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        margin: 1rem;
        margin-left: 35px;
    }

    .card {
        width: 100%;
        height: 235px;
        text-align: left;
        background-color: #12223d;
        opacity: 0.8;
        margin-top: -5px;
        font-family: "Raleway", sans-serif;
        background: #12223d;
        overflow: hidden;
        color: #fff;


    }

    .btn-buscar {
        margin-right: 6%;
    }

    .card-availability {
        width: 1100px;
        height: 200px;
        background-color: #12223d;
        margin-left: 6%;
        margin-bottom: 15px;


    }

    .list-group {
        width: 1300px;
        height: 200px;
        border-radius: 10px;
        background-color: #e8e8e9;
        margin: 1rem;
        margin-left: 8.5%;
        position: relative;
    }

    .car-title {
        margin-top: 22px;
        font-family: "Lato", sans-serif;
        font-size: 40px;
        text-align: left;
        margin-left: 15%;

    }

    .card-text {

        font-family: 'Raleway', sans-serif;;
        font-size: 16px;
        text-align: left;
        margin-left: 17%;
    }

    .btn-detalle {
        position: absolute;
        margin-left: 900px;
        margin-bottom: 80%;
        margin-top: 80px;

    }

    .image {
        position: absolute;
        margin-left: 600px;
        margin-bottom: 80%;
        margin-top: 20px;
    }
</style>