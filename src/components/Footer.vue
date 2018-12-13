<template>
    <div >
        Hecho por:
    </div>
</template>

<script>
    export default {
        name: "Footer",
        props: {
            author: String
        }
    };
</script>

<style>

.card-footer{
       
        position: absolute;        
        bottom: 0;        
        width: 100%;
        height: 90px; /* Height of the footer */
        margin-bottom: 0px;
        background-color: rgb(201, 209, 211);
}

</style>
