const token = localStorage.getItem("@kenzieSocial:token")

export const instance = axios.create({
    baseURL: "http://m2-rede-social.herokuapp.com/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
    },
})