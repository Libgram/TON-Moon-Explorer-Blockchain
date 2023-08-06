<template>
  <div class="main-page">

 dev
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  created() {
  	this.$router.push({ path: `/explorer/` })
  }
};
</script>