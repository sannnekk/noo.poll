import type { PollQuestion } from './PollQuestion'

export interface Poll {
	title: string
	description: string
	stopAt: Date
	isStopped: boolean
	createdAt: Date
	updatedAt: Date
	questions: PollQuestion[]
}
