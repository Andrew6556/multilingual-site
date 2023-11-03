"use strict";

import {Card} from "../modules/Card.js";
import {Header} from "../modules/Header.js";
import {Slider} from "../modules/Slider.js";
import {Form} from "../modules/Form.js";



const toggle = document.querySelector(".toggle"),
    sign_up  = document.querySelector(".form__SignUp"),
    log_in   = document.querySelector(".form__LogIn");


const path_films = `http://kinopoiskapiunofficial.tech/api/v2.2/films/top`,
    options = {
        headers: {
            'X-API-KEY': '4dc0fb6b-92e7-4e5d-b3c6-960b4ce6443d',
            'Content-Type': 'application/json; charset=UTF-8',
        }
}

document.querySelector(".toggle__img").addEventListener("click", function(){
    // when clicked, the authorization form becomes visible
    sign_up.classList.remove("form__active")
    toggle.classList.add("toggle__active")

    log_in.style.opacity = "0";
    // hide the picture
    this.classList.add("hidden__active");
})

document.querySelector(".close").addEventListener("click", function(event){
    // when clicked, the authorization form becomes hidden
    event.target.closest(".form__SignUp").classList.add("form__active")
    event.target.closest(".toggle").classList.remove("toggle__active")

    // visible the picture
    document.querySelector(".toggle__img").classList.remove("hidden__active");
    log_in.style.opacity = "1"
})





let users_rg = []
document.querySelectorAll(".form__verification").forEach(item =>{
    let form = new Form(item);
    
    form.form_Wrapper.addEventListener("submit", (link) =>{
        link.preventDefault();
        let [form_email,form_login,form_password] = [...form.get_data()];

        if (form.form_Wrapper.classList.contains("form__SignUp")){
            // add database with registered users
            users_rg.push({
                email:form_email,
                login:form_login,
                password:form_password,
            })
            link.target.reset()
            form.return_original()

            document.querySelector(".modalNotification").classList.toggle("active")
            // you have successfully logged in
        }else{
            let check_data = users_rg[0].email === form_email && users_rg[0].login === form_login
                                        && +users_rg[0].password === +form_password;
            if (check_data){
                link.target.reset()
                form.return_original()
                // remove the login menu
                document.querySelector(".nav").classList.toggle("hidden__active")
                // add a user profile with all the features
                document.querySelector(".header__sistem").classList.toggle("hidden__active")
                // we clear the form from possible errors when trying to enter
                document.querySelector(".modalEntrance__btn-LogIn").classList.remove("error__data")


                document.querySelector(".modalNotification").classList.toggle("active")
                document.querySelector(".modalNotification__text").innerText = "you have successfully logged in";
                document.querySelector(".slider").remove()
                slider.then(data => data(false, true))
            }else{
                document.querySelector(".modalEntrance__btn-LogIn").classList.add("error__data")
            }
        }
    })
})



let header = new Header().wrapper;
document.querySelector(".wrapper").appendChild(header);

const available_languages  = ["en", "pl"],
    default_languages      = "en",
    default_class          = "lang",
    path_to_languages_dir  = "./js/languages";


let select_change_lang = document.querySelector(".header__change-language");

select_change_lang.addEventListener("change", function(){
    location.href = `${window.location.pathname}#${this.value}`;
    location.reload()
})


async function get_data_json(lang){
    return await(await fetch(`${path_to_languages_dir}/${lang}.json`)).json()
}

function change_language(){
    let hash = window.location.hash.substr(1);
    if(!available_languages.includes(hash)){
        location.href = `${window.location.pathname}#${default_languages}`
        location.reload()

        return true;
    }
    select_change_lang.value = hash;
    get_data_json(hash).then(data =>{
        Object.entries(data).forEach(([key, value]) => {
            document.querySelector(`.${default_class}-${key}`).innerText = value;
        });
    })
}
change_language()


let slider = create_slider();
slider.then(data => data())

document.querySelector(".nav__item_out").addEventListener("click", (event) =>{
    event.target.closest(".nav").classList.toggle("hidden__active")
    document.querySelector(".header__sistem").classList.toggle("hidden__active")

    document.querySelector("modalNotification__text").innerText = "Congratulations your accound has been successfully created"
    document.querySelector(".slider").remove()
    slider.then(data => data())
})
document.querySelector(".nav__item_favorites").addEventListener("click", () =>{
    document.querySelector(".modalFavorites").classList.toggle("active")
})

document.querySelectorAll(".modal").forEach(modal =>{
    // Closing background modal
    modal.addEventListener("click", function(){
        this.classList.add("active")
        if(this.querySelector(".form__SignUp")){
            sign_up.classList.add("form__active")
            toggle.classList.remove("toggle__active")

            log_in.style.opacity = "1"

            document.querySelector(".toggle__img").classList.remove("hidden__active");
        }
    })
})
document.querySelector(".modal__body").addEventListener("click", function(event){
    // stop immersing the event
    event.stopImmediatePropagation()
})

document.querySelector(".modalNotification__btn").addEventListener("click",(event) =>{
    event.target.closest(".modal").classList.toggle("active")
})

document.querySelectorAll(".header__group_choice").forEach(button => {
    button.addEventListener("click", function (){
        // open a modal with a form
        document.querySelector(".modalEntrance").classList.toggle("active")
        if(button.classList.contains("header__SignUp")){
            sign_up.classList.remove("form__active")
            toggle.classList.add("toggle__active")

            document.querySelector(".toggle__img").classList.add("hidden__active")
        }
    })
})

async function create_slider(){
    // We get 20 movies from the movie search
    try{
        let initial_films = await(await fetch(path_films, options)).json();
        // We use a closure! To avoid making the same request
        return function(sorted=false, active_click){
            //get divs based on received movie information
            let div_cards = initial_films.films.map(film  => new Card(film,active_click).wrapper);
            //If necessary, sort the films: 1. Descending 2. Ascending
            sorted ? div_cards:div_cards.sort((card_one, card_two) => {
                return (+card_one.querySelector(".card__viewer-rating").innerText -
                    +card_two.querySelector(".card__viewer-rating").innerText)
                })
            // add slider to DOM
            document.querySelector(".header__wrapper").appendChild(new Slider(div_cards).wrapper)
        }
    }catch(error){
        console.log(`Ошибка --- ${error}}`)
    }
}

document.querySelectorAll(".nav__sorted").forEach(div =>{
    div.addEventListener("click", (event) =>{
         // remove the initial slider on the page
        document.querySelector(".slider").remove()
        // On click, create a slider based on the selected sort item
        if(event.target.classList.contains("nav__item_best")){
            slider.then(data => data(true,true))
        }else{
            slider.then(data => data(false,true))
        }
    })
})