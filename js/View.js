;(function(){
    'use strict'


    const View = {
        dispatch() {}
    }

    // Задаем формат отображения даты
    const dateFormattor = new Intl.DateTimeFormat('ru')

    // Функция отправки данных из модуля View
    function dispatch (...args) {
        View.dispatch(...args)
        
        console.log(View.dispatch(...args))

    }

    // Функция генерации таблицы используя значения из базы данных

    View.generateTable = function generateTable (orders) {
        
        const tableHTML = stringToHtml(tableTemplate)
        
        for (const order of orders) {
            const trElement = document.createElement('tr')
           
            trElement.innerHTML = trTemplate
            .replace(/%ID%/g, order.id)
            .replace('%DATE%', dateFormattor.format(order.date))
            .replace('%NAME%', order.name)
            .replace('%PRODUCT%', order.product)
            .replace('%EMAIL%', order.email)
            .replace('%PHONE%', order.phone)
            .replace('%STATUS%', order.status)

            const statusElement = trElement.querySelector('[data-status]')
           
            if(statusElement.textContent === 'Новая') {
                statusElement.classList.add('badge-danger')
            }
            else if (statusElement.textContent === 'В работе' ) {
                statusElement.classList.add('badge-warning')
            }
            else if (statusElement.textContent === 'Завершена') {
                statusElement.classList.add('badge-success')

            }

            tableHTML.querySelector('tbody').append(trElement)
        }
        
        return tableHTML
    }

    // Функция изменения страници редактирования
    // с подстанрвкой значений из выбранного
    // елемента
    View.updateEditionCard = function updateEditionCard (dom, order) {
        dom.querySelector('[data-id]').textContent = order.id
        dom.querySelector('[data-datetime]').textContent = dateFormattor.format(order.date)
        dom.querySelector('[data-product]').value = order.product

        dom.querySelector('[data-name]').value = order.name
        dom.querySelector('[data-email]').value = order.email
        dom.querySelector('[data-phone]').value = order.phone
        dom.querySelector('[data-status]').value = order.status

        dom
            .querySelector('[data-button-save]')
            .addEventListener('click', function(event){
                event.preventDefault()
                dispatch(this, event)
            })
    }

    View.getEditionData = function getEditionData (dom) {
        return {
           id: parseInt(dom.querySelector('[data-id]').textContent),
           product: dom.querySelector('[data-product]').value,
           name: dom.querySelector('[data-name]').value, 
           email: dom.querySelector('[data-email]').value, 
           phone: dom.querySelector('[data-phone]').value, 
           status: dom.querySelector('[data-status]').value
        }
    }

    window.View = View

    // Функция первращения строки в HTML

    function stringToHtml (string) {
        const divElement = document.createElement('div')

        divElement.innerHTML = string
              
        return divElement.firstElementChild
    }

    const tableTemplate = `
    <table class="table fs-14">
        <thead>
            <tr>
                <th>ID</th>
                <th>дата</th>
                <th>продукт</th>
                <th>имя</th>
                <th>email</th>
                <th>телефон</th>
                <th>статус</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>

</div>
</div>`
    
    const trTemplate = `
    
        <th scope="row" data-id>%ID%</th>
        <td data-date>%DATE%</td>
        <td data-product>%PRODUCT%</td>
        <td data-name>%NAME%</td>
        <td data-email>%EMAIL%</td>
        <td data-phone>%PHONE%</td>
        <td >
            <div class="badge badge-pill" data-status>%STATUS%</div>
        </td>
        <td ><a href="03-crm-edit-bid.html?id=%ID% " data-editbutton>Редактировать</a></td>
    `
})();

