;(function(){
    'use strict'


const filters = {
    product: false,
    status: false
}

// Вызываем runFilter
runFilter()
 console.log(Model.getOrders())

document
    .querySelector('[data-filter-product]')
    .addEventListener('change', function (event) {
    
        // if(!this.value) {
        //     filters.product = false
        // }
        // else {
        //     filters.product = this.value
        // }

        // filters.product = this.value ? this.value : false

        filters.product = this.value || false

        runFilter()
})

document
    .querySelectorAll('[data-filter-status] > a')
    .forEach( element => element.addEventListener('click', function (event) {
        event.preventDefault()

        switch (this.textContent) {
            case "Все":
                filters.status = false
                break
            case "Новые":
                filters.status = 'Новая'
                break

            case "В работе":
                filters.status = "В работе"
                break

            case "Завершенные":
                filters.status = "Завершена"
                break

            case "Архив":
                filters.status = "Архив"
                break

            default:
                filters.status = false
        }

        runFilter()
    }))
    
    document
            .querySelectorAll('[data-filter-left]>li>a')
            .forEach(element => element.addEventListener('click', function(event){
                            event.preventDefault()

                switch (this.textContent) {
                        case "Все вместе":
                            filters.status = false
                            console.log(this.textContent)
                            break
                        case "Новые":
                            filters.status = 'Новая'
                            console.log(this.textContent)
                            break
                    
                        case "В работе":
                            filters.status = "В работе"
                            console.log(this.textContent)
                            break
                    
                        case "Завершенные":
                            filters.status = "Завершена"
                            break
                    
                        case "Архив":
                            filters.status = "Архив"
                            break
                    
                        default:
                            filters.status = false
                }
                    
                runFilter()
            }))


// Функция фильтрации 

function runFilter () {
    let ordersAll = Model.getOrders()
        // console.log(orders)
        let orders = []
    
        if (filters.status === 'Архив' ){
            const newOrders = []
    
            for(const order of ordersAll) {
                if(order.status === filters.status) {
                    newOrders.push(order)
                }
            }
            orders = newOrders
        }

    for(const order of ordersAll){
        if(order.status !== 'Архив') {
            orders.push(order)
        }
    }

    
        
    if (filters.product ){
        const newOrders = []

        for(const order of orders) {
            if(order.product === filters.product) {
                newOrders.push(order)
            }
        }
        orders = newOrders
    }

    if (filters.status ){
        const newOrders = []

        for(const order of orders) {
            if(order.status === filters.status) {
                newOrders.push(order)
            }
        }
        orders = newOrders
    }

 // Генерируем таблицу на основе заказов из базы данных
    const table = View.generateTable(orders)

// вставляем сгенерированную таблицу div в crm-all-bids.html
     const tablePlace = document.querySelector('[data-tableplace]')
     // Очищаем место монтирования перед вставкой
     tablePlace.innerHTML = ''
     tablePlace.append(table)
}

})();
