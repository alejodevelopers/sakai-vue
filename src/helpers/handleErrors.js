export function useHandleAxiosError(err) {
	if (err.response) {
		alert(`${err.message} -- ${err.response.data?.message} `)
	} else if (err.request) {
		alert(`${err.message} - Status ${err.request.status}`)
	} else {
		alert(`Unexpected Error -- ${err.message}`)
	}
}