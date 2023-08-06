<template>
	<div class="token-item">
		<div class="token-item__header">
			<NuxtLink :to="`/explorer/${t.jettonAddress}`">
			
				<div class="token-item__info" >
				<div class="token-item__info-left">
					<img class="token-item__image" :src="`/img/logos/${t.image}`" alt="">
				</div>
				<div class="token-item__info-right">
					<p>@{{t.username}}</p>
					<h2>{{t.name}} ({{t.code}})</h2>
					<span>{{t.balance}} {{t.code}}<br><span>≈ ${{t.balanceUSD}}</span></span>
				</div>
			</div>
			</NuxtLink>

		<div class="token-item__details">
				
				<div>{{t.balance}} {{t.code}}<div>≈ ${{t.balanceUSD}}</div></div>
				
			</div>
		</div>

		
	</div>
</template>
<script>export default{
	props:{
		t:{
			type: Object
		}
	},

	data() {
		return{
			show: false
		}
	},

	computed: {
		
	}
};
</script>
<style lang="scss" scoped>
	.token-item{
	

	&:not(:last-child) {
		border-bottom: solid 1px rgba(255,255,255,.15);
	}
	width: 100%;
	
	&__header{
		display: flex;
		justify-content: space-between;
		align-items: center;
			padding: 15px 35px;
			 @media (max-width: 540px){
			 	padding: 15px 0;
	        	align-items: unset;
	        }	
		h2{
			color: #fff;
			text-transform: capitalize;
			font-size: 18px;

			font-weight: 400;
		  text-overflow: ellipsis;
			white-space: nowrap;
			line-height: 20px;
			overflow: hidden;
		}
		p{

			font-size: 14px;
			font-weight: 400;
			color: #737a83;
			line-height: 20px;
			margin-bottom: 4px;
		  	text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			 @media (max-width: 540px){
				 margin-bottom: 0;
	        }	
		}
	}		
	&__image{

			width: 50px;
			height: 50px;
			object-fit: cover;
			border-radius: 50px;
		

}

	&__info{
		display: flex;

			&-left{
			margin-right: 10px;
			display: flex;
			align-items: center;
		}
			&-right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 260px;
			span{
				display: none;
				 @media (max-width: 540px){
				 margin-top: 4px;
		        	display: block;
		        }
		        &.red{
		        	color: #ef5350;
		    	}

		    	&.green{
		        	color: #66bb6a;
		    	}
			}
			@media (max-width: 540px){
	        	width: 200px;
	        }	

	        @media (max-width: 380px){
	        	width: 160px;
	        }	
			}
		}


	&__details{
	display: flex;
	font-size: 18px;
	div{
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;
	div{
	font-size: 14px;
    font-weight: 400;
		margin-top: 4px;
		color: var(--p);
	}
	}
	@media (max-width: 540px){
    	justify-content: center;
    	margin-top: 20px;
    	div{
    	display: none;
    }
    }

	span{
	margin-left: 20px;
	cursor: pointer;

}
}

	
	
}
</style>