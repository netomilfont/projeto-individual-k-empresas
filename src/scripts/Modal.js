export class Modal {
    static template(form) {
        const body = document.querySelector("body")
        const section = document.createElement("section")

        section.classList.add("modal")

        section.append(form)
        body.append(section)
    }

    static loginForm() {
        const modalForm = document.createElement("form")
        const divForm = document.createElement("div")
        const h3TitleForm = document.createElement("h3")
        const btnBack = document.createElement("button")
        const inputEmail = document.createElement("input")
        const inputPassword = document.createElement("input")
        const btnLogin = document.createElement("button")
        const span = document.createElement("span")
        const btnPagRegister = document.createElement("button")

        divForm.classList.add("divFormSignup")
        h3TitleForm.innerText = "Login"
        btnBack.innerText = "Voltar"
        btnBack.classList.add("backSignupOne")
        span.innerText = "Ainda não possui cadastro?"
        span.classList.add("spanCadastro")
        inputEmail.type = "email"
        inputEmail.placeholder = "Digite seu email"
        inputEmail.classList.add("inputEmail")
        inputPassword.type = "password"
        inputPassword.placeholder = "Digite sua senha"
        inputPassword.classList.add("inputPassword")
        btnLogin.innerText = "Logar"
        btnLogin.type = "submit"
        btnLogin.classList.add("btnLogin")
        btnLogin.classList.add("btnLog")
        btnPagRegister.innerText = "Ir para página de registro"
        btnPagRegister.type = "submit"
        btnPagRegister.classList.add("btnRegister")

        divForm.append(h3TitleForm, btnBack)
        modalForm.append(divForm, inputEmail, inputPassword, btnLogin, span, btnPagRegister )
    
        return modalForm
    }

    static signupForm() {
        const modalForm = document.createElement("form")
        const divForm = document.createElement("div")
        const h3TitleForm = document.createElement("h3")
        const btnBack = document.createElement("button")
        const inputName = document.createElement("input")
        const inputEmail = document.createElement("input")
        const inputPassword = document.createElement("input")
        const inputJob = document.createElement("input")
        const inputImgPefil = document.createElement("input")
        const btnRegister = document.createElement("button")
        const spanLogin = document.createElement("span")
        const btnLogin = document.createElement("button")
    
        divForm.classList.add("divFormSignup")
        h3TitleForm.innerText = "Cadastro"
        btnBack.innerText = "Voltar"
        btnBack.classList.add("backSignupOne")
        inputName.placeholder = "Seu nome"
        inputName.type = "text"
        inputName.classList.add("inputName")
        inputEmail.placeholder= "Seu email"
        inputEmail.type = "email"
        inputEmail.classList.add("inputEmail")
        inputPassword.placeholder = "Sua senha"
        inputPassword.type = "password"
        inputPassword.classList.add("inputPassword")
        inputJob.placeholder = "Qual o seu trabalho?"
        inputJob.type = "text"
        inputJob.classList.add("inputJob")
        inputImgPefil.placeholder = "URL da imagem de perfil"
        inputImgPefil.type = "url"
        inputImgPefil.classList.add("inputImg")
        btnRegister.innerText = "Registrar"
        btnRegister.type = "submit"
        btnRegister.classList.add("btnLogin")
        spanLogin.innerText = "Já possui login?"
        btnLogin.innerText = "Ir para página de login"
        btnLogin.type = "submit"
        btnLogin.classList.add("btnRegister")

        divForm.append(h3TitleForm, btnBack)
        modalForm.append(divForm, inputName, inputEmail, inputPassword, inputJob, inputImgPefil, btnRegister, spanLogin, btnLogin)
    
        return modalForm
    } 

    static showModal() {
        const modal = document.querySelector("btnOpenPost")
    }
}