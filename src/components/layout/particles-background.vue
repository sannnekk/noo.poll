<template>
	<vue-particles
		id="tsparticles"
		:options="options"
	/>
</template>

<script setup lang="ts">
const options = {
	particles: {
		number: {
			value: 6,
			density: {
				enable: true,
				value_area: 800,
			},
		},
		color: {
			value: '#ffffff',
		},
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#939393',
			},
			polygon: {
				nb_sides: 10,
			},
		},
		opacity: {
			value: 0.3,
			random: true,
		},
		size: {
			value: 160,
			random: false,
		},
		move: {
			enable: true,
			speed: 1,
			direction: 'none',
			random: false,
			straight: false,
			out_mode: 'out',
			bounce: true,
		},
	},
	retina_detect: true,
}
</script>
