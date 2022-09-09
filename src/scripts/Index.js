import { Modal } from "./Modal.js"
import { Requests } from "./Requests.js"

export default class Index {
    // static renderIndex() {
    //     const token = localStorage.getItem("@kenzieSocial:token")

    //     if(token) {
    //         window.location.replace("./src/pages/dashboard.html")
    //     }
    // }

    static handleLoginModal() {
        const loginBtn = document.querySelector("#loginBtn")

        loginBtn.addEventListener("click", () => {
            const newLoginModal = Modal.loginForm()
            Modal.template(newLoginModal)
            Index.closeModalLogin()
            Index.closeLoginOpenSignup()
            Index.handleLogin()
        })
    }

    static closeModalLogin() {
        const closeModalBtn = document.querySelector(".backSignupOne")
        
        closeModalBtn.addEventListener("click", (event) => {
            event.preventDefault()
            
            const modal = document.querySelector(".modal")
            modal.classList.add("disappear")
            
            setTimeout(() => {
                modal.remove()
            }, 1000)
        })
    }

    static handleSignupModal () {
        const signupBtn = document.querySelector("#signupBtn")
        
        signupBtn.addEventListener("click", () => {
            const newSignupModal = Modal.signupForm()
            Modal.template(newSignupModal)
            Index.closeModalSignup()
            Index.handleSingup()
            Index.closeSignupOpenLogin()
        })
    }

    static closeModalSignup () {
        const closeModalBtn = document.querySelector(".backSignupOne")

        closeModalBtn.addEventListener("click", (event) => {
            event.preventDefault()

            const modal = document.querySelector(".modal")
            modal.classList.add("disappear")

            setTimeout(() => {
                modal.remove()
            }, 1000)
        })
    }

    static handleLogin() {
        const userEmail = document.querySelector(".inputEmail")
        const userPassword = document.querySelector(".inputPassword")
        const btnLogin = document.querySelector(".btnLog")

        btnLogin.addEventListener("click", async (event) => {
            event.preventDefault()

            const data = {
                email: userEmail.value,
                password: userPassword.value                
            }

            const login = await Requests.login(data)
        })

    }

    static handleSingup() {
        const userName = document.querySelector(".inputName")
        const userEmail = document.querySelector(".inputEmail")
        const userPassword = document.querySelector(".inputPassword")
        const userJob = document.querySelector(".inputJob")
        const userImg = document.querySelector(".inputImg")
        const btnRegister = document.querySelector(".btnLogin")

        btnRegister.addEventListener("click", async (event) => {
            event.preventDefault()

            const data = {
                "username": userName.value,
                "email": userEmail.value,
                "password": userPassword.value, 
                "work_at": userJob.value,
                "image": userImg.value
            }

            const signup = await Requests.signup(data)
        })
    }

    static closeLoginOpenSignup () {
        const btnRegister = document.querySelector(".btnRegister")

        btnRegister.addEventListener("click", (event) => {
            event.preventDefault()

            const modal = document.querySelector(".modal")
            modal.classList.add("disappear")
            
            setTimeout(() => {
                modal.remove()
            }, 1000)

            const newSignupModal = Modal.signupForm()
            Modal.template(newSignupModal)
            Index.handleSignupModal()
        })
    }

    static closeSignupOpenLogin () {
        const btnRegister = document.querySelector(".btnRegister")

        btnRegister.addEventListener("click", (event) => {
            event.preventDefault()

            const modal = document.querySelector(".modal")
            modal.classList.add("disappear")
            
            setTimeout(() => {
                modal.remove()
            }, 1000)
            
            Index.handleLoginModal()
        })
    }

    static listCompanies (array) {
        const ul = document.querySelector(".container__companies")

        console.log(array)
        const data = array

        ul.innerText = ""

        data.forEach((company) => {
            const companyCard = Index.createCompanies(company)

            ul.append(companyCard)
        })
    }

    static createCompanies(company) {

        const li = document.createElement("li")
        const h4TitleCompanies = document.createElement("h4")
        const spanCompaniesDescrip = document.createElement("span")
        const spanCompaniesSector = document.createElement("span")

        h4TitleCompanies.innerText = company.name 
        spanCompaniesDescrip.innerText = company.description
        spanCompaniesSector.innerText = `Setor: ${company.sectors.description}`
        spanCompaniesSector.classList.add("spanDescription")
        
        li.append(h4TitleCompanies, spanCompaniesDescrip, spanCompaniesSector)

        return li
    }
}

Index.handleLoginModal()
Index.handleSignupModal()

const companies = await Requests.getAllCompanies()
Index.listCompanies(companies)