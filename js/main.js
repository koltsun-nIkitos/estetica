const menuElem = document.querySelector('.nav-menu');
const menuItems = menuElem.querySelectorAll('.nav-link:not(.nav-link-booking)');

menuItems.forEach((item) => {

    let activeItem;

    item.addEventListener('mouseover', (evt)=>{
        item.classList.add('nav-link-active');
    });

    item.addEventListener('mouseout', (evt)=>{
        activeItem = menuElem.querySelector('.nav-link-active');
        if (item !== activeItem){
            item.classList.remove('nav-link-active');
        }
    });

    
});

// МЕНЮ
const menuBtn = document.querySelector('.button-close');
const menu = document.querySelector('.burger-menu');

menuBtn.addEventListener('click', (evt)=>{
    evt.preventDefault();
    menu.classList.toggle('burger-menu--active');
    document.body.classList.toggle('body--fixed');
    menuBtn.classList.toggle('button-close--active');

    menu.addEventListener('click', (evt)=>{
        const target = evt.target;
        if (target.classList.contains('nav-link')){
            document.body.classList.remove('body--fixed');
            menu.classList.remove('burger-menu--active');
            menuBtn.classList.remove('button-close--active');
        }

    })
})

// text 
const allTextParagraphs = document.querySelectorAll('.section__text');
const forbiddenWords = ['и', 'в', 'на', 'от', 'из', 'с']


// console.log(allTextParagraphs);
