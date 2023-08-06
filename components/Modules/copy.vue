<template>
	<img class="copy" src="/img/copy.svg" @click.stop="clickCopy" alt="">
</template>
<script>
	export default{
		props: {
			text: String,
			default: '',
		},
		methods: {
			clickCopy() {

				navigator.clipboard.writeText(this.text);
	
			}
		}
	};
</script>