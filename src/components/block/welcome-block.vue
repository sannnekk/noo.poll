<template>
	<div class="welcome-block">
		<div class="welcome-block__logo">
			<img
				src="../../assets/logo-circled.svg"
				alt="Logo"
			/>
		</div>
		<div class="welcome-block__header">
			<h1><b>НОО.</b>Опрос</h1>
		</div>
		<div class="welcome-block__description">
			<p>
				Если у Вас есть аккаунт на <b>НОО.</b>Платформе, то перейдите на нее и
				пройдите опрос там.
			</p>
		</div>
		<div class="welcome-block__actions">
			<common-button
				design="inline"
				alignment="center"
				to="http://noo-school.ru"
			>
				Перейти на платформу
			</common-button>
			<common-button
				@click="rootStore.startPoll()"
				design="primary"
				alignment="center"
			>
				Начать опрос
			</common-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRootStore } from '../../store/root'

const rootStore = useRootStore()
</script>

<style scoped lang="sass">
.welcome-block
	display: flex
	flex-direction: column
	align-items: center
	text-align: center

	&__logo
		margin-bottom: 1em

		img
			width: 60%
			max-width: 450px

	&__header
		margin-bottom: 1em

		h1
			font-size: 3rem
			font-weight: normal

	&__description
		margin-bottom: 1em
		width: 80%

	&__actions
		width: 100%
		display: flex
		align-items: center
		justify-content: center
		gap: 1em
</style>
