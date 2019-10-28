
const tableName = 'departments'
const dd = Math.floor(Date.now() / 1000)

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(tableName, [
            { 'name_department': 'Кафедра Математики', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'name_department': 'Кафедра Физики', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'name_department': 'Кафедра Экономики', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'name_department': 'Кафедра Программирования', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'name_department': 'Кафедра Электроники', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
        ], {})
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete(tableName, null, {})
    },
}

