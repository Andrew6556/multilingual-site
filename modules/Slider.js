"use strict";


export class Slider{
    constructor(slides){
        // полуаем все карточки
        this.slides       = slides
        // макс кол-во карточек
        this.maxSlides    = slides.length
        // счетчик
        this.currentIndex = 0
        // создаем сам класс слайдера
        this.wrapper = document.createElement("div")
        this.wrapper.classList.add("slider")
        // контейнер слайдера
        this.slideWrapper = document.createElement("div")
        this.slideWrapper.classList.add("slider__wrapper")
        this.slides.forEach(card => {
            // добавляем карточки в контейнер
            this.slideWrapper.appendChild(card)
        });
        //создали кнопку для возращения пред. слайду
        this.prevBtn = document.createElement("button")
        this.prevBtn.classList.add("slider__btn")
        this.prevBtn.innerText = "Prev";
        this.prevBtn.addEventListener('click',this.prev)

        //создали кнопку для возращения next. слайду
        this.nextBtn = document.createElement("button")
        this.nextBtn.classList.add("slider__btn")
        this.nextBtn.innerText = "Next";
        this.nextBtn.addEventListener('click',this.next)

        // создали обертку для навигаций
        this.navigation = document.createElement("div")
        this.navigation.classList.add("slider__navigation")
        this.navigation.appendChild(this.prevBtn)
        this.navigation.appendChild(this.nextBtn)

        this.wrapper.appendChild(this.slideWrapper)
        this.wrapper.appendChild(this.navigation)

        this.update()
    }
    prev = () => {
        if (this.currentIndex === 0){
            this.currentIndex = this.maxSlides - 1
        }else{
            this.currentIndex--
        }
        this.update()
    }
    next = () => {
        if (this.currentIndex === this.maxSlides -1){
            this.currentIndex = 0
        }else{
            this.currentIndex++
        }
        this.update()
    }
    update(){
        this.slides.forEach(card =>{
            card.style.display = 'none';
        })
        this.slides[this.currentIndex].style.display = 'block';
    }
}
