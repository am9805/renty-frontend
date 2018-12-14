<template>
    <div>

        <div class="card">
            <div class="container">
                <div class="panel-defoutl">
                    <p class="h1">Renty</p>
                    <p class="h2">Consigue tu auto al mejor precio. Reserva ya en Renty.com</p>
                    <form name="Form-search">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label class="label" for="typecar">Tipo de vehiculo</label>
                                <select id="typecar" class="form-control" v-model="type">
                                    <option class="select" value="1">ECONÓMICO</option>
                                    <option class="select" value="2">COMPACTO</option>
                                    <option class="select" value="3">SUV</option>
                                    <option class="select" value="4">LUJO</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label class="label" for="pickup-point">Pickup point</label>
                                <select id="pickup-point" class="form-control" v-model="pickup">
                                    <option selected>Medellin</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label class="label" for="date-start">Fecha inicio</label>

                                <input id='date-start' type="date" class="form-control" v-model="from">

                            </div>
                            <div class="form-group col-md-6">
                                <label class="label" for="date-finish">Fecha fin</label>
                                <input id='date-finish' type="date" class="form-control" v-model="to">
                            </div>
                        </div>
                    </form>

                    <button @click="CaptureValues" class="btn btn-primary">Buscar</button>
                </div>
            </div>
        </div>
        <div v-if="listCars.length > 0" class="list">
            <div class="list-group" v-for="carFromList in listCars">

                <h5 class="car-title">{{carFromList.brand}}</h5>
                <p class="card-text">Tipo: {{carFromList.type}}</p>
                <p class="card-text">Modelo: {{carFromList.model}}</p>
                <p class="card-text">Precio: ${{carFromList.price}}</p>
                <div class="image">
                    <td><img :src="carFromList.thumbnail" width="100vw"/></td>
                </div>
                <div class="btn-detalle">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#details" @click="clickForDetail(carFromList)">Detalle</button>
                    <b-btn v-b-modal.modalxl variant="primary" class="btn btn-primary" @click="selectedCar = carFromList">Reservar</b-btn>
                </div>
            </div>
        </div>

        <b-modal ref="myModalRef" id="modalxl" size="xl" title="Confirmacion" hide-footer>
            <div>
                <h3>Informacion de la reserva:</h3>
                <p class="card-text">Marca: {{selectedCar.brand}}</p>
                <p class="card-text">Tipo: {{selectedCar.type}}</p>
                <p class="card-text">Modelo: {{selectedCar.model}}</p>
                <p class="card-text">Precio: ${{selectedCar.price}}</p>
                <p class="card-text">Fecha inicio: {{from}}</p>
                <p class="card-text">Fecha final: {{to}}</p>
                <p class="card-text">Pickup point: {{pickup}}</p>
            </div>
            <b-btn variant="primary" class="btn btn-primary" @click="makeBooking()">Confirmar reserva</b-btn>
            <b-btn class="btn btn-primary" variant="outline-danger" block @click="hideModal">Cancelar</b-btn>
        </b-modal>

        <b-modal ref="modalsmref" id="modalsm" size="sm" title="Resultado" ok-only>
            {{mensaje}}
        </b-modal>

        <div id="details" class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <Details :show="showDetail" :car="specificCar"/>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from "../services/auth";
    import Form from "./Form.vue";
    import Buscar from "./Buscar.vue";
    import Axios from "axios";
    import Details from "./Details.vue";

    export default {
        name: "Home",
        components: {
            Buscar,
            Form,
            Details
        },
        data() {
            return {
                urls: ['https://renty-ruby.herokuapp.com/cars/',
                    'https://renty-web.herokuapp.com/cars/'],
                type: "",
                pickup: "",
                from: "",
                to: "",
                url: "",
                listCars: [],
                listCarsT: [],
                isSearch: false,
                showDetail: false,
                specificCar: {},
                selectedCar: Object,
                mensaje: 'Cargando, por favor espere...'
            };
        },
        created: function () {

        },
        methods: {
            async clickForDetail(car) {
                const apiAnswer = await Axios({
                    method: "get",
                    url: car.url + car.id
                });
                this.specificCar = apiAnswer.data;
                this.showDetail = true;
            },
            hideModal () {
                this.$refs.myModalRef.hide()
            },
            CaptureValues() {
                this.url = `search?from=${this.from}&to=${this.to}&type=${this.type}`;
                this.SearchRenty();
            },
            SearchRenty() {
                this.listCars = [];
                window.scrollTo(0, 500);
                this.urls.forEach(url => {
                    Axios.get(`${url}${this.url}`).then( response => {
                        let list = response.data;
                        list.forEach(item => {
                            item.url = (' ' + url).slice(1);
                            this.listCars.push(item);
                        });
                    }, error => {
                        console.log('Error obteniendo datos de: ' + url + '. ' + error);
                    });
                });
            },
            makeBooking() {
                if (auth.user()) {
                    auth.user().getIdToken().then(token => {
                        const date = new Date().toISOString();
                        const url =  this.selectedCar.url.replace('cars', 'booking');
                        Axios.post(url, {
                            token: token,
                            carId: this.selectedCar.id,
                            bookingDate: date.split('T')[0],
                            pickup: this.pickup,
                            pickupDate: this.from,
                            deliverPlace: this.pickup,
                            deliverDate: this.to,
                        }).then(value => {
                            console.log(value);
                            this.mensaje = 'Reserva realizada correctamente';
                            this.$refs.modalsmref.show();
                        }, error => {
                            this.mensaje = `No fue posible realizar la reserva, intentalo mas tarde, Error realizando peticion a: ${url}, Mensaje error: ${error}` ;
                            this.$refs.modalsmref.show();
                        })
                    });
                } else {
                    this.mensaje = 'Debes iniciar sesión para realizar reservas';
                    this.$refs.modalsmref.show();
                }

            }
        }
    };
</script>

<style scoped>
    .container {
        width: 900px;
        height: 400px;
        text-align: left;
        margin-top: -5px;
        font-family: "Raleway", sans-serif;
        background: #12223d;
        overflow: hidden;
        position: relative;
        color: #fff;
    }

    .h1 {
        font-family: "Lato", sans-serif;
        font-size: 40px;
        color: #fff;
        line-height: 1.2;
        text-align: center;
        padding-bottom: 7px;
        margin-right: 10%;
        opacity: 1;
        margin-top: 25px;
    }

    .h2 {
        font-family: "Montserrat", sans-serif;
        font-size: 15px;
        color: #fff;
        line-height: 1.5;
        text-align: center;
        margin-right: 10%;
        opacity: 1;
    }

    .btn-primary {
        width: 140px;
        background-color: #2dc4bb;
        color: #fff;
        border-color: #2dc4bb;
        margin-left: 70%;
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
        width: 70%;
        height: 350px;
        text-align: left;
        background-color: #12223d;
        opacity: 0.8;
        margin-top: 5px;
        margin-left: 15%;
        font-family: "Raleway", sans-serif;
        background: #12223d;
        overflow: hidden;
        color: #fff;
        border-radius: 10px;
    }

    .btn-buscar {
        margin-right: 6%;
    }

    .card-availability {
        width: 900px;
        height: 200px;
        background-color: #12223d;
        margin-left: 6%;
        margin-bottom: 15px;
    }

    .list-group {
        width: 900px;
        height: 210px;
        border-radius: 10px;
        background-color: #e8e8e9;
        margin-top: 15px;
        margin-left: 3.5%;
        position: relative;
    }

    .car-title {
        margin-top: 22px;
        font-family: "Lato", sans-serif;
        font-size: 40px;
        text-align: left;
        margin-left: 35%;
    }

    .card-text {
        font-family: "Raleway", sans-serif;
        font-size: 16px;
        text-align: left;
        margin-left: 37%;
    }

    .btn-detalle {
        position: absolute;
        margin-left: 70%;
        margin-bottom: 80%;
        margin-top: 80px;
    }

    .image {
        position: absolute;
        margin-top: 10px;
        width: 200px;
        height: 200px;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 10px;
    }

    .image img {
        height: 200px;
        width: 200px;
    }

    .list {
        margin-top: 5rem;
        margin-left: 15%;
    }

    .label {
        color: #fff;
        font-family: "Raleway", sans-serif;
    }

    .form-control {
        height: 33px;
        width: 380px;
    }

    .select {
        font-family: "Raleway", sans-serif;
    }
</style>