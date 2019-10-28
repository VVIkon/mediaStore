
const tableName = 'cross_store_selectors'
const dd = Math.floor(Date.now() / 1000)

module.exports = {
    tableName: '',
    up: (queryInterface) => {
        return queryInterface.bulkInsert(tableName, [
            { store_point_id: 1, file_id: 1, permission_type: 'RW', deleted_at: 0, created_at: dd, updated_at: dd },
            { store_point_id: 1, file_id: 2, permission_type: 'RW', deleted_at: 0, created_at: dd, updated_at: dd },
            { store_point_id: 1, file_id: 3, permission_type: 'RW', deleted_at: 0, created_at: dd, updated_at: dd },
            { store_point_id: 1, file_id: 4, permission_type: 'RW', deleted_at: 0, created_at: dd, updated_at: dd },
        ], {})
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete(tableName, null, {})
    },
}
