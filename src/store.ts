import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface RawDataProps<p=object> {
    code: number,
    msg: string,
    data: p
}

export interface UserProps {
    isLogin: boolean,
    nickName?: string,
    _id?: string,
    column?: string,
    token: string,
    email?: string
}

interface ErrorProps {
    isError: boolean,
    msg?: string
}

export interface ImageProps {
    _id?: string,
    url?: string,
    createdAt?: string
}

export interface ColumnProps {
    _id: string,
    avatar?: ImageProps,
    title: string,
    description: string,
}

export interface PostProps {
    _id?: string;
    title: string;
    excerpt?: string;
    content: string;
    image?: ImageProps | string;
    createdAt?: string;
    column: string;
    author?: string;
}

export interface GlobalDataProps {
    user: UserProps,
    columns: ColumnProps[],
    posts: PostProps[],
    isLoading: boolean,
    error: ErrorProps
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
    const { data } = await axios.get(url)
    commit(mutationName, data)
    return data
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: object | string) => {
    const { data } = await axios.post(url, payload)
    commit(mutationName, data)
    return data
}

const store = createStore<GlobalDataProps>({
    state: {
        user: { isLogin: false, token: localStorage.getItem('token') || '' },
        columns: [],
        posts: [],
        isLoading: false,
        error: {
            isError: false
        }
    },
    mutations: {
        createPost (state, newPost: PostProps) {
            state.posts.push(newPost)
        },
        fetchColumns (state, rawData) {
            state.columns = rawData.data.list
        },
        fetchColumn (state, rawData) {
            console.log(rawData)
            state.columns = [rawData.data]
        },
        fetchPosts (state, rawData) {
            console.log(rawData)
            state.posts = rawData.data.list
        },
        setLoading (state, status) {
            state.isLoading = status
        },
        setError (state, e: ErrorProps) {
            state.error = e
        },
        login (state, rawData) {
            const { token } = rawData.data
            localStorage.setItem('token', token)
            state.user.token = rawData.data
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
        },
        fetchCurrentUser (state, rawData) {
            state.user = { isLogin: true, ...rawData.data }
        },
        logout (state) {
            state.user.token = ''
            localStorage.removeItem('token')
            delete axios.defaults.headers.common.Authorization
        }
    },
    actions: {
        fetchColumns ({ commit }) {
            getAndCommit('/columns', 'fetchColumns', commit)
        },
        fetchColumn ({ commit }, cid) {
            getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
        },
        fetchPosts ({ commit }, cid) {
            getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
        },
        login ({ commit }, payload) {
            return postAndCommit('user/login', 'login', commit, payload)
        },
        fetchCurrentUser ({ commit }) {
            return getAndCommit('user/current', 'fetchCurrentUser', commit)
        },
        loginAndFetchCurrentUser ({ dispatch }, loginData) {
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser')
            })
        },
        createPost ({ commit }, postData) {
            return postAndCommit('/posts', 'createPost', commit, postData)
        }
    },
    getters: {
        getColumnById: (state) => (id: string) => {
            return state.columns.find(column => column._id === id)
        },
        getPostByCid: (state) => (cid: string) => {
            return state.posts.filter(post => post.column === cid)
        }
    }
})

export default store
