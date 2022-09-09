import { instance } from "./axios.js";
import { Toast } from "./toastify.js";

export class Requests {

    static async getAllCompanies () {
        const companies = await instance
        .get("companies")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return companies
    }

    static async login (data) {
        const login = await instance
        .post("auth/login", data)
        .then((res) => {
            console.log(res)
            localStorage.setItem("@kenzieEmpresa:user_Id", res.data.token)
            localStorage.setItem("@kenzieEmpresa:token", res.data.uuid)
            Toast.create("Login realizado com sucesso", "#4263EB")

            setTimeout(() => {
                window.location.replace("src/pages/dashboard.html")
            })
        })
        .catch((err) => {
            Toast.create("Não foi possível fazer o login, verifique as informações de usuário!", "red")
        })

        return login
    }
}