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
}

const sector = await Requests.getAllSectores()
DashboardAdmin.listAllSectors(sector)
DashboardAdmin.listAllOptions(sector)