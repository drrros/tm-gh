import axios from "axios";

const axiosTm = axios.create({
    baseURL: 'https://tm.drros.ru/api/',
})

axiosTm.interceptors.request.use(
    async config => {
        const access_token = localStorage.getItem('access_token')
        config.headers = {
            'Authorization': `JWT ${access_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

axiosTm.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const response = await refreshToken(localStorage.getItem('refresh_token'));
        localStorage.setItem('access_token', response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)
        axios.defaults.headers.common['Authorization'] = 'JWT ' + response.data.access;
        return axiosTm(originalRequest);
    }
    return Promise.reject(error);
});

export const refreshToken = async (refreshToken) => {
    return await axiosTm.post('token/refresh/',
        {
            refresh: refreshToken
        })
}

export const getToken = async (login, password) => {
    return await axios.post('https://tm.drros.ru/api/token/obtain/',
        {
            username: login, password
        })
}

export const getTasks = async () => {
    return await axiosTm({
        url: 'tasks/',
        method: 'GET',
    })
}

export const createTask = async (head, body, select, dateTime) => {
        return await axiosTm.post('tasks/', {
            task_header: head,
            task_content: body,
            task_type: select,
            task_date: dateTime
        })
}

export const editTask = async (head, body, select, dateTime, id) => {
        return await axiosTm.patch(`tasks/${id}/`, {
            task_header: head,
            task_content: body,
            task_type: select,
            task_date: dateTime
        })
}

export const deleteTask = async (id) => {
    return await axiosTm.delete(`tasks/${id}/`)
}

export const register = async (login, email, password) => {
    return await axios.post('https://tm.drros.ru/api/register/',
        {
            username: login,
            email,
            password
        },
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        })
}
