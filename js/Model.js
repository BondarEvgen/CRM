;
(function () {
    'use strict'

    // База данных

    const database = {
        orders: [{
                id: 1,
                date: Date.now() - 1000 * 60 * 60 * 24 * 3,
                product: "Курс по верстке",
                name: "Юрий",
                email: "info@rightblog.ru",
                phone: "+7 (909) 77-55-777",
                status: "Новая"
            },
            {
                id: 2,
                date: Date.now() - 1000 * 60 * 60 * 24 * 2,
                product: "Курс по JavaScript",
                name: "Сергей",
                email: "kurpatov@rightblog.ru",
                phone: "+7 (909) 65-40-882",
                status: "В работе"
            },
            {
                id: 3,
                date: Date.now(),
                product: "Курс по VUE JS",
                name: "Дмитрий",
                email: "labochevskiy@gmail.com",
                phone: "+7 (909) 45-20-555",
                status: "Завершена"
            },
            {
                id: 4,
                date: Date.now(),
                product: "Курс по VUE JS",
                name: "Лаврентий",
                email: "amerbecov@gmail.com",
                phone: "+7 (909) 20-20-565",
                status: "Архив"
            },
            {
                id: 5,
                date: Date.now(),
                product: "Курс по VUE JS",
                name:"Геннадий",
                email: "aabramovich@gmail.com",
                phone: "+7 (909) 23-40-265",
                status: "Архив"
            }
        ]
    }

    
    // Вызов функции извлечения данных из LocalStorage
    // Вызов функции сохранения данных в LocalStorage
    save()
    load()
   
    
    

    const Model = {}

    // Возвращает копию базы данных

    Model.getOrders = function getOrders() {
        
        return JSON.parse(JSON.stringify(database.orders))
    }

    Model.getOrderById = function getOrderById(id) {
        for (const order of database.orders) {
            if (order.id === id) {
                return JSON.parse(JSON.stringify(order))
            }
        }
    }
    // редактируем базу данных
    Model.updateOrder = function updateOrder(orderId, updateData) {

        for (const item of database.orders) {
            if (item.id === orderId) {
                item.product = updateData.product
                item.name = updateData.name
                item.email = updateData.email
                item.phone = updateData.phone
                item.status = updateData.status
                save()
                return true
            }
        }
        return false
    }
    // Сохраняем заказ в базу данных
    Model.addOrder = function addOrder (order) {

        
        database.orders.push(order)
        save()

        console.log(database.orders)
    }

    window.Model = Model

    // Сохраняем данные в  LocalStorage

    function save() {
        localStorage.setItem('crm', JSON.stringify(database))
    }

    // Извлекаем данные из LocalStorage

    function load() {
        if (localStorage.getItem('crm')) {
            const data = JSON.parse(localStorage.getItem('crm'))
            Object.assign(database, data)
        }
    }

})();