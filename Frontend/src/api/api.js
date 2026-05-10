const BASE_URL = 'http://localhost:8000'

const authHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
})

export const getMe = async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: authHeaders()
    })

    if (res.status === 401) {
        localStorage.removeItem('access_token')
        window.location.href = '/login'
    }

    return await res.json()
}

export const getApplications = async () => {
    const res = await fetch(`${BASE_URL}/applications/`, {
        headers: authHeaders()
    })

    if (res.status === 401) {
        localStorage.removeItem('access_token')
        window.location.href = '/login'
    }

    return await res.json()
}