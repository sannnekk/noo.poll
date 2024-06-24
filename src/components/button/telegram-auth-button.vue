<template>
	<div class="telegram-auth-button">
		<component
			v-once
			is="script"
			async
			src="https://telegram.org/js/telegram-widget.js?22"
			data-telegram-login="noo_polls_bot"
			:data-size="size"
			data-onauth="onAuthenticated(payload)"
			data-request-access="write"
		/>
	</div>
</template>

<script setup lang="ts">
import { TelegramAuthResponse } from '../../types/TelegramAuthResponse'

interface Props {
	size?: 'small' | 'medium' | 'large'
}

interface Emits {
	(e: 'authenticated', response: TelegramAuthResponse): void
}

withDefaults(defineProps<Props>(), {
	size: 'medium',
})
const emits = defineEmits<Emits>()

// @ts-ignore
window.onAuthenticated = (payload: TelegramAuthResponse) => {
	console.log('Authenticated with Telegram', payload)
	emits('authenticated', payload)
}
</script>

<style scoped></style>
