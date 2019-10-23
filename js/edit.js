;(function(){
    'use strict'

// Запрашиваем order по его id
    const orderId = getId()
    const order = Model.getOrderById(orderId)

    // Задаем место где, и что должно быть отрисовано

    View.updateEditionCard(document.body, order)

    View.dispatch = (element, event) => {
       const updateData = View.getEditionData(document.body)
       const result = Model.updateOrder(orderId, updateData)
        
       if (!result) {
           alert('Что то пошло не так!')
       }
       else {
            location.replace('02-crm-all-bids.html')
       }
    }
 
   
    // const Edit = {}
    // Функция извлечения номера id из строки навигации
        function getId () {
            if(location.search.includes('?') && location.search.includes('id=')) {
                const idArray = location.search.slice(1).split('=')
                const index = idArray.indexOf('id')
    
                return parseInt(idArray[index + 1])
            }
        }
    
        const idNumber = getId()
        console.log(idNumber)


    // window.Edit = Edit

})();


