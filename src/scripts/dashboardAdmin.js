import { Requests } from "./Requests.js"

export default class DashboardAdmin {

    static listAllSectors(array) {   
        const ul = document.querySelector(".container__sectors")

        ul.innerText = ""

        array.forEach((element)=> {
            const sector = DashboardAdmin.createSector(element)
            
            ul.append(sector)
        })
    }

    static createSector(sector) {
        const li = document.createElement("li")
        const h4TitleSector = document.createElement("h4")
    
        h4TitleSector.innerText = sector.description

        li.append(h4TitleSector)

        return li
    }
    static listAllOptions(array) {
        const select = document.querySelector("#sectors_options")

        select.innerText = ""

        array.forEach((element)=> {
            const option = DashboardAdmin.createOption(element)

            select.append(option)
        })
    }

    static createOption(sector) {
        const optionSector = document.createElement("option")
        
        optionSector.innerText = sector.description
        optionSector.value = sector.uuid

        return optionSector
    }

    static registerCompanyAdmin() {
        const btnRegister = document.querySelector(".btnRegisterCompany")
        const inputName = document.querySelector("#nameCompany")
        const inputHour = document.querySelector("#hourCompany")
        const inputDescription = document.querySelector("#descriptionCompany")
        const select = document.querySelector("#sectors_options")

        btnRegister.addEventListener("click", async (event) => {
            event.preventDefault()

            const data = {
                    "name": inputName.value,
                    "opening_hours": inputHour.value,
                    "description": inputDescription.value,
                    "sector_uuid": select.value
            }

            const register = await Requests.registerCompany(data)
            const newlist = await Requests.getAllCompanies()
            DashboardAdmin.listCompaniesAdmin(newlist)

            inputName.value = ""
            inputHour.value = ""
            inputDescription.value = ""
        }
    }

    static listCompaniesAdmin(array) {
        const select = document.querySelector("#empresasAdmin")

        select.innerText = ""

        array.forEach((element)=> {
            const company = DashboardAdmin.createCompanyOption(element)

            select.append(company)
        })
    }

    static createCompanyOption(company) {
        const optionSector = document.createElement("option")
        
        optionSector.innerText = company.name
        optionSector.value = company.uuid

        return optionSector
    }

    static listAllCompanies(array) {
        const div = document.querySelector(".container_allComnanies")

        div.innerText = ""

        array.forEach((element) => {

            const company = DashboardAdmin.createCompany(element)


            div.append(company)
        })
    }

    static createCompany(company){
        const divCompany = document.createElement("div")
        const h4NameCompany = document.createElement("h4")
        const pDescripCompany = document.createElement("p")
        const pHourCompany = document.createElement("p")

        h4NameCompany.innerText = company.name
        pDescripCompany.innerText = company.description
        pHourCompany.innerText = company.opening_hours

        divCompany.append(h4NameCompany, pDescripCompany, pHourCompany)

        return divCompany
    }
}

const sector = await Requests.getAllSectores()
DashboardAdmin.listAllSectors(sector)
DashboardAdmin.listAllOptions(sector)
const companies = await Requests.getAllCompanies()
DashboardAdmin.listCompaniesAdmin(companies)
DashboardAdmin.registerCompanyAdmin()
DashboardAdmin.listAllCompanies(companies)