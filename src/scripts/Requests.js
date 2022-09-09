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
            localStorage.setItem("@kenzieEmpresa:user_Id", res.data.uuid)
            localStorage.setItem("@kenzieEmpresa:token", res.data.token)

            Toast.create("Login realizado com sucesso", "#4263EB")

            setTimeout(() => {
                window.location.replace("src/pages/dashboard.html")
            }, 900)
        })
        .catch((err) => {
            Toast.create("Não foi possível fazer o login, verifique as informações de usuário!", "red")
        })

        return login
    }

    static async signup(data) {
        const signup = await instance
        .post("auth/register/user", data)
        .then(async (res) => {
            console.log(res)
            Toast.create("Cadastro realizado com sucesso", "#4263EB")

            const newData = {
                email: res.data.email,
                password: data.password
            }

            setTimeout( async () => {
                
                const userSignup = await Requests.login(newData)
            }, 2000)

        })
        .catch((err) => {
            Toast.create("Não foi possível realizar o cadastro!", "red")
        })

        return signup
    }

    static async companyUser (token) {
        const userInfo = await instance
        .get("users/profile")
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

        return userInfo
    }

    static async employessSameDepartment() {
        const employees = await instance
        .get("departments/coworkers")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return employees
    }

    static async userDepartment() {
        const department = await instance
        .get("departments")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return department
    }
}