export interface TelegramAuthResponse extends Record<string, unknown> {
	id: number
	first_name: string
	last_name: string
	username: string
	photo_url: string
	hash: string
}
