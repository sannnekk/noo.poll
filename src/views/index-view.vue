<template>
	<div class="index-view">
		<div
			class="container"
			v-auto-animate
		>
			<div
				class="welcome-block block"
				v-if="rootStore.stage === 'welcome'"
			>
				<welcome-block />
			</div>
			<div
				class="auth-block block"
				v-else-if="rootStore.stage === 'verification'"
			>
				<verification-block
					@authenticated="rootStore.authenticateTelegram($event)"
				/>
			</div>
			<div
				class="poll-block block"
				v-else-if="rootStore.stage === 'poll'"
			>
				<poll-block
					:poll="rootStore.poll"
					v-model:answers="rootStore.answers"
					@submit="rootStore.finishPoll()"
				/>
			</div>
			<div
				class="thanks-block block"
				v-else-if="rootStore.stage === 'thanks'"
			>
				<thanks-block />
			</div>
			<div
				class="loading-block block"
				v-else-if="rootStore.stage === 'loading'"
			>
				<loading-block />
			</div>
			<div
				class="error-block block"
				v-else
			>
				<error-block />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRootStore } from '../store/root'

const rootStore = useRootStore()
</script>

<style scoped lang="sass">
.index-view
	padding-top: 3em

	.block
		margin: 0 auto
		width: 95%
		max-width: 800px
		background-color: var(--white)
		border-radius: var(--border-radius)
		padding: 2em
		margin-bottom: 3em
</style>
