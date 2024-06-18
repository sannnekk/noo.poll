import type { Media } from './Media'

export interface PollAnswer {
	id: string
	questionId: string
	questionType: string
	// answer types
	text?: string
	number?: number
	date?: Date
	files?: Media[]
	choices?: string[]
	rating?: number
	createdAt?: Date
	updatedAt?: Date
}
