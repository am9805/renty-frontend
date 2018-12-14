<template>
    <div v-if="show">
        <div>
            <div>
                <img class="imagen" :src="car.thumbnail" :alt="`${car.brand} - ${car.model}`">
            </div>
            <h3>{{car.brand}} - {{car.model}}</h3>
            <p>Tipo: {{car.type}}</p>
            <p>Precio: {{car.price}}</p>
            <article>
                <p>Rentador: {{car.rental.name}}</p>
            </article>
            <p>Capacity: {{car.capacity}}</p>
            <p>Rating: {{car.rating}}/5</p>
            <p>Doors: {{car.doors}}</p>
            <p>Color: {{car.color}}</p>
            <p>Kms: {{car.kms}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Details",
        props: {
            show: Boolean,
            car: Object
        },
        methods: {
            close() {
                this.$emit("close");
            }
        }
    };
</script>

<style scoped>
    .imagen {
        margin-top: 10px;
        width: 100%;
        height: 100%;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 10px;
    }

    .container {
        width: 466px;
        height: 1400px
    }
</style>