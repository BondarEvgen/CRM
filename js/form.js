;(function(){
    'use strict'

    const newOrder = {
        id: null,
        date: Date.now() ,
        product: "",
        name: "",
        email: "",
        phone: "",
        status: "Новая"
    }

    const formButton = document.querySelector('[data-form-button-order]')

    const orders = Model.getOrders()

const maxIdResult = getMaxOrder(orders)

    function getMaxOrder (orders) {
        let maxId = null
        for (const order of orders) {
            if(order.id > maxId){

                maxId = order.id
            }
        }
        return maxId
    }

    console.log(orders)
    

    formButton.addEventListener('click', function(event){
        event.preventDefault()

        newOrder.id = maxIdResult + 1
        newOrder.name = document.querySelector('[data-form-name]').value
        newOrder.product = document.querySelector('[data-form-product]').value
        newOrder.email = document.querySelector('[data-form-email]').value
        newOrder.phone = document.querySelector('[data-form-phone]').value
        newOrder.name = document.querySelector('[data-form-name]').value
        
        Model.addOrder (newOrder)
    })


})();