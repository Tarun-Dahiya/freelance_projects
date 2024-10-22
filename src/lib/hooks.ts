import { useCallback, useContext, useEffect, useState } from "react"
import AppContext from "../components/AppContext"
import axios from "axios"

/**
 * Performs a GET request of the provided path.
 * 
 * @param path - The path to the API endpoint.
 * @returns The data from the GET request.
 */
export const useAxiosGet = <T,>(path: string) => {
    const { apiData } = useContext(AppContext)
    const { baseURL, authToken } = apiData
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}${path}`, localStorage.getItem('token') ? {
                headers: {
                    Authorization: `${authToken}`
                }
            } : {})
            console.log(path.split('method=').length > 1 ? path.split('method=')[1] : "GET", response.data)
            setData(response.data)
        } catch (err) {
            console.log(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, loading, error }
}


/**
 * Performs a POST request of the provided path.
 * 
 * @param path - The path to the API endpoint.
 * @param params - The parameters to send in the POST request.
 * @param autoPost - Whether to automatically perform the POST request.
 * @returns The data from the POST request.
 */
export const useAxiosPost = <T,>(path: string, params: object, autoPost: boolean) => {
    const { apiData } = useContext(AppContext)
    const { baseURL, authToken } = apiData
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const fetchData = async () => {
        try {
            const response = await axios.post(`${baseURL}${path}`, localStorage.getItem('token') ? {
                headers: {
                    Authorization: `${authToken}`
                },
                ...params
            } : params)
            console.log(path.split('method=').length > 1 ? path.split('method=')[1] : "POST", response.data)
            setData(response.data)
        } catch (err) {
            console.log(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        autoPost && fetchData()
    }, [])

    const request = useCallback(async() => {
        fetchData()
    }, [params])

    return { request, data, loading, error }
}