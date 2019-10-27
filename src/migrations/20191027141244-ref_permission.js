
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ref_permissions', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            tag: {
                type: Sequelize.STRING(50),
                field: 'tag',
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(255),
                field: 'description',
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
        await queryInterface.addIndex('ref_permissions', { name: 'idx_tag', fields: ['tag'] })
        await queryInterface.addIndex('ref_permissions', { name: 'idx_deleted_at', fields: ['deleted_at'] })
    },

    down: async (queryInterface) => {
        await queryInterface.removeIndex('ref_permissions', 'idx_tag')
        await queryInterface.removeIndex('ref_permissions', 'idx_deleted_at')
        await queryInterface.dropTable('ref_permissions')
    },
}
