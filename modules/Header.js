"use strict";


export class Header{
    constructor(){
        this.wrapper = document.createElement("header")
        this.wrapper.classList.add("header")
        this.wrapper.innerHTML = `
                <div class="header__top">
                    <div class="header__topContent container">
                        <div class="header__logo">Ваш любимый <br><span class="header__logoDecor">Кинотеатр</span></div>
                        <div class="header__sistem">
                            <div class="header__group modalEntrance__group">
                                <button class="header__SignUp btn header__group_choice title">Sign Up</button>
                                <button class="header__logIn  btn header__group_choice title">Log In</button>
                            </div>
                        </div>
                        
                        <nav class="nav hidden__active">
                            <div class="nav__profile">
                                <div class="nav__profile-img">
                                    <img class="nav__profile-item" src="/img/icon/profile/avatar.svg" alt="profile">
                                </div>
                                <ul class="nav__menu">
                                    <li class="nav__item">
                                        <span>Signed in as</span>
                                        <p class="nav__userName">Andre9qsq2</p>
                                    </li>
                                    <li class="nav__item nav__item_fall">
                                        <p>Sort movies</p>
                                        <ul class="nav__list">
                                            <li class="nav__item nav__sorted nav__item_best">First best movies</li>
                                            <li class="nav__item nav__sorted nav__item_worst">First worst movies</li>
                                        </ul>
                                    </li>
                                    <li class="nav__item nav__item_favorites">View favorites</li>
                                    <li class="nav__item nav__item_out">Sign out</li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                <div class="header__content container">
                    <div class="header__title title">Смотрите фильмы <br> на вашей любимой платформе</div>
                    <div class="header__wrapper">
                        
                    </div>
                </div> `
    }
}
