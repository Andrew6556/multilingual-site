"use strict";


export class Header{
    constructor(){
        this.wrapper = document.createElement("header")
        this.wrapper.classList.add("header")
        this.wrapper.innerHTML = `
                <div class="header__top">
                    <div class="header__topContent container">
                        <div class="header__logo lang-logo">Your favorite cinema</div>
                        <select class="header__change-language">
                            <option value="en">En</option>
                            <option value="pl">Pl</option>
                        </select>
                        <div class="header__sistem">
                            <div class="header__group modalEntrance__group">
                                <button class="header__SignUp btn header__group_choice title lang-SignUp">Sign Up</button>
                                <button class="header__logIn  btn header__group_choice title lang-logIn">Log In</button>
                            </div>
                        </div>
                        
                        <nav class="nav hidden__active">
                            <div class="nav__profile">
                                <div class="nav__profile-img">
                                    <img class="nav__profile-item" src="/img/icon/profile/avatar.svg" alt="profile">
                                </div>
                                <ul class="nav__menu">
                                    <li class="nav__item">
                                        <span class="lang-sistem">Signed in as</span>
                                        <p class="nav__userName">Andre9qsq2</p>
                                    </li>
                                    <li class="nav__item nav__item_fall">
                                        <p class="lang-sort">Sort movies</p>
                                        <ul class="nav__list">
                                            <li class="nav__item nav__sorted nav__item_best lang-best__movies">First best movies</li>
                                            <li class="nav__item nav__sorted nav__item_worst lang-worst__movies">First worst movies</li>
                                        </ul>
                                    </li>
                                    <li class="nav__item nav__item_favorites lang-favorites">View favorites</li>
                                    <li class="nav__item nav__item_out lang-out">Sign out</li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                <div class="header__content container">
                    <div class="header__title title lang-sabtitle">Watch movies on your favorite platform</div>
                    <div class="header__wrapper">
                        
                    </div>
                </div> `
    }
}
