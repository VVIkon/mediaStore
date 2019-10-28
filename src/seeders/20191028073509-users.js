
const tableName = 'users'
const dd = Math.floor(Date.now() / 1000)

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(tableName, [
            { department_id: 1, store_point_set: '[]', user_name: 'Иконников', login: 'vvikon', password: '123', token: '', salt: '', token_expare: 0, permission_group_set: '[]', email: 'name@mail.ru', phone: '75555555555', mobile: '75555555555', deleted_at: 0, created_at: dd, updated_at: dd },
            { department_id: 2, store_point_set: '[]', user_name: 'Петров', login: 'petr', password: '123', token: '', salt: '', token_expare: 0, permission_group_set: '[]', email: 'name@mail.ru', phone: '75555555555', mobile: '75555555555', deleted_at: 0, created_at: dd, updated_at: dd },
            { department_id: 3, store_point_set: '[]', user_name: 'Сидоров', login: 'sidor', password: '123', token: '', salt: '', token_expare: 0, permission_group_set: '[]', email: 'name@mail.ru', phone: '75555555555', mobile: '75555555555', deleted_at: 0, created_at: dd, updated_at: dd },
            { department_id: 4, store_point_set: '[]', user_name: 'Иванов', login: 'ivan', password: '123', token: '', salt: '', token_expare: 0, permission_group_set: '[]', email: 'name@mail.ru', phone: '75555555555', mobile: '75555555555', deleted_at: 0, created_at: dd, updated_at: dd },
            { department_id: 5, store_point_set: '[]', user_name: 'Козлов', login: 'kozel', password: '123', token: '', salt: '', token_expare: 0, permission_group_set: '[]', email: 'name@mail.ru', phone: '75555555555', mobile: '75555555555', deleted_at: 0, created_at: dd, updated_at: dd },
        ], {})
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete(tableName, null, {})
    },
}


