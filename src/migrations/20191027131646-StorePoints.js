
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('store_point', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            parentId: {
                type: Sequelize.INTEGER,
                field: 'parent_id',
                allowNull: false,
            },
            pointName: {
                type: Sequelize.STRING(255),
                field: 'point_name',
                allowNull: false,
            },
            permissionGroupSet: {
                type: Sequelize.STRING(255),
                field: 'permition_group_set',
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
        await queryInterface.addIndex('store_point', { name: 'idx_point_name', fields: ['point_name'] })
        await queryInterface.addIndex('store_point', { name: 'idx_deleted_at', fields: ['deleted_at'] })
    },

    down: async (queryInterface) => {
        await queryInterface.removeIndex('store_point', 'idx_point_name')
        await queryInterface.removeIndex('store_point', 'idx_deleted_at')
        await queryInterface.dropTable('store_point')
    },
}
