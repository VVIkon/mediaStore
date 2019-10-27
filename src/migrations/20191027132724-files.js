
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('files', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fileRef: {
                type: Sequelize.STRING(255),
                field: 'file_ref',
                allowNull: false,
            },
            fileName: {
                type: Sequelize.STRING(255),
                field: 'file_name',
                allowNull: false,
            },
            fileExt: {
                type: Sequelize.STRING(15),
                field: 'file_ext',
                allowNull: false,
            },
            fileTypeId: {
                type: Sequelize.INTEGER(),
                field: 'file_type_id',
                allowNull: false,
            },
            fileSize: {
                type: Sequelize.INTEGER(),
                field: 'file_size',
                allowNull: false,
            },
            tags: {
                type: Sequelize.STRING(255),
                field: 'tags',
                allowNull: false,
            },
            refSet: {
                type: Sequelize.STRING(255),
                field: 'ref_set',
                allowNull: false,
            },
            keyWords: {
                type: Sequelize.STRING(255),
                field: 'key_words',
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
        await queryInterface.addIndex('files', { name: 'idx_file_ref', fields: ['file_ref'] })
        await queryInterface.addIndex('files', { name: 'idx_file_name', fields: ['file_name'] })
        await queryInterface.addIndex('files', { name: 'idx_tags', fields: ['tags'] })
        await queryInterface.addIndex('files', { name: 'idx_ref_set', fields: ['ref_set'] })
        await queryInterface.addIndex('files', { name: 'idx_key_words', fields: ['key_words'] })
        await queryInterface.addIndex('files', { name: 'idx_deleted_at', fields: ['deleted_at'] })
    },

    down: async (queryInterface) => {
        await queryInterface.removeIndex('files', 'idx_file_ref')
        await queryInterface.removeIndex('files', 'idx_file_name')
        await queryInterface.removeIndex('files', 'idx_tags')
        await queryInterface.removeIndex('files', 'idx_ref_set')
        await queryInterface.removeIndex('files', 'idx_key_words')
        await queryInterface.removeIndex('files', 'idx_deleted_at')
        await queryInterface.dropTable('files')
    },
}
