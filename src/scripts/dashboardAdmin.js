import { Requests } from "./Requests.js"

export default class DashboardAdmin {

    static listAllSectors(array) {   
        const ul = document.querySelector(".container__sectors")

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
        })
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
        const div = document.querySelector(".container_allCompanies")
        
        div.innerText = ""
        
        array.forEach(async (element)=> {
            const idCompany = element.uuid
            const company = DashboardAdmin.createCompany(element)

            company.id = idCompany
            div.append(company)

            const departments = await Requests.listDepartmentCompany(idCompany)
            
            
            departments.forEach((depart) => {
                const divDep = document.querySelector(".companyDep")

                const department = DashboardAdmin.createDepartment(depart)

                    divDep.append(department)
            })
        })
    }


    static createCompany(company){
        const divCompany = document.createElement("div")
        const h4NameCompany = document.createElement("h4")
        const pBranchActivity = document.createElement("p")
        const pDescripCompany = document.createElement("p")
        const pHourCompany = document.createElement("p")
        const h5Departament = document.createElement("h5")
        const divDepartment = document.createElement("div")

    
        divCompany.classList.add("divCompany")
        h5Departament.innerText = "Departamentos"
        divDepartment.classList.add("companyDep")
        divDepartment.id = company.uuid
        h4NameCompany.innerText = company.name
        pBranchActivity.innerText = `Ramo da empresa: ${company.sectors.description}`
        pDescripCompany.innerText = company.description
        pHourCompany.innerText = `Horário: ${company.opening_hours}`

        divCompany.append(h4NameCompany, pBranchActivity, pDescripCompany, pHourCompany, h5Departament, divDepartment)

        return divCompany
    }

    static createDepartment(department) {
        const div = document.createElement("div")
        const h5NameDepartment = document.createElement("h5")
        const pDescriptionDepartment = document.createElement("p")

        h5NameDepartment.innerText = department.name
        pDescriptionDepartment.innerText = department.description

        div.append(h5NameDepartment, pDescriptionDepartment)

        return div
    }

    static listBySectorAdmin(array) {
        const div = document.querySelector(".container__sectors")

        div.addEventListener("click", (event) => {
            let btn = event.target

            if(btn.tagName == "LI" || btn.tagName == "H4" && btn.innerText == "Alimenticio") {
                const sectorAlimenticias = array.filter(element => element.sectors.description == "Alimenticio")
                
                DashboardAdmin.listAllCompanies(sectorAlimenticias)
            } else if(btn.tagName == "LI" || btn.tagName == "H4" && btn.innerText == "Automotiva") {
                const sectorAutomotivas = array.filter(element => element.sectors.description == "Automotiva")

                DashboardAdmin.listAllCompanies(sectorAutomotivas)
            } else if(btn.tagName == "LI" || btn.tagName == "H4" &&  btn.innerText == "TI") {
                const sectorTI = array.filter(element => element.sectors.description == "TI")

                DashboardAdmin.listAllCompanies(sectorTI)
            } else if (btn.tagName == "LI" || btn.tagName == "H4" && btn.innerText == "Todas") {

                DashboardAdmin.listAllCompanies(array)
            } else if(btn.tagName == "LI" || btn.tagName == "H4" && btn.innerText == "Varejo") {
                const sectorVarejo = array.filter(element => element.sectors.description == "Varejo")
                
                DashboardAdmin.listAllCompanies(sectorVarejo)
            } else if(btn.tagName == "LI" || btn.tagName == "H4" && btn.innerText == "Textil") {
                const sectorTextil = array.filter(element => element.sectors.description == "Textil")

                DashboardAdmin.listAllCompanies(sectorTextil)
            } else if(btn.tagName == "LI" || btn.tagName == "H4" && btn.innerText == "Manufatura") {
                const sectorManufatura = array.filter(element => element.sectors.description == "Manufatura")

                DashboardAdmin.listAllCompanies(sectorManufatura)
            } else if(btn.tagName == "LI" || btn.tagName == "H4" && btn.innerText == "Aeroespacial") {
                const sectorAeroespacial = array.filter(element => element.sectors.description == "Aeroespacial")

                DashboardAdmin.listAllCompanies(sectorAeroespacial)
            } else if(btn.tagName == "LI" || btn.tagName == "H4" && btn.innerText == "Atacado") {
                const sectorAtacado = array.filter(element => element.sectors.description == "Atacado")

                DashboardAdmin.listAllCompanies(sectorAtacado)
            }
        })
    }

    static listSpecificCompany(array) {
        const btnSearch = document.querySelector(".listCompanySpecific")
        const select = document.querySelector("#empresasAdmin")

        select.addEventListener("change", (event) => {
            const id = event.target.value
        
            btnSearch.addEventListener("click", async (event) => {
                event.preventDefault()

               const company =  array.filter((element) => {
            
                    if(element.uuid == id) {
    
                        return element
                    }
                })

                DashboardAdmin.listAllCompanies(company)
            })
        })
    }

    static listOptionsCompanies(array) {
        const select = document.querySelector("#company_options")

        select.innerText = ""

        array.forEach((element)=> {
            const company = DashboardAdmin.createCompanyOption(element)

            select.append(company)
        })
    }

    static registerDepartmentAdmin() {
        const btnRegister = document.querySelector(".btnRegisterDepartment")
        const inputName = document.querySelector("#nameDepartment")
        const inputDescription = document.querySelector("#descriptionDepCompany")
        const select = document.querySelector("#company_options")

        btnRegister.addEventListener("click", async (event) => {
            event.preventDefault()

            const data = {
                    "name": inputName.value,
                    "description": inputDescription.value,
                    "company_uuid": select.value
            }

            const register = await Requests.registerDepartment(data)
        })
    }

    static listOptionsCompaniesTwo(array) {
        const select = document.querySelector("#company_options2")

        select.innerText = ""

        array.forEach((element)=> {
            const company = DashboardAdmin.createCompanyOption(element)

            select.append(company)
        })
    }

    static listOptionsDepartments(array) {
        const select = document.querySelector("#department__options")

        array.forEach((element)=> {
            const department = DashboardAdmin.createOption(element)

            select.append(department)
        })

    }

    static  departmentSpecific() {
        const select = document.querySelector("#company_options2")

        select.addEventListener("change", async (event) => {
            const id = event.target.value

            const departments = await Requests.listDepartmentCompany(id)
            DashboardAdmin.listOptionsDepartments(departments)
        })
    }

    static infoDeparmentSpecific() {
        const btnSearch = document.querySelector(".searchDepartment")
        const select = document.querySelector("#department__options")
        const selectCompany = document.querySelector("#company_options2")

        selectCompany.addEventListener("change", (event) => {
            const idCompany = event.target.value

        })
        
        select.addEventListener("change", (event) => {
            const id = event.target.value

            btnSearch.addEventListener("click", async (event) => {
                event.preventDefault()

                const departments = Requests.listDepartmentCompany(idCompany)
            })
        })
    }
}

const sector = await Requests.getAllSectores()
DashboardAdmin.listAllSectors(sector)
DashboardAdmin.listAllOptions(sector)
const companies = await Requests.getAllCompanies()
DashboardAdmin.listCompaniesAdmin(companies)
DashboardAdmin.registerCompanyAdmin()
DashboardAdmin.listAllCompanies(companies)
DashboardAdmin.listBySectorAdmin(companies)
DashboardAdmin.listSpecificCompany(companies)
DashboardAdmin.listOptionsCompanies(companies)
DashboardAdmin.registerDepartmentAdmin()
DashboardAdmin.listOptionsCompaniesTwo(companies)
DashboardAdmin.departmentSpecific()
DashboardAdmin.infoDeparmentSpecific()
