document.querySelector('span.expCount').innerHTML=`${(new Date().getFullYear()-2011)}`
document.querySelector('.burger').onclick = () =>{
    document.querySelector('.burger').classList.toggle('open')
    document.querySelector('.header-top').classList.toggle('height')
}
function activityCarousel(){
    document.querySelector('.carousel-next-btn').onclick = () => {
        const imgs = document.querySelectorAll('.carousel__photo')
        let a
        imgs.forEach((img,i)=>{
            if(img.className === 'carousel__photo initial'){
                imgs[i].classList.remove('initial')
                a = i   
            };
        })
        if(a===(imgs.length-1)) imgs[0].classList.add('initial')
        else imgs[a+1].classList.add('initial')
    }
    document.querySelector('.carousel-prev-btn').onclick = () => {
        const imgs = document.querySelectorAll('.carousel__photo')
        let a
        imgs.forEach((img,i)=>{
            if(img.className === 'carousel__photo initial'){
                imgs[i].classList.remove('initial')
                a = i   
            };
        })
        if(a===0) imgs[imgs.length-1].classList.add('initial')
        else imgs[a-1].classList.add('initial')
    }
    var acCar = setInterval(()=>{
        const imgs = document.querySelectorAll('.carousel__photo')
        let a
        imgs.forEach((img,i)=>{
            if(img.className === 'carousel__photo initial'){
                imgs[i].classList.remove('initial')
                a = i   
            };
        })
        if(a==(imgs.length-1))imgs[0].classList.add('initial')
        else{ 
            if(imgs[a+1].classList != 'undefined') {
                imgs[a+1].classList.add('initial')
            }
        }
    },5000)
}
activityCarousel()

document.querySelectorAll('.header-navigation__item a').forEach(item => {
    item.onclick = () => {

        if(document.querySelector('.header-top').classList.contains('height')){
            document.querySelector('.header-top').classList.remove('height')
            document.querySelector('.burger').classList.remove('open')
        }
        document.querySelectorAll('.header-navigation__item a').forEach(i => {
            i.parentElement.classList.remove('active')
        })
        item.parentElement.classList.add('active')
    }
})

function carouselEffect(){
    const track = document.querySelector('.works_items')

    const slides = Array.from(track.children)

    const nextBtn = document.querySelector('.works-navigation__next')
    const prevBtn = document.querySelector('.works-navigation__prev')

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth*index +'px'
    }
    const slideWidth = slides[0].getBoundingClientRect().width
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-'+ targetSlide.style.left +')'
        currentSlide.classList.remove('current-slide')
        targetSlide.classList.add('current-slide')
    }

    slides.forEach(setSlidePosition)
    nextBtn.addEventListener('click', e => {
        prevBtn.classList.remove('noUseable')
        const currentSlide = track.querySelector('.current-slide')
        const nextSlide = currentSlide.nextElementSibling
        if(nextSlide) {
            moveToSlide(track, currentSlide, nextSlide)
            if(!nextSlide.nextElementSibling) nextBtn.classList.add('noUseable')
        }
    })

    prevBtn.addEventListener('click', e => {
        nextBtn.classList.remove('noUseable')
        const currentSlide = track.querySelector('.current-slide')
        const prevSlide = currentSlide.previousElementSibling
        if(prevSlide){
            moveToSlide(track, currentSlide, prevSlide)
            if(!prevSlide.previousElementSibling)prevBtn.classList.add('noUseable')
        }
    })
}
carouselEffect()

document.querySelector('.contact button').onclick = () => {
    let i = 0
    document.querySelectorAll('.contact input').forEach(item => {
        if(!item.value){
            i++;
            item.style.border = '1px solid red'
        }
    })
    if(!document.querySelector('.contact textarea').value) i++
    if(i==0){
        fetch('/api/message/createMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.querySelector('.contact input#name').value,
                phone: document.querySelector('.contact input#phone').value,
                email: document.querySelector('.contact input#email').value,
                message: document.querySelector('.contact textarea').value
            })
        })
        .then(res => res.json())
        .then(
                document.querySelector('.contact input#name').value='', 
                document.querySelector('.contact input#phone').value='',
                document.querySelector('.contact input#email').value='',
                document.querySelector('.contact textarea').value=''
            )
    }else alert('Majburiy malumotlar kiritilmadi')
}