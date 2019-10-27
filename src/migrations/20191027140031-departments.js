
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('departments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            storePointId: {
                type: Sequelize.INTEGER(),
                field: 'store_point_id',
                allowNull: false,
            },
            nameDepartment: {
                type: Sequelize.STRING(255),
                field: 'store_point_set',
                allowNull: false,
            },
            deletedAt: {
                type: Sequelize.INTEGER,
                field: 'deleted_at',
                allowNull: false,
                defaultValue: 0,
            },
            updatedAt: {
                type: Sequelize.INTEGER,
                field: 'updated_at',
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.INTEGER,
                field: 'created_at',
                allowNull: false,
            },
        })
        await queryInterface.addIndex('departments', { name: 'idx_store_point_set', fields: ['store_point_set'] })
        await queryInterface.addIndex('departments', { name: 'idx_deleted_at', fields: ['deleted_at'] })
    },

    down: async (queryInterface) => {
        await queryInterface.removeIndex('departments', 'idx_store_point_set')
        await queryInterface.removeIndex('departments', 'idx_deleted_at')
        await queryInterface.dropTable('departments')
    },
}
