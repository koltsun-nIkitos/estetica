let Calender = function(calenderDivId){
    this.divId = calenderDivId;

    this.DaysOfWeek = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
    ];

    // Месяцы начиная с января
    this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    //Устанавливаем текущий месяц, год
    let d = new Date();

    this.currMonth = d.getMonth('9');
    this.currYear = d.getFullYear('22');
    this.currDay = d.getDate('3');


    // Первый день недели в выбранном месяце 
    firstDayOfMonth = new Date(this.currYear, this.currMonth, 7).getDay()
     // Последний день выбранного месяца
    lastDateOfMonth =  new Date(this.currYear, this.currMonth+1, 0).getDate()
    // Последний день предыдущего месяца
    lastDayOfLastMonth = this.currMonth == 0 ? new Date(this.currYear-1, 11, 0).getDate() : new Date(this.currYear, this.currMonth, 0).getDate();

    
    let html = '<table class="calender__table">';

    let numDay = 1;
    let numWeek = 0;

    // заголовок дней недели
    html += '<tr class="days">';
    for(let i=0; i < this.DaysOfWeek.length;i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    // Записываем дни
    let i=1;
    do {

        let dow = new Date(this.currYear, this.currMonth, i).getDay();

        // Начать новую строку в понедельник
        if ( dow == 1 ) {
            html += '<tr>';
            numWeek += 7;
        }
        // Если первый день недели не понедельник показать последние дни предидущего месяца
        else if ( i == 1 ) {
            html += '<tr>';
            let k = lastDayOfLastMonth - firstDayOfMonth+1;

            for(let j=0; j < firstDayOfMonth; j++) {
                if(numDay % 6 == 0 || numDay % 7 == 0){
                    html += `<td class="normal normal--prev weekend">` + k + '</td>';
                }else{
                    html += `<td class="normal normal--prev">` + k + '</td>';
                }

                k++;
                numDay++;
            }
        }

        // Записываем текущий день в цикл
        let chk = new Date();
        let chkY = chk.getFullYear();
        let chkM = chk.getMonth();

        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            if(numDay % 6 == 0 || numDay % 7 == 0){
                if ( dow == 6 ) {
                    html += `<td class="today normal weekend saturday">` + i + '</td>';
                }else{
                    html += `<td class="today normal weekend sunday">` + i + '</td>';
                }
            }else{
                html += `<td class="today normal">` + i + '</td>';
            }
        } else {
            if(numDay % 6 == 0 || numDay % 7 == 0){
                if ( dow == 6 ) {
                    html += `<td class="normal weekend saturday">` + i + '</td>';
                }else{
                    html += `<td class="normal weekend sunday">` + i + '</td>';
                }
            }else{
                html += `<td class="normal">` + i + '</td>';
            }
        }

        
        numDay++;

        // закрыть строку в воскресенье
        if ( dow == 0 ) {
            html += '</tr>';
            numDay = 1;
        }
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        else if ( i == lastDateOfMonth ) {
            let k=1;
            for(dow; dow < 7; dow++) {
                if(numDay % 6 == 0 || numDay % 7 == 0){
                    if ( dow == 6 ) {
                        html += `<td class="normal normal--next weekend saturday">` + k + '</td>';
                    }else{
                        html += `<td class="normal normal--next weekend sunday">` + k + '</td>';
                    }
                }else{
                    html += `<td class="normal normal--next">` + k + '</td>';
                }
                
                k++;
                numDay++;
            }
        }

        i++;
    }while(i <= lastDateOfMonth);

    // Конец таблицы
    html += '</table>';

    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;

    this.showHeaderInfo = function(){
        const header = document.querySelector('.calender__header');
        const mounthHTML = header.querySelector('.calender__mounth');
        const yearHTML = header.querySelector('.calendar__year');

        mounthHTML.innerHTML = this.Months[this.currMonth];
        yearHTML.innerHTML = this.currYear;

    }

    this.addBooking = function(){
        const daysForBooking = document.querySelectorAll('.calender__wrapper td.normal:not(.normal--prev):not(.normal--next):not(.disabled)');
        daysForBooking.forEach((day) =>{
            let today = new Date().getDate();
            let date = parseInt(day.textContent);

            if (date > today){
                day.classList.add('normal--click');
                day.addEventListener('click', (evt)=>{
                    const selectItem = document.querySelector('.normal--select');
                    if (selectItem){
                        selectItem.classList.remove('normal--select');
                    }

                    day.classList.add('normal--select');
                    const inputData = document.getElementById('celender__date');

                    let resultString = '';
                    resultString += calender.currYear + '-';
                    
                    if ((calender.currMonth+1)<10){
                        resultString += "0"+(calender.currMonth+1)+"-";
                    }else{
                        resultString += (calender.currMonth+1)+"-";
                    }

                    if(day.textContent < 10){
                        resultString += "0"+day.textContent;
                    }else {
                        resultString += day.textContent;
                    }

                    inputData.value = resultString;
                    calender.checkCalender();
                })

            }
        })
    }

    this.checkCalender = function(){
        const input = document.getElementById('celender__date');
        const btnNext = document.querySelector('.booking__section--active .booking__button__next');

        if (input.value !== ''){
            btnNext.classList.remove('booking__button--disabled');
            btnNext.disabled = false;
        }else{
            btnNext.classList.add('booking__button--disabled');
            btnNext.disabled = true;
        }
    }
};


let calender = new Calender('calender__wrapper');
calender.showHeaderInfo();
calender.addBooking();


// console.log(calender.currDay, calender.currMonth, calender.currYear)
