import { instance } from "./axios.js";
import { Toast } from "./toastify.js";

export class Requests {

    static async getAllSectores () {
        const sectores = await instance
        .get("sectors")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return sectores
    }

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
            localStorage.setItem("@kenzieEmpresa:user_Id", res.data.uuid)
            localStorage.setItem("@kenzieEmpresa:token", res.data.token)

            Toast.create("Login realizado com sucesso", "#4263EB")

            setTimeout(() => {
                if(res.data.is_admin) {
                    window.location.replace("src/pages/dashboardAdmin.html")
                } else {
                    window.location.replace("src/pages/dashboard.html")
                }
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

    static async companyUser () {
        const userInfo = await instance
        .get("users/profile")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return userInfo
    }

    static async employessSameDepartment() {
        const employees = await instance
        .get("users/departments/coworkers")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return employees
    }

    static async userDepartment() {
        const department = await instance
        .get("users/departments")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return department
    }
    
    static async getUserLogged() {
        const user = await instance
        .get("users/profile")
        .then((res) => res.data)
        .catch((err) => (console.log(err)))

        return user
    }

    static async editUserLoggedInfo(data) {
        const edit = await instance
        .patch("users", data)
        .then((res) => {
            Toast.create("Usuário editado!", "4263EB")

            setTimeout( async () => {  
                window.location.replace("../pages/dashboard.html")
            }, 900)

            return res.data
        })
        .catch((err) => {
            Toast.create("Usuário não foi editado!", "red")
        })

        return edit
    }

    static async registerCompany(data) {
        const registerComp = await instance
        .post("companies", data)
        .then((res) =>  {
            Toast.create("Empresa cadastrada com sucesso!", "#4263EB")

            setTimeout( async () => {  
                window.location.replace("../pages/dashboardAdmin.html")
            }, 900)

            return res.data
        })
        .catch((err) => {
            Toast.create("A empresa não foi cadastrada, verifique as informações!" , "red")
        })

        return registerComp
    }

    static async listDepartmentCompany(id) {
        const departments = await instance
        .get(`departments/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return departments
    }

    static async registerDepartment(data) {
        const registerComp = await instance
        .post("departments", data)
        .then((res) =>  {
            window.location.replace("../pages/dashboardAdmin.html")

            return res.data
        })
        .catch((err) => console.log(err))

        return registerComp
    }

    static async listNotEmployedUser() {
        const users = await instance
        .get("admin/out_of_work")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return users
    }

    static async listAllUsers() {
        const users = await instance
        .get("users")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return users
    }

    static async hireUserDepartment(data) {
        const hireUser = await instance
        .patch("departments/hire/", data)
        .then((res) => {
            Toast.create("O usuário foi contrato com sucesso!", "4263EB")

            return res.data
        })
        .catch((err) => {
            Toast.create("Usuário não foi contrato, verificar informações", "red")
        })

        return hireUser
    }

    static async fireUserDepartment(id) {
        const fireUser = await instance
        .patch(`departments/dismiss/${id}`)
        .then((res) => {
            Toast.create("O usuário foi demitido!", "#4263EB")

            return res.data
        })
        .catch((err) => {

            Toast.create("Usuário não foi demitido, verificar informações", "red")
            console.log(err)
        })

        return fireUser
    }

    static async editDepartment(id, data) {
        const edit = await instance
        .patch(`departments/${id}`, data)
        .then((res) => {
            Toast.create("O departamento foi editado", "#4263EB")

            setTimeout( async () => {  
                window.location.replace("../pages/dashboardAdmin.html")
            }, 900)

            return res.data
        })
        .catch((err) => {
            Toast.create("Não foi possível editar o departamento", "red")
        })
    }

    static async deleteDepartment(id) {
        const delDepartment = await instance
        .delete(`departments/${id}`)
        .then((res) => {
            Toast.create("Departamento deletado com sucesso!", "#4263EB")

            return res.data
        })
        .catch((err) => {
            Toast.create("Departamento não foi deletado", "red")
        })

        return delDepartment
    }

    static async editUser(id, data) {
        const editUser = await instance
        .patch(`admin/update_user/${id}`, data)
        .then((res) => {
            Toast.create("Funcionário editado com sucesso!", "#4263EB")

            setTimeout( async () => {  
                window.location.replace("../pages/dashboardAdmin.html")
            }, 900)
            
            return res.data
        })
        .catch((err) => {
            Toast.create("Funcionário não foi editado!", "red")
        })

        return editUser
    }

    static async deleteUser(id) {
        const userDel = await instance
        .delete(`admin/delete_user/${id}`)
        .then((res) => {
            Toast.create("Usuário deletado com sucesso", "#4263EB")

            return res.data
        })
        .catch((err) => {
            console.log(err)
            Toast.create("O usuário não foi deletado!", "red")
        })

        return userDel
    }
}