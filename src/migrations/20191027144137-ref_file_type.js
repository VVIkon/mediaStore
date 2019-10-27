
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ref_file_types', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            fileType: {
                type: Sequelize.STRING(100),
                field: 'file_type',
                allowNull: false,
            },
            directive: {
                type: Sequelize.STRING(255),
                field: 'directive',
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
        await queryInterface.addIndex('departments', { name: 'idx_file_type', fields: ['file_type'] })
        await queryInterface.addIndex('departments', { name: 'idx_deleted_at', fields: ['deleted_at'] })
    },

    down: async (queryInterface) => {
        await queryInterface.removeIndex('departments', 'idx_file_type')
        await queryInterface.removeIndex('departments', 'idx_deleted_at')
        await queryInterface.dropTable('departments')
    },
}
