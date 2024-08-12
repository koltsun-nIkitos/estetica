const servicesCards = document.querySelectorAll('.services-cards a.card');

servicesCards.forEach((card) => {
    const dataService = card.dataset.service;

    card.addEventListener('click', (evt)=>{
        evt.preventDefault();
        const serviceContent = document.getElementById(dataService);
        const AllContentBlocks = document.querySelectorAll('.service__content');

        AllContentBlocks.forEach((block)=>{
            block.classList.remove('service__content--active');
        })

        serviceContent.classList.add('service__content--active');
        servicesCards.forEach((item) =>{
            item.classList.remove('card--active');
        })
        card.classList.add('card--active');
        
        const cardNumber = parseInt(card.dataset.service.slice(-1));
        const servicesMainBlock = document.querySelector('.services');
        if (cardNumber % 2 == 0)
            servicesMainBlock.classList.remove('services--active');
        else
            servicesMainBlock.classList.add('services--active');
        
    })
    
});

