let introFirstBtn = document.querySelector('.intro_button_first')
let introSecondBtn = document.querySelector('.intro_button_second')
let introFisrt = document.querySelector('.intro_first')
let introSecond = document.querySelector('.intro_second')
let intro = document.querySelector('.intro')
let game = document.querySelector('.game')
let modal = document.querySelector('.modal')
let modalTitle = document.querySelector('.modal_title')
let modalText = document.querySelector('.modal_text')
let modalIcon = document.querySelector('.modal_icon')
let modalButton = document.querySelector('.modal_button')
let end = document.querySelector('.end')

modalButton.addEventListener('click', () => {
    modal.classList.remove('smooth-start')
    smoothEnd(modal)
    if (step === 3) {loadEnd()}
    setTimeout(() => {
        modal.classList.remove('flex')
        modal.classList.add('none')
        modal.classList.remove('smooth-end')
    }, 1000)
})

function renderModal(data) {
    modal.classList.remove('none')
    modal.classList.add('flex')
    smoothStart(modal)
    if (data === 'gradient') {
        modalTitle.innerHTML = 'вы нашли <br> конструктор впечатлений'
        modalText.innerHTML = 'эта функция VK Клипов позволяет <br> управлять своей лентой <br> коротких видео и смотреть <br> то, что хочется прямо сейчас'
        modalIcon.setAttribute('src', gradient)
        modalButton.innerHTML = 'играть дальше'
    } else if (data === 'zalip' && step > 0) {
        modal.classList.add('modal_second')
        modalTitle.innerHTML = 'когда хочется залипнуть'
        modalText.innerHTML = 'конструктор впечатлений <br> поможет найти больше <br> расслабляющих видео'
        modalIcon.setAttribute('src', zalip)
        modalButton.innerHTML = 'супер'
    } else if (data === 'surprised' && step > 0) {
        modal.classList.add('modal_second')
        modalTitle.innerHTML = 'когда хочется удивиться'
        modalText.innerHTML = 'найдите больше поразительных <br> видео с помощью <br> конструктора впечатлений'
        modalIcon.setAttribute('src', surprised)
        modalButton.innerHTML = 'кайф'
    } else if (data === 'book' && step > 0) {
        modal.classList.add('modal_second')
        modalTitle.innerHTML = 'когда хочется научиться'
        modalText.innerHTML = 'используйте эту настройку <br> в конструкторе впечатлений, <br> чтобы узнать что-то новенькое'
        modalIcon.setAttribute('src', book)
        modalButton.innerHTML = 'класс'
    }
}

function loadEnd() {
        smoothEnd(game)
        setTimeout(() => {
            game.remove()
            end.classList.remove('none')
            end.classList.add('flex')
            smoothStart(end)
    
        }, 1000)
}

function smoothStart(element) {
    element.classList.add('smooth-start')
}
function smoothEnd(element) {
    element.classList.add('smooth-end')
}
function removeChosen() {
    document.querySelectorAll('.chosen').forEach((item) => {
        setTimeout(() => {
            item.classList.remove('chosen')
        }, 500)
    })
}
let step = 0
introFirstBtn.addEventListener('click', () => {
    smoothEnd(introFisrt)
    setTimeout(() => {
        introFisrt.classList.remove('flex')
        introFisrt.classList.add('none')
        introSecond.classList.remove('none')
        introSecond.classList.add('flex')
    }, 1000)
    smoothStart(introSecond)
    introSecondBtn.addEventListener('click', () => {
        smoothEnd(intro)
        setTimeout(() => {
            intro.remove()
            renderItems(stroke1)
            renderItems(stroke2)
            renderItems(stroke3)
            game.classList.remove('none')
            smoothStart(game)
        }, 1000)
    })
})

let topCor = [
    15.7,
    31.68,
    47.66,
]
let leftCor = [
    10.6,
    26.58,
    42.56,
    58.54,
    74.52,
]
let back = [
    `./images/game/informed.png` ,
    `./images/game/gradient.png` ,
    `./images/game/book.png` ,
    `./images/game/magic.png` ,
    `./images/game/surprised.png` ,
    `./images/game/zalip.png` ,
]
let modalIcons = [
    `./images/modal/gradient.png` ,
    `./images/modal/book.png` ,
    `./images/modal/surprised.png` ,
    `./images/modal/zalip.png` ,
]
let gradient = modalIcons[0]
let book = modalIcons[1]
let surprised = modalIcons[2]
let zalip = modalIcons[3]

let stroke1 = ['informed', 'zalip', 'zalip', 'magic', 'surprised']
let stroke2 = ['zalip', 'gradient', 'gradient', 'gradient', 'book']
let stroke3 = ['informed', 'surprised', 'magic', 'zalip', 'book']


function renderItems(arr) {
    arr.forEach((item, index) => {
        let div = document.createElement('div')
        div.classList.add('item')
        div.style.backgroundImage = `url(./images/game/${item}.png)`
        div.setAttribute('number', index+1)
        div.setAttribute('data-item', item)
        div.setAttribute('stroke', arr === stroke1 ? 1 : arr === stroke2 ? 2 : 3)
        div.style.top = (arr === stroke1 ? topCor[0] : arr === stroke2 ? topCor[1] : topCor[2]) + 'vw'
        div.style.left = leftCor[index] + 'vw'
        game.prepend(div)
    })
}
function moveItems() {
    let stroke = currentStroke[0]
    let data = currentData[0]
    let numbers = []

    document.querySelectorAll('.item').forEach((item) => {
        let itemStroke = item.getAttribute('stroke')
        let itemData = item.getAttribute('data-item')
        if (itemStroke === stroke && itemData === data) {
            smoothEnd(item)
            setTimeout(() => {
                item.remove()
            }, 500);
            left = item.getBoundingClientRect().left
            numbers.push(item.getAttribute('number'))
        }
    })

    numbers.reverse()

    document.querySelectorAll('.item').forEach((item) => {
        if (+item.getAttribute('stroke') === (stroke - 1) && item.getAttribute('number') === numbers[0]) {
            item.style.top = topCor[1] + 'vw'
            item.setAttribute('stroke', stroke)
        } else if (+item.getAttribute('stroke') === (stroke - 1) && item.getAttribute('number') === numbers[1]) {
            item.style.top = topCor[1] + 'vw'
            item.setAttribute('stroke', stroke)
        } else if (+item.getAttribute('stroke') === (stroke - 1) && item.getAttribute('number') === numbers[2]) {
            item.style.top = topCor[1] + 'vw'
            item.setAttribute('stroke', stroke)
        }
    })

    setTimeout(() => {
        document.querySelectorAll('.item').forEach((item) => {
            if (+item.getAttribute('stroke') === 1) {
                item.remove()
            }
        })
        changeStroke(stroke, data)
        step++

    }, 1000)
}
function changeStroke(stroke, data) {
    if (step === 0 && +stroke === 2) {
        stroke1 = ['informed', 'book', 'surprised', 'surprised', 'surprised']
    } else if (step === 1 && +stroke === 2) {
        stroke1 = ['magic', 'book', 'surprised', 'surprised', 'surprised']
    } else if (step === 1 && +stroke === 1) {
        stroke1 = ['informed', 'book', 'book', 'book', 'magic']
    } else if (step === 2 && +stroke === 2) {
        stroke1 = ['magic', 'book', 'book', 'book', 'magic']
    }
    renderModal(data)
    renderItems(stroke1)
}

function checkStroke() {
    return (currentStroke[0] === currentStroke[1] && currentStroke[1] === currentStroke[2] && currentStroke[0] === currentStroke[2]) 
}
function checkData() {
    return (currentData[0] === currentData[1] && currentData[1] === currentData[2] && currentData[0] === currentData[2]) 
}

function checkForMatch() {
    if (checkData() && checkStroke()) {
        moveItems()
    }

    currentStroke = []
    currentData = []
}

let currentData = []
let currentStroke = []
let i = 0

function checkIsItem(item) {
    let data = item.getAttribute('data-item')
    let stroke = item.getAttribute('stroke')
    if (!item.classList.contains('chosen')) {
        item.classList.add('chosen')
        currentData.push(data)
        currentStroke.push(stroke)
        i++
    }
    if (i === 3) {
        checkForMatch()
        removeChosen()
        i = 0
    }
}

window.addEventListener('click', e => {
    if (e.target.classList.contains('item')) {
        checkIsItem(e.target)
    }
})
