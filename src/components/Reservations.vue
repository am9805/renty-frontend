<template>
<div>
    <div v-for="listCar in listCars" :key=listCar.id> 

        <h5 class="car-title">{{listCar.cardId.brand}}</h5>
        <p class="card-text">Tipo: {{listCar.cardId.type}}</p>
        <p class="card-text">Modelo: {{listCar.cardId.model}}</p>
        <p class="card-text">Precio: ${{listCar.cardId.price}}</p> 
        <div class="image">
        <td><img :src="listCars.thumbnail" /></td>
        </div>
   </div>
</div>
</template>

<script>
import Axios from "axios";

    export default {
        name: "Reservations",
        props: {
            author: String
        },
         mounted() {
            this.getReservations();
        },
        data() {
            return {
                listCars: []
            };
        },
         methods: {
            getReservations() {
                Axios.get("https://api.myjson.com/bins/p1up6").then(
                response => {
                    this.listCars = response.data;
                    console.log(this.listCars);
                    
                }
        // error => {
        //   // console.log(error);
        // }
                );
            }
        }
    };
</script>

<style>


</style>
