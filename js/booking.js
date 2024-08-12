const groupButtons = document.querySelectorAll('booking__button');

const master = document.getElementById('form_master');
const category = document.getElementById('form_category');
const service = document.getElementById('form_service');


master.addEventListener('change', (evt)=>{
    category.selectedIndex = 0;
    service.selectedIndex = 0;

    category.disabled = true;
    service.disabled = true;
    
    const categoryItems = document.querySelectorAll('.category__item');
    categoryItems.forEach((item) => {
        item.classList.remove('category__item--hidden');
    })


    if (master.value !== 'not_select'){
        
        categoryItems.forEach((item) =>{
            const masterData = item.dataset.master;
            if (masterData !== master.value){
                item.classList.add('category__item--hidden');
            }
        })

        category.disabled = false;
    }

    cheekForm([service, master, category]);
})


category.addEventListener('change', (evt)=>{
    service.selectedIndex = 0;
    service.disabled = true;

    const serviceItems = document.querySelectorAll('.service__item:not([data-category="category0"])');
    
    serviceItems.forEach((item) => {
        item.classList.remove('service__item--hidden');
    });


    if (category.value !== 'not_select'){
        serviceItems.forEach((service) =>{
            const categoryData = service.dataset.category;
            if (categoryData !== category.value){
                service.classList.add('service__item--hidden');
            }

        });
        
        service.disabled = false;
    }

    cheekForm([service, master, category]);
})

service.addEventListener('change', (evt)=>{
    cheekForm([service, master, category]);
})


const cheekForm = function(inputs){
    let buttonNext = document.querySelector('.booking__section--active .booking__button__next');
    let valide = true;

    inputs.forEach((input) => {
        if ((input.value == 'not_select') || (input.value == "")){
            valide = false;
        }
    });

    if (valide == true){
        buttonNext.classList.remove('booking__button--disabled');
        buttonNext.disabled = false;
    }else{
        buttonNext.classList.add('booking__button--disabled');
        buttonNext.disabled = true;
    }
}

const allButtonsNext = document.querySelectorAll('.booking__section .booking__button__next');
allButtonsNext.forEach((button) => {
    button.addEventListener('click', (evt)=>{
        evt.preventDefault();
        const numberButton = button.dataset.booking;
        const bookingColumnElems = document.querySelectorAll('.booking__column .booking__button');
        
        bookingColumnElems.forEach((bookingElem) => {
            bookingElem.classList.remove('booking__button--active');
            if (bookingElem.dataset.booking === numberButton){
                bookingElem.classList.add('booking__button--active');
            }
        })

        let bookingSectionActive = document.querySelector('.booking__section--active');
        bookingSectionActive.classList.remove('booking__section--active');
        bookingSectionActive = document.getElementById(numberButton);
        bookingSectionActive.classList.add('booking__section--active');

    })
});


// TIMES 

const times = document.querySelectorAll('.times .time[data-availible="true"]');
times.forEach((time) =>{
    time.addEventListener('click', (evt)=>{
        const selectTime = document.querySelector('.time.time--select');
        if (selectTime){
            selectTime.classList.remove('time--select');
            time.classList.add('time--select');
        }else{
            time.classList.add('time--select');
        }
        const formTime = document.getElementById('form__time');
        const selectElem = document.querySelector('.time--select');
        let stringFromElem = selectElem.textContent.split(' - ')[0];
        if (stringFromElem.length < 5){
            stringFromElem = "0"+stringFromElem;
        }
        formTime.value = stringFromElem;

        cheekForm([formTime]);
    })
})

// infoAboutClient
const formName = document.getElementById('form__name');
const formTel = document.getElementById('form__tel');




formName.addEventListener('input', ()=>{
    cheekForm([formName, formTel]);
})


formTel.addEventListener('input', ()=>{
    if (formTel.value.length >= 10 && formName.value.length >= 2){
        cheekForm([formName, formTel]);
    }else{
        let buttonNext = document.querySelector('.booking__section--active .booking__button__next');
        buttonNext.classList.add('booking__button--disabled');
        buttonNext.disabled = true;
    }
})


const finishedButton = document.querySelector('button[data-booking="booking5"]');
finishedButton.addEventListener('click', ()=>{
    let report = {};
    report.master = master.value;
    report.category = category.value;
    report.service = service.value;

    const date = document.querySelector('#celender__date').value;
    report.date = date;
    const time = document.querySelector('#form__time').value;
    report.time = time;
    report.name = formName.value;
    report.tel = formTel.value;


    console.log(report);
})


