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
        console.log(sector)
        const li = document.createElement("li")
        const h4TitleSector = document.createElement("h4")
    
        h4TitleSector.innerText = sector.description

        li.append(h4TitleSector)

        return li
    }
}

const sector = await Requests.getAllSectores()
console.log(sector)
DashboardAdmin.listAllSectors(sector)