import type { Media } from './Media'

export interface PollAnswer {
	id: string
	userAuthType: 'telegram'
	userAuthData: Record<string, unknown>
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
