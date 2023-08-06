<template>
	<div class="header-site__wrapper">
		<header class="header-site container-f">
		<div class="header-site__left">
			<div class="header-site__logo">
				<img src="/img/logo.svg" alt="">
			</div>
			<nav class="header-site__nav">
				<ul>
					<li><a href="#" class="inactive">Main</a></li>
					<li><NuxtLink to="/explorer">Explorer</NuxtLink
    ></li>
					<li><a href="#" class="inactive">NFT</a></li>
					<li class="mb"><a href="#" class="inactive">Shop</a></li>


				</ul>
				
			</nav>
		</div>
		<div>
		
		</div>
	</header>
	</div>
</template>
<script></script>
<style lang="scss" scoped>

.mb{
	@media(max-width: 540px){
	display: none;
}
}
	.header-site{

	&__wrapper{
			top: 0;
			position: fixed;
			width: 100%;
			background: rgba(34,34,34,.5);
	       	backdrop-filter: blur(50px);
		    -webkit-backdrop-filter: blur(50px);
		    z-index: 100;
		}
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: space-between;
	
		&__left{
			display: flex;
		}

		&__logo{
			display: flex;
			align-items: center;
			height: 100%;
			margin-right: 40px;
			img{
				 height: 25px;
				}
			}
			&__nav{
			display: flex;
			height: 100%;
			align-items: center;
				ul{
					li{
						list-style: none;
						float: left;
						a {
							font-size: 16px;
							margin-right: 20px;
							text-decoration: none;
							&.inactive{
								opacity: .5;

								cursor: unset;
						}
						}
					}
			}
	}
}
</style>