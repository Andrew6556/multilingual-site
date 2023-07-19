"use strict";

export class Form{
    constructor(data){
        this.form_Wrapper   = data;
        this.input_password = this.form_Wrapper.querySelector('.input_password');
        this.input_confirm  = this.form_Wrapper.querySelector('.input_confirmPassword');

        let event_list = ['keyup','keydown'];

        this.show_password();
        event_list.map(event => this.form_Wrapper.querySelector(".input__login").addEventListener(event, this.login_verification))
        event_list.map(event => this.form_Wrapper.querySelector(".input__email").addEventListener(event, this.check_email))
        if (this.input_confirm){
            event_list.map(event => this.input_password.addEventListener(event,(event)=>{
                this.fullness_check_password(event)
                this.password_confirmation_check()
            }))
            event_list.map(event => this.input_confirm.addEventListener(event,this.password_confirmation_check))
        }else{
            event_list.map(event => this.input_password.addEventListener(event, this.fullness_check_password))
        }
    }
    show_password(){
        this.form_Wrapper.querySelectorAll(".form__passwordImg").forEach(password_img=>{
            password_img.addEventListener("click", (event) =>{
                if(event.target.closest(".form__password").querySelector(".password").type == "text"){
                    event.target.closest(".form__password").querySelector(".password").type = "password";
                    event.target.closest(".form__password").querySelector(".form__passwordImg-item").src = "./img/icon/modal/hide.png"
                }else{
                    event.target.closest(".form__password").querySelector(".password").type = "text";
                    event.target.closest(".form__password").querySelector(".form__passwordImg-item").src = "./img/icon/modal/eye.png"
                }
            })
        })
    }
    activate_button(){
        let inputs   = Array.from(this.form_Wrapper.querySelectorAll(".form__input")),
            form_btn = this.form_Wrapper.querySelector(".modalEntrance__btn");

        let confirmed_inputs = inputs.filter(input => {
            return input.classList.contains("correct__data")
        })
        if(confirmed_inputs.length == inputs.length){
            form_btn.disabled = false;
            form_btn.style.cursor = "pointer";
        }else{
            form_btn.disabled = true;
            form_btn.style.cursor = "not-allowed";
        }
    }
    login_verification = (event) => {
        let label_password = event.target.closest(".form__item_login").querySelector(".label__login"),
            input_value    = event.target.value;

        label_password.style.display = "flex";
        if(!input_value.length){
            label_password.innerText = "Данное поле не заполненно";
        }else if (!input_value.startsWith("@")){
            label_password.innerText = "Логин должен начинаться символа @";
        }else if(input_value.split("").filter(letter => letter == "@").length > 1){
            label_password.innerText = "Превышение кол-ва символа вводе";
        }else if(input_value.length - 1 < 8){
            label_password.innerText = "Логин должен состоять минимум из 8 символов";
            event.target.classList.remove("correct__data")
        }else{
            label_password.style.display = "none";
            event.target.classList.add("correct__data")
        }
        this.activate_button()
    }
    check_email = (event) =>{
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (EMAIL_REGEXP.test(event.target.value)) {
            event.target.parentElement.querySelector(".label__email").style.display = "none";
            event.target.classList.add("correct__data")
        } else {
            event.target.parentElement.querySelector(".label__email").style.display = "flex";
            event.target.classList.remove("correct__data")
        }
        this.activate_button()
    }
    password_confirmation_check = () =>{
        let match_check    = this.input_password.value.length >= 8 && this.input_confirm.value.length >= 8 ?
                                                this.input_confirm.value == this.input_password.value: false;

        let label_password = this.form_Wrapper.querySelector(".label__confirmPassword");
        if (match_check){
            label_password.style.display = "none";
            this.input_confirm.classList.add("correct__data")
        }else if(!this.input_confirm.value.length){
            this.form_Wrapper.querySelector(".label__confirmPassword").style.display = "none";
        }else if(this.input_confirm.value == this.input_password.value){
            this.form_Wrapper.querySelector(".label__confirmPassword").style.display = "none";
        }else{
            label_password.style.display = "flex";
            this.input_confirm.classList.remove("correct__data")
        }
        this.activate_button()
    }
    fullness_check_password = (event) =>{
        let label_password = event.target.closest(".form__item_password").querySelector(".label__password");
        label_password.style.display = "flex";
        if (!event.target.value.length){
            label_password.innerText = "Необходимо указать пароль";
        }else if(event.target.value.length < 8){
            label_password.innerText = "Пароль должен содержать не менее 8 символов";
            event.target.classList.remove("correct__data")
        }else{
            label_password.style.display = "none";
            event.target.classList.add("correct__data")
        }
        this.activate_button()
    }
    get_data(){
        let input_value = Array.from(this.form_Wrapper.querySelectorAll(".form__input")).map(elem => {
            return elem.value
        });
        return input_value
    }
    return_original(){
        this.form_Wrapper.querySelectorAll(".form__input").forEach(input =>{
            input.classList.remove("correct__data")
        })
    }
}