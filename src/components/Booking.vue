<template>
    <span>
        <b-modal id="modalsm" size="sm" title="Resultado" ok-only>
            {{mensaje}}
        </b-modal>
        <span v-if="this.listBooking.length === 0">
            No tienes reservas activas.
        </span>
        <div class="list-group" v-for="booking in listBooking" :key=booking.id>
            <h5 class="car-title">{{booking.pickupDate}}</h5>
            <p class="card-text">Lugar de recogida: {{booking.pickup}}</p>
            <p class="card-text">Fecha de entrega: {{booking.deliverDate}}</p>
            <p class="card-text">Información del vehiculo:</p>
            <p class="card-text subitem">Marca: {{booking.cardId.brand}}</p>
            <p class="card-text subitem">Tipo: {{booking.cardId.type}}</p>
            <p class="card-text subitem">Modelo: {{booking.cardId.model}}</p>
            <p class="card-text subitem">Precio: ${{booking.cardId.price}}</p>
            <b-btn v-b-modal.modalsm variant="primary" class="btn btn-primary" @click="deleteBooking(booking)">Cancelar reserva</b-btn>

            <div class="image">
                <img :src="booking.cardId.thumbnain" alt=""/>
            </div>
        </div>
    </span>
</template>

<script>
    import auth from "../services/auth";
    import Axios from "axios";
    import VueMaterial from 'vue-material'
    import {MdDialog} from 'vue-material/dist/components'
    import 'vue-material/dist/vue-material.min.css'


    export default {
        name: "Booking",
        data() {
            return {
                listBooking: [],
                urls: ['https://renty-ruby.herokuapp.com/booking/',
                    'http://renty-web.herokuapp.com/booking/'],
                mensaje: 'Cargando, por favor espere...'
            };
        },
        created: function () {
            auth.user().getIdToken().then(value => {
                this.urls.forEach(url => {
                    Axios.get(url + value).then(response => {
                        let list = response.data;
                        list.forEach(item => {
                            item.url = (' ' + url).slice(1);
                            this.listBooking.push(item);
                        });
                    }, error => {
                        console.log('Error obteniendo datos de: ' + url + '. ' + error);
                    });
                });
            });
        },
        methods: {
            deleteBooking(booking) {
                auth.user().getIdToken().then(token => {
                    Axios.put(booking.url, {
                        token: token,
                        bookingId: booking.bookingId
                    }).then(responce => {
                        this.listBooking = this.listBooking.filter(item => {
                            return item.bookingId !== booking.bookingId && item.rental.id !== booking.rental.id;
                        });
                        this.mensaje = 'Reserva cancelada correctamente';
                    }, error => {
                        this.mensaje = `La reserva no pudo ser cancelada, intentalo de nuevo mas tarde, Error realizando peticion a: ${url}, Mensaje error: ${error}` ;
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .list-group {
        width: 80%;
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
        margin-left: 5%;
    }

    .image {
        position: absolute;
        right: 0;
        width: 30%;
        height: 80%;
        margin: 10%;
    }

    .subitem {
        margin-left: 7%;
    }

    .btn-primary {
        width: 20%;
        background-color: #dc3545;
        color: #fff;
        border-color: #dc3545;
        margin: 2% 40%;
    }
</style>