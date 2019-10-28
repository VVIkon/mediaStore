
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('store_points', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            parentId: {
                type: Sequelize.INTEGER,
                field: 'parent_id',
                allowNull: true,
                references: { model: 'store_points', key: 'id' },
            },
            departmentId: {
                type: Sequelize.INTEGER(),
                field: 'department_id',
                allowNull: false,
                references: { model: 'departments', key: 'id' },
            },
            pointName: {
                type: Sequelize.STRING(255),
                field: 'point_name',
                allowNull: false,
            },
            permissionGroupSet: {
                type: Sequelize.STRING(255),
                field: 'permission_group_set',
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
        await queryInterface.addIndex('store_points', { name: 'idx_store_point_point_name', fields: ['point_name'] })
        await queryInterface.addIndex('store_points', { name: 'idx_store_point_deleted_at', fields: ['deleted_at'] })
    },

    down: async (queryInterface) => {
        await queryInterface.removeIndex('store_points', 'idx_store_point_point_name')
        await queryInterface.removeIndex('store_points', 'idx_store_point_deleted_at')
        await queryInterface.dropTable('store_points')
    },
}
