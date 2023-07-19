"use strict";

export class Card{
    constructor(data, active_click=false){
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("card");
        this.wrapper.innerHTML = `
                <div class="card__img">
                    <img class="card__img-item" src="${data.posterUrl}" alt="#">
                </div>
                <div class="card__title title">${data.nameRu}</div>
                <div class="card__inner">
                    <div class="card__wrapper">
                        <p class="card__text">Режиссер:<span class="card__decor">Классный</span></p>
                        <p class="card__text">Год выпуска:<span class="card__decor card__num">${data.year}</span></p>
                        <p class="card__text">Оценка зрителей:<span class="card__viewer-rating card__decor card__num">${data.rating}</span></p>
                        <p class="card__text">Жанры:<span class="card__decor">${data.genres[0].genre}</span></p>
                    </div>
                </div>
                <div class="card__hover">
                    <svg class="card__hover-like" width="80px" height="80px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="favouriteIconTitle" stroke="rgba(253, 253, 253, 0.712)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000" transform="rotate(0)">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                        <g id="SVGRepo_iconCarrier"> <title id="favouriteIconTitle">Favourite</title> <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"/> </g>
                    </svg>
                </div>`;
        if(active_click){
            this.wrapper.querySelector(".card__hover-like").addEventListener("click", event =>{
                event.target.style.fill   = "rgba(255, 0, 0, 0.797)";
                event.target.style.stroke = "rgba(255, 0, 0, 0.797)";
                this.add_favorites(event)
            },{once:true})
        }
    }
    add_favorites(){
        let title = event.target.closest(".card").querySelector(".card__title").innerText,
            img   = event.target.closest(".card").querySelector(".card__img-item").src;
        
        let div_li = document.createElement("li");
        div_li.classList.add("modalFavorites__item");
        div_li.innerHTML = `
            <div class="modalFavorites__img">
                <img class="modalFavorites__img-item" src="${img}" alt="#">
            </div>
            <p class="modalFavorites__sabtitle title">${title}</p>`;
        document.querySelector(".modalFavorites__list").appendChild(div_li)
    }
}
