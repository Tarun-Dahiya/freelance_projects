import { useCallback, useEffect, useState } from "react"
import axios from "axios"

let authToken = ''
if (localStorage.getItem('token')) {
    authToken = localStorage.getItem('token')!
}
const baseURL = document.URL.split('/').slice(0, 3).join('/')

/**
 * Performs a request to the provided path with optional parameters.
 * 
 * @param path - The path to the API endpoint.
 * @param autoRequest - Whether to automatically perform the axios request.
 * @param params - The (optional) parameters to send in the axios request.
 * @returns The data from the POST request.
 */
export const useAxios = <T,>(path: string, autoRequest: boolean, params?: object) => {
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const fetchData = async () => {
        try {
            const response = await axios.post(`${baseURL}${path}`, {
                headers: {
                    Authorization: `${authToken}`
                },
                ...params
            })
            console.log(path.split('method=').length > 1 ? path.split('method=')[1] : "GET", response.data)
            if (response.data.includes('Invalid CSRF Token')) {
                // Redirect to login page if CSRF token is invalid
                window.location.href = `${baseURL}/Webservices/auth/login`
                return
            }
            setData(response.data)
        } catch (err) {
            console.log(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        autoRequest && fetchData()
    }, [])

    const request = useCallback(async () => {
        fetchData()
    }, [params])

    return { request, data, loading, error }
}