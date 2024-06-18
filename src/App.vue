<template>
	<div class="app-root">
		<div class="background">
			<particles-background />
		</div>
		<div class="content">
			<router-view />
		</div>
		<the-footer />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
.app-root
	.background
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: -1
		pointer-events: none
		overflow: hidden
</style>
