
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('cross_store_selectors', {
            storePointId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'store_point_id',
                references: { model: 'store_points', key: 'id' },
            },
            fileId: {
                type: Sequelize.INTEGER(),
                primaryKey: true,
                field: 'file_id',
                references: { model: 'files', key: 'id' },
            },
            permissionType: {
                type: Sequelize.STRING(2),
                field: 'permission_type',
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
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('cross_store_selectors')
    },
}
