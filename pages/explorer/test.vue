<template>
 
  <div class="charts-page">

  	<PartsHeader/>
  	<div class="charts-page__block container-f">

		<h2>Market Cap TON NFT</h2>
		<ChartPie style="charts-page__block-chart" v-if="capNFTs.length > 0" :data="{labels, datasets}" :options="options" :height="200" />

  	</div>
  </div>


</template>


<script>
import axios from "axios";
export default {
async created() {
	try{

	let capNFTs = await axios.get('http://localhost:3002/v1/chart/capNFTs');
	if (capNFTs.data.status === true) {
		this.capNFTs = capNFTs.data.data || [];
	}
	} catch(e) {
		console.log(e)
	}
},
  data() {
    return {

  	capNFTs: [],
      
		
  
    };
  },

  computed: {
  	  	labels() { return this.capNFTs.map( item => item.name)},
        
    	datasets() {
    		return [{
        
			      data: this.capNFTs.map( item => parseInt(item.balance)),
			      backgroundColor: [
				    "#25CCF7","#FD7272","#54a0ff","#00d2d3",
				    "#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e",
				    "#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50",
				    "#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6",
				    "#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d",
				    "#55efc4","#81ecec","#74b9ff","#a29bfe","#dfe6e9",
				    "#00b894","#00cec9","#0984e3","#6c5ce7","#ffeaa7",
				    "#fab1a0","#ff7675","#fd79a8","#fdcb6e","#e17055",
				    "#d63031","#feca57","#5f27cd","#54a0ff","#01a3a4"
				],
			       borderWidth: 0,
          },
        ]
    	
      },
      options() {
      	return {
		    responsive: true,
		    plugins: {
		      legend: {
		        position: 'top',
		      },
		      title: {
		        display: true,
		        text: 'Chart.js Pie Chart'
		      }
		    }
		  }
      }
  }
};
</script>

<style lang="scss" scoped>

	.charts-page{
	margin-top: 100px;
	width: 100%;
	position: relative;
		&__block{
		h2{
		margin-bottom: 50px;
	}
		&-chart{
		width: 300px;
	}

		}
			
	}
</style>