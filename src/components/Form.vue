<template>
        <form name="Form-search">
            <div class="form-row">
                <div class="form-group col-md-6">
                   <label class="label" for="typecar">Tipo de vehiculo</label>
                        <select  id="typecar" class="form-control">
                        <option class="select" selected>Choose...</option>
                        <option>...</option>
                       </select>
                </div>
                    <div class="form-group col-md-6">
                         <label class="label" for="pickup-point">Pickup point</label>
                        <select id="pickup-point" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                       </select>
                    </div>
                    <div class="form-group col-md-6">
                         <label class="label" for="date-start">Fecha inicio</label>
                            
                                <input id='date-start' type="date" class="form-control">
                            
                    </div>
                    <div class="form-group col-md-6">
                        <label class="label" for="date-finish">Fecha fin</label>                            
                        <input id='date-finish' type="date" class="form-control">                            
                    </div>
            </div>
        </form>    

</template>

<script>
export default {
  name: "Form",
  components: {},
  methods: {}
};
</script>

<style scoped>
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
