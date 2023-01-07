<script setup>
	import car from '@/carJournal/Car.vue'
</script>

<template>
	<div class="container">
		<car></car>
	</div>
</template>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Mulish&display=swap');

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		font-family: 'Mulish', sans-serif;
	}

	.container {
        padding: 5px;
    }

	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		background-color: none;
		padding: 5px;
	}
	::-webkit-scrollbar-thumb {
		background-color: rgb(42, 42, 42);
		border: 7px solid #121212;
		border-radius: 10px;
	}
</style>