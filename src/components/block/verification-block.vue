<template>
	<div class="verification-block">
		<div class="verification-block__header">
			<h2>Верификация</h2>
		</div>
		<div class="verification-block__body">
			<p class="verification-block__body__description">
				Для продолжения работы с сервисом необходимо пройти верификацию.
				<br />
				Для этого вам потребуется аккаунт в Telegram.
			</p>
			<div class="verification-block__body__telegram-auth-button">
				<telegram-auth-button @authenticated="$emit('authenticated', $event)" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TelegramAuthResponse } from '../../types/TelegramAuthResponse'

interface Emits {
	(e: 'authenticated', response: TelegramAuthResponse): void
}

defineEmits<Emits>()
</script>

<style scoped lang="sass">
.verification-block
	text-align: center

	&__header
		margin-bottom: 2em

	&__body
		&__description
			margin-bottom: 1em

		&__telegram-auth-button
			display: flex
			justify-content: center
			margin-top: 1em
</style>
