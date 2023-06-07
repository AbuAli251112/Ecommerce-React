import baseUrl from '../Api/baseURL'

const useInUpdateDataWithImage = async (url, params) => {
    const config = {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const res = await baseUrl.put(url, params, config);
    return res;
}

const useInsUpdateData = async (url, params) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const res = await baseUrl.put(url, params, config);
    return res;
}

export { useInUpdateDataWithImage, useInsUpdateData };