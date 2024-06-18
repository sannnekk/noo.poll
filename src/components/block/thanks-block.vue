<template>
	<div class="thanks-block">
		<div class="thanks-block__icon">
			<img
				src="/done.png"
				alt="Thanks"
			/>
		</div>
		<div class="thanks-block__text">
			<h2>Спасибо за участие в опросе!</h2>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
.thanks-block
	display: flex
	flex-direction: column
	align-items: center
	text-align: center

	&__icon
		margin-bottom: 1em
		width: 100%
		max-width: 150px

		img
			width: 100%

	&__text
		margin-bottom: 1em
</style>
