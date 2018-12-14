<template>
<div>
  <div>
    <button href="/list" @click="Search" class="btn btn-primary">Buscar</button>  
  </div>
</div>
</template>

<script>
export default {
  name: "Buscar",
  components: {},
  props: ["SearchRenty"],
  methods: {
    Search(e) {
      e.preventDefault();
      this.SearchRenty();
    }
  }
};
</script>

<style scoped>
.btn-primary {
  background-color: #2dc4bb;
  color: #fff;
  border-color: #2dc4bb;
  margin-left: 87%;
  margin-top: 5px;
  margin-bottom: 5px;

  text-align: center;
}
</style>