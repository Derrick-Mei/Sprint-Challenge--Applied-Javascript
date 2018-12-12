class CarouselButton {
    constructor(element, side, parent) {
        this.element = element
        this.parent = parent
        this.element.addEventListener('click', (el) => {
            if ( side === 'right') {
                parent.slideRight()
                // console.log("right got clicked")
            } else {
                parent.slideLeft()
            }
        })
    }
}

class Carousel {
    constructor(element) {
        this.element = element;

        // returns $obj with img tags
        this.imgList = document.getElementsByClassName('carousel')[0].getElementsByTagName('img');
        // gets right button element and passes it to CarouselButton
        this.rightButton = document.getElementsByClassName('right-button')[0]
        this.rightButton = new CarouselButton(this.rightButton, 'right', this)
        // left button is also given button click function
        this.leftButton = document.getElementsByClassName('left-button')[0]
        this.leftButton = new CarouselButton(this.leftButton, 'left', this)

        this.currentImgIndex = 0
        this.init()
    }

    init() {
        this.imgList[this.currentImgIndex].style.display = 'block'
        // console.log("I got hit!")
    }
    // slide Right and left assigned inline style to current img to display:none, changes currentImgIndex, and then makes the current img fadeIn()
    slideRight() {
        this.imgList[this.currentImgIndex].style.display = 'none'
        this.currentImgIndex++
        // End of img list, reset to 0
        if (this.currentImgIndex === this.imgList.length) {
            this.currentImgIndex = 0
        }
        $(this.imgList[this.currentImgIndex]).fadeIn();
    }

    slideLeft() {
        this.imgList[this.currentImgIndex].style.display = 'none'
        this.currentImgIndex--
        // End of img list, reset to last img item in the img list
        if (this.currentImgIndex < 0) {
            this.currentImgIndex = this.imgList.length-1
        }

        $(this.imgList[this.currentImgIndex]).fadeIn();
        // (this.imgList[this.currentImgIndex]).style.display = 'block';
    }
}

//Using jQuery Select element with carousel class and pass it to class Carousel
let carousel = $('.carousel');
carousel = new Carousel(carousel);