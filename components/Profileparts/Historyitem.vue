<template>
	<div class="profile-history-item">
		<div class="profile-history-item__header">
			<NuxtLink :to="`/explorer/${hist.p}`">
				<div class="profile-history-item__info" >
				<div class="profile-history-item__info-left">
					<img class="profile-history-item__image" :src="image" alt="">
				</div>
				<div class="profile-history-item__info-right">
					<p :title="$moment(hist.date).format()" >{{$moment(hist.date).fromNow()}}</p>
					<h2>{{name}}</h2>
					<span :class="hist.value >= 0 ? 'green' : 'red'">{{hist.value/1000000000}} TON</span>
				</div>
			</div>
			</NuxtLink>

			<!-- <p :title="$moment(hist.date).format()" >{{$moment(hist.date).fromNow()}}</p> -->
			<div class="profile-history-item__details">
				
				<div>{{hist.value/1000000000}} TON</div>
				<span  @click="show = !show"><v-icon
					dark
	      :disabled="!hist.message"
	      color="blue darken-2"
	    >
	      mdi-comment-text-outline
	    </v-icon></span>
			</div>
		</div>

		<div class="profile-history-item__content" v-if="show">
			<div class="profile-history-item__content-item">
				<h2>Timestamp</h2>
				<p>{{$moment(hist.date).format('MMMM DD YYYY, HH:mm:ss')}}</p>
			</div>
			<div class="profile-history-item__content-item">
				<h2>Fee</h2>
				<p>{{hist.fee / 1000000000}} TON</p>
			</div>
			<div class="profile-history-item__content-item" style="width: 100%;">
				<h2>Logical time</h2>
				<p>{{hist.transaction_id.lt}} <ModulesCopy :text="hist.transaction_id.lt" /></p>
			</div>
			<div class="profile-history-item__content-item"style="width: 100%;">
				<h2>Hash</h2>
				<p>{{hist.transaction_id.hash}} <ModulesCopy :text="hist.transaction_id.hash" /></p>
			</div>
			<div class="profile-history-item__content-item" style="width: 100%;"v-if="hist.p">
				<h2>Address</h2>
				<p>{{hist.p}} <ModulesCopy :text="hist.p" /></p>
			</div>
			<div class="profile-history-item__content-item" style="width: 100%;"v-if="hist.message">
				<h2>Message</h2>
				<p>{{hist.message}} <ModulesCopy :text="hist.message" /></p>
			</div>

		</div>
	</div>
</template>
<script>export default{
	props:{
		hist:{
			type: Object
		}
	},

	data() {
		return{
			show: false
		}
	},

	computed: {
		name() {
			if(this.hist.info.name) return this.hist.info.name;
			return `*${this.hist.p.substr(-7)}`;
		},

		image() {
			try{
				if (this.hist.info.image) return `/img/logos/${this.hist.info.image}`
				if (this.hist.info.is_user) return '/img/pb1.svg'
				return '/img/pg1.svg'
			} catch(e){
				return '/img/pg1.svg'
			}
		}
	}
};
</script>
<style lang="scss" scoped>
	.profile-history-item{
	

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


&__content{
	padding: 15px 35px;
	@media (max-width: 540px){
          padding: 15px 0;
        }
	display: flex;
	flex-wrap: wrap;
	&-item{
	margin-bottom: 10px;
	width: 50%;
	@media (max-width: 540px){
    	width: 100%;
    }
}
	h2{
		color: #fff;
		text-transform: capitalize;
		font-size: 18px;
		font-weight: 400;
	 	text-overflow: ellipsis;
		white-space: wrap;
		margin-bottom: 5px;
		overflow: hidden;
		line-height: 22px;
	}
	p{
		letter-spacing: .7px;
		font-size: 16px;
		font-weight: 400;
		color: #7f868f;
		line-height: 20px;
		word-break: break-all;

	}
}	
	
}
</style>