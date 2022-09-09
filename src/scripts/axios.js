const token = localStorage.getItem("@kenzieSocial:token")

export const instance = axios.create({
    baseURL: "http://localhost:6278/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
    },
})