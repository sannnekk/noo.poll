import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { PollAnswer } from '../types/PollAnswer'
import { Poll } from '../types/Poll'
import { useRoute } from 'vue-router'
import { PollQuestion } from '../types/PollQuestion'
import * as api from '../api/polls'
import { v4 as uuid } from 'uuid'
import { TelegramAuthResponse } from '../types/TelegramAuthResponse'

export type Stage =
	| 'welcome'
	| 'verification'
	| 'poll'
	| 'error'
	| 'loading'
	| 'thanks'

export const useRootStore = defineStore('root', () => {
	const route = useRoute()

	const currentAuthenticator = reactive<{
		type: PollAnswer['userAuthType']
		payload: PollAnswer['userAuthData'] | null
	}>({
		type: 'telegram',
		payload: null,
	})

	const answers = ref<PollAnswer[]>([])

	const poll = ref<Poll | null>(null)

	const stageMachine = {
		stages: ['welcome', 'verification', 'poll', 'thanks'] as Stage[],
		next() {
			stageIndex.value += 1
			stage.value = this.stages[stageIndex.value] as Stage
		},
		error() {
			stage.value = 'error'
		},
		reset() {
			stage.value = 'welcome'
		},
		loading() {
			stage.value = 'loading'
		},
	} as const

	const stageIndex = ref(0)
	const stage = ref<Stage>(stageMachine.stages[stageIndex.value])

	function startVerification() {
		stageMachine.next()
	}

	async function startPoll() {
		stageMachine.loading()

		try {
			if (!route.params.pollId) {
				throw new Error('Не удалось загрузить опрос')
			}

			poll.value = await api.getPoll(route.params.pollId as string)
			answers.value = poll.value.questions.map((question) => answer(question))
			stageMachine.next()
		} catch (error) {
			console.error(error)
			stageMachine.error()
		}
	}

	async function finishPoll() {
		stageMachine.loading()

		try {
			if (!poll.value) {
				throw new Error('Не удалось отправить опрос')
			}

			await api.submitPoll(route.params.pollId as string, answers.value)
			stageMachine.next()
		} catch (error) {
			console.error(error)
			stageMachine.error()
		}
	}

	function answer(question: PollQuestion): PollAnswer {
		return {
			id: uuid(),
			userAuthType: currentAuthenticator.type,
			userAuthData: currentAuthenticator.payload!,
			questionId: question.id,
			questionType: question.type,
			date: new Date(),
			text: '',
			choices: [],
			rating: 0,
			files: [],
			number: 0,
		}
	}

	async function authenticateTelegram(telegramResponse: TelegramAuthResponse) {
		currentAuthenticator.payload = telegramResponse
		await startPoll()
	}

	return {
		poll,
		stage,
		answers,
		currentAuthenticator,
		startVerification,
		startPoll,
		finishPoll,
		authenticateTelegram,
	}
})
