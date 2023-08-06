<template>
  <div class="explorer-page">

  	<PartsHeader/>
  	<div class="explorer-page__form container-f">
  		<FormpartsForm/>
  		<div class="explorer-page__form-alert"><FormpartsAlert/></div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'explorerPage'
};
</script>
<style lang="scss" scoped>

	.explorer-page{
	position: relative;
	height: 100vh;
		&__form{
		width: 600px;
			height: calc(100vh);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			@media(max-width: 768px){
				width: 100%;
			}

		&-alert{
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
		}
			
	}
</style>