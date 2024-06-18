<template>
	<div class="poll-block">
		<div class="poll-block__header">
			<h2>
				{{ poll.title }}
			</h2>
		</div>
		<div class="poll-block__body">
			<div
				class="poll-block__body__question"
				v-for="(question, index) in poll.questions"
				:key="question.id"
			>
				<poll-question
					:question="question"
					:index="index"
					v-model:answer="model[index]"
				/>
			</div>
		</div>
		<div class="poll-block__error">
			<error-container v-if="error">
				{{ error }}
			</error-container>
		</div>
		<div class="poll-block__actions">
			<common-button
				@click="onSubmit()"
				design="primary"
				alignment="center"
			>
				Отправить
			</common-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Poll } from '../../types/Poll'
import type { PollAnswer } from '../../types/PollAnswer'
import type { PollQuestion } from '../../types/PollQuestion'
import { Media } from '../../types/Media'

interface Props {
	poll: Poll
	answers: PollAnswer[]
}

interface Emits {
	(event: 'update:answers', value: PollAnswer[]): void
	(event: 'submit'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const model = computed({
	get: () => props.answers,
	set: (value) => emits('update:answers', value),
})

const error = ref('')

function onSubmit() {
	const validationError = validateAnswers(props.poll.questions, model.value)

	if (validationError) {
		error.value = validationError
		return
	}

	emits('submit')
}

function validateAnswers(
	questions: PollQuestion[],
	answers: PollAnswer[]
): string {
	for (const question of questions) {
		const answer = answers.find((a) => a.questionId === question.id)

		if (question.required && !answer) {
			return `Ответ на вопрос "${question.text}" обязателен`
		}

		if (!isAnswerValid(question, answer!)) {
			return `Ответ на вопрос "${question.text}" обязателен`
		}
	}

	return ''
}

function isAnswerValid(question: PollQuestion, answer: PollAnswer) {
	switch (question.type) {
		case 'text':
			return checkTextQuestionType(question, answer.text)
		case 'choice':
			return checkChoiceQuestionType(question, answer.choices)
		case 'rating':
			return checkRatingQuestionType(question, answer.rating)
		case 'number':
			return checkNumberQuestionType(question, answer.number)
		case 'date':
			return checkDateQuestionType(question, answer.date)
		case 'file':
			return checkFileQuestionType(question, answer.files)
		default:
			return false
	}
}

function checkTextQuestionType(
	question: PollQuestion,
	answer: string | undefined
) {
	if (!question.required && !answer?.length) {
		return true
	}

	if (question.maxLength && question.maxLength < answer!.length) {
		return false
	}

	if (question.minLength && question.minLength > answer!.length) {
		return false
	}

	return true
}

function checkNumberQuestionType(
	question: PollQuestion,
	answer: number | undefined
) {
	if (!question.required && answer === undefined) {
		return true
	}

	if (answer === undefined) {
		return false
	}

	if (question.maxValue && question.maxValue < answer) {
		return false
	}

	if (question.minValue && question.minValue > answer) {
		return false
	}

	if (question.onlyIntegerValue && !Number.isInteger(answer)) {
		return false
	}

	return true
}

function checkChoiceQuestionType(
	question: PollQuestion,
	answer: string[] | undefined
) {
	if (!question.required && !answer?.length) {
		return true
	}

	if (answer === undefined) {
		return false
	}

	if (question.minChoices && question.minChoices > answer.length) {
		return false
	}

	if (question.maxChoices && question.maxChoices < answer.length) {
		return false
	}

	return true
}

function checkRatingQuestionType(
	question: PollQuestion,
	answer: number | undefined
) {
	if (!question.required && answer === undefined) {
		return true
	}

	if (answer === undefined) {
		return false
	}

	if (question.maxRating && question.maxRating < answer) {
		return false
	}

	if (question.minRating && question.minRating > answer) {
		return false
	}

	if (question.onlyIntegerRating && !Number.isInteger(answer)) {
		return false
	}

	return true
}

function checkDateQuestionType(
	question: PollQuestion,
	answer: Date | undefined
) {
	if (!question.required && !answer) {
		return true
	}

	if (!answer) {
		return false
	}

	if (question.onlyFutureDate && answer < new Date()) {
		return false
	}

	if (question.onlyPastDate && answer > new Date()) {
		return false
	}

	return true
}

function checkFileQuestionType(
	question: PollQuestion,
	answer: Media[] | undefined
) {
	if (!question.required && !answer?.length) {
		return true
	}

	if (!answer?.length) {
		return false
	}

	// file size is checked on the server

	if (question.maxFileCount && question.maxFileCount < answer.length) {
		return false
	}

	for (const file of answer) {
		if (
			question.allowedFileTypes &&
			!question.allowedFileTypes.includes(file.mimeType)
		) {
			return false
		}
	}

	return true
}
</script>

<style scoped lang="sass">
.poll-block
	&__header
		text-align: center

	&__error
		margin-top: 1em
		margin-bottom: 2em
</style>
