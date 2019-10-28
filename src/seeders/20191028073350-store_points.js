

const tableName = 'store_points'
const dd = Math.floor(Date.now() / 1000)

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(tableName, [
            { parent_id: null, department_id: 1, point_name: 'ВШЭ', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 1, department_id: 1, point_name: 'Хранилище кафедры математики', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 2, department_id: 1, point_name: 'Приказы', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 2, department_id: 1, point_name: 'Заявления', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 2, department_id: 1, point_name: 'Общие доки', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 1, department_id: 2, point_name: 'Хранилище кафедры Физики', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 6, department_id: 2, point_name: 'Приказы', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 6, department_id: 2, point_name: 'Заявления', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 6, department_id: 2, point_name: 'Общие доки', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 1, department_id: 3, point_name: 'Хранилище кафедры Экономики', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 10, department_id: 3, point_name: 'Приказы', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 10, department_id: 3, point_name: 'Заявления', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 10, department_id: 3, point_name: 'Общие доки', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 1, department_id: 4, point_name: 'Хранилище кафедры Программирования', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 14, department_id: 4, point_name: 'Приказы', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 14, department_id: 4, point_name: 'Заявления', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 14, department_id: 4, point_name: 'Общие доки', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 1, department_id: 5, point_name: 'Хранилище кафедры Электроники', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 18, department_id: 5, point_name: 'Приказы', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 18, department_id: 5, point_name: 'Заявления', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
            { parent_id: 18, department_id: 5, point_name: 'Общие доки', permission_group_set: '[]', deleted_at: 0, created_at: dd, updated_at: dd },
        ], {})
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete(tableName, null, {})
    },
}
