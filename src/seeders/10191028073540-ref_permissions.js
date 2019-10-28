const tableName = 'ref_permissions'
const dd = Math.floor(Date.now() / 1000)

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(tableName, [
            { 'tag': 'point10', 'description': 'Access to store point', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'tag': 'point20', 'description': 'Access to store point', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'tag': 'point30', 'description': 'Access to store point', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'tag': 'point40', 'description': 'Access to store point', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'tag': 'point50', 'description': 'Access to store point', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
        ], {})
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete(tableName, null, {})
    },
}

