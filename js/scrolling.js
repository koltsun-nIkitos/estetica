"use strict";

const HeaderScollElems = document.querySelectorAll('a.nav-link:not(.not-scroll)');
const FooterScrollElems = document.querySelectorAll('a.footet__nav__link:not(.not-scroll)');

const appendScroll =  (link) => {
    link.addEventListener('click', (evt)=>{
        evt.preventDefault();
        const id = link.getAttribute('href').substring(1);
        const elem = document.getElementById(id);

        if (elem){
            elem.scrollIntoView(
                {
                    block: 'start',
                    behavior: 'smooth',
                }
            )
        }
        
    });
}


HeaderScollElems.forEach(link => appendScroll(link));
FooterScrollElems.forEach(link => appendScroll(link));



