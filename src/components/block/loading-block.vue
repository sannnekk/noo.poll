<template>
	<div class="loading-block">
		<div class="loading-block__img">
			<loader-icon contrast />
		</div>
		<div class="loading-block__text">
			<h3>Загрузка...</h3>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
.loading-block
	display: flex
	flex-direction: column
	align-items: center
	text-align: center

	&__img
		margin-bottom: 10px
		margin-top: 60px
		font-size: 100px

	&__text
		margin-bottom: 1em
</style>
