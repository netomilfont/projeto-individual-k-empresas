import { Requests } from "./Requests.js";

export default class Dashboard {

    static listCompany(array) {
        const ul = document.querySelector(".container__companyUser")

        ul.innerText = ""

        const company = Dashboard.renderCompany(array[0])

        ul.append(company)
    }

    static renderCompany(company) {
        const li = document.createElement("li")
        const h4TitleCompany = document.createElement("h4")
        const pDescripCompany = document.createElement("p")

        h4TitleCompany.innerText = company.companies.name
        pDescripCompany.innerText = company.companies.description

        li.append(h4TitleCompany, pDescripCompany)

        return li
    }

    static listDepartment (array) {
        const ul = document.querySelector('.container__companyDepart')

        ul.innerText = ""

        array.forEach(element => {
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
    
        ul.innerText = ""
        if(array.length == 0) {
            const li = document.createElement("li")

            li.innerText = "Não possuem funcionários nesse departamento!"

            ul.append(li)
        }

        array.forEach(element => {
            const employe = Dashboard.renderEmployeesSameDepartment(element)

            ul.append(employe)
        });
    }
    
    static renderEmployeesSameDepartment(data){
        
        const li = document.createElement("li")
        const employeeName = document.createElement("h4")
        const employeeEmail = document.createElement("p")
        const employeeLevel = document.createElement("p")

        employeeEmail.innerText = data.username
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
    }
}

const employees = await Requests.employessSameDepartment()
Dashboard.listEmployees(employees)

const departments = await Requests.userDepartment()
Dashboard.listDepartment(departments)
Dashboard.listCompany(departments)
Dashboard.showModalEdit()

const user = await Requests.getUserLogged()
Dashboard.showModalEdit(user)