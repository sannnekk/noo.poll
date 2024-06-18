<template>
	<div class="error-block">
		<div class="error-block__img">
			<img
				src="/error.svg"
				alt="Error"
			/>
		</div>
		<div class="error-block__text">
			<h3>Произошла ошибка при получении данных.</h3>
			<p>
				Возможно, этот опрос не существует, у Вас нет доступа к нему или это
				внутренний опрос для зарегистрированных на платформе пользователей.
			</p>
		</div>
	</div>
</template>

<style scoped lang="sass">
.error-block
	display: flex
	flex-direction: column
	align-items: center
	text-align: center

	&__img
		margin-bottom: 1em
		width: 100%

		img
			width: 100%
			max-width: 450px

	&__text
		margin-bottom: 1em
</style>
