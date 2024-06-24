import { config } from '../config'
import type { Poll } from '../types/Poll'
import type { PollAnswer } from '../types/PollAnswer'

export async function getPoll(pollId: string): Promise<Poll> {
	const response = await fetch(`${config.API_URL}/poll/${pollId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error('Произошла ошибка при загрузке опроса')
	}

	const json = await response.json()

	return json.data as Poll
}

export async function submitPoll(
	pollId: string,
	answers: PollAnswer[]
): Promise<void> {
	answers = answers.map(
		(answer) =>
			({
				...answer,
				id: undefined,
			} as unknown as PollAnswer)
	)

	const response = await fetch(`${config.API_URL}/poll/${pollId}/answer`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(answers),
	})

	if (!response.ok) {
		throw new Error('Произошла ошибка при отправке опроса')
	}
}
