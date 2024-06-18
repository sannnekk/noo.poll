import { config } from '../config'
import { Media } from '../types/Media'

export async function upload(
	files: File[],
	progress: (progress: number) => void = () => {}
): Promise<{ data: Media[] }> {
	return new Promise<{ data: Media[] }>((resolve, reject) => {
		const formData = new FormData()

		for (const file of files) {
			formData.append('files', file)
		}

		const request = new XMLHttpRequest()

		request.open('POST', `${config.API_URL}/media`, true)

		request.upload.addEventListener('progress', (event) => {
			if (event.lengthComputable) {
				progress.call(undefined, Math.round((event.loaded / event.total) * 100))
			}
		})

		request.addEventListener('error', () => {
			reject({
				status: 400,
				message: 'Неизвестная ошибка',
			})
		})

		request.addEventListener('abort', () => {
			reject({ status: 0, message: 'Загрузка отменена' })
		})

		request.addEventListener('load', () => {
			if (request.status < 400) {
				try {
					resolve(JSON.parse(request.responseText))
				} catch (error) {
					reject({
						status: request.status,
						message: 'Неизвестная ошибка',
					})
				}
			} else {
				try {
					reject({
						status: request.status,
						message:
							JSON.parse(request.responseText)?.error || 'Неизвестная ошибка',
					})
				} catch (error) {
					reject({
						status: request.status,
						message: 'Неизвестная ошибка',
					})
				}
			}
		})

		request.send(formData)
	})
}
