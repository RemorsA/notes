<script setup></script>

<template>
	<div class="container">
		<router-view></router-view>
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
        /* max-width: 425px;
        margin: 0 auto; */
        padding: 5px;
    }
</style>