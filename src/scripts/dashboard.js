import { Requests } from "./Requests.js";

export default class Dashboard {

    static logoutUser() {
        const logoutBtn = document.querySelector('#logoutBtn')

        logoutBtn.addEventListener("click", (event) => {
            event.preventDefault()
            console.log("oi")
            localStorage.removeItem("@kenzieEmpresa:token")
            localStorage.removeItem("@kenzieEmpresa:user_Id")
            localStorage.removeItem("@kenzieEmpresa:company_id")
    
            window.location.assign("../../index.html")
        })
    }

    static listCompany(array) {
        const ul = document.querySelector(".container__companyUser")

        ul.innerText = ""

        const company = Dashboard.renderCompany(array)

        ul.append(company)
    }

    static renderCompany(company) {
        const li = document.createElement("li")
        const h4TitleCompany = document.createElement("h4")
        const pDescripCompany = document.createElement("p")
        const pHour = document.createElement("p")

        h4TitleCompany.innerText = company.name
        pDescripCompany.innerText = company.description
        pHour.innerText = `Horário: ${company.opening_hours}`

        li.append(h4TitleCompany, pDescripCompany, pHour)

        return li
    }

    static async listDepartment (array) {
        const ul = document.querySelector('.container__companyDepart')
        const idUser = localStorage.getItem("@kenzieEmpresa:user_Id")

        const departmentUser = array.departments
        ul.innerText = ""

        const idUserInfo = await Requests.getUserLogged()

        const idDepUser = idUserInfo.department_uuid

        const depUser = departmentUser.filter((element) => element.uuid == idDepUser)

        depUser.forEach(element => {
            const department = Dashboard.renderDepartment(element)

            ul.append(department)
        })
    }

    static renderDepartment(array) {

        const li = document.createElement("li")
        const h4NameDepartment = document.createElement("h4")
        const pDescriptionDepartment = document.createElement("p")

        h4NameDepartment.innerText = array.name
        pDescriptionDepartment.innerText = array.description

        li.append(h4NameDepartment, pDescriptionDepartment)
        
        return li
    }

    static listEmployees(array) {
        const ul = document.querySelector(".container__employees")
        const arrayUsers = array[0].users
        
        ul.innerText = ""

        if(array.length == 0) {
            const li = document.createElement("li")

            li.innerText = "Não possuem funcionários nesse departamento!"

            ul.append(li)
        }

        arrayUsers.forEach(element => {
            const employe = Dashboard.renderEmployeesSameDepartment(element)
            
            ul.append(employe)
        })
    }
    
    static renderEmployeesSameDepartment(data){
        
        const li = document.createElement("li")
        const employeeName = document.createElement("h4")
        const employeeEmail = document.createElement("p")
        const employeeLevel = document.createElement("p")

        employeeName.innerText = data.username
        employeeEmail.innerText = data.email 
        employeeLevel.innerText = data.professional_level
        
        li.append(employeeName, employeeEmail, employeeLevel)

        return li
    }

    static showModalEdit(data) {
        const btnEdit = document.querySelector("#editPerfilBtn")
        const modal = document.querySelector(".modal")
        const inputName = document.querySelector("#username")
        const inputEmail = document.querySelector("#email")

        btnEdit.addEventListener("click", (event) => {
            event.preventDefault()
            modal.classList.remove("hidden")

            inputName.value = data.username
            inputEmail.value = data.email
        })

        Dashboard.editInfoUserLogged()
    }

    static infoUserNowLogged(array) {
        const section = document.querySelector(".container__infoUserLogged")

        const h3NameUsr = document.createElement("h3")
        const pProfLevel = document.createElement("p")

        h3NameUsr.innerText = `${array.username.toUpperCase()}`
        pProfLevel.innerText = `Level de profissão: ${array.professional_level}`

        section.append(h3NameUsr, pProfLevel)

        return section
    }

    static editInfoUserLogged() {
        const inputName = document.querySelector("#username")
        const inputEmail = document.querySelector("#email") 
        const inputPassword = document.querySelector("#password") 
        const btnEdit = document.querySelector(".btnEdit")

        btnEdit.addEventListener("click", async (event) => {
            event.preventDefault()

            const data = {
                username: inputName.value,
                email: inputEmail.value,
                password: inputPassword.value
            }

            const edit = await Requests.editUserLoggedInfo(data)

        })
    }
}



Dashboard.logoutUser()
const employees = await Requests.employessSameDepartment()
Dashboard.listEmployees(employees)
const departments = await Requests.userDepartment()
Dashboard.listDepartment(departments)
Dashboard.listCompany(departments)
Dashboard.showModalEdit()
const user = await Requests.getUserLogged()
Dashboard.showModalEdit(user)
const infoUserLogged = await Requests.companyUser()
Dashboard.infoUserNowLogged(infoUserLogged)