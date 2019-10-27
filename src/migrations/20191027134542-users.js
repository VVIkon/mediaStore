
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            departmentId: {
                type: Sequelize.INTEGER(),
                field: 'department_id',
                allowNull: false,
            },
            storePointSet: {
                type: Sequelize.INTEGER(),
                field: 'store_point_set',
                allowNull: false,
            },
            userName: {
                type: Sequelize.STRING(255),
                field: 'user_name',
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                field: 'email',
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING(100),
                field: 'phone',
                allowNull: true,
            },
            mobile: {
                type: Sequelize.STRING(100),
                field: 'mobile',
                allowNull: true,
            },
            userLogin: {
                type: Sequelize.STRING(50),
                field: 'user_login',
                allowNull: true,
            },
            userPassword: {
                type: Sequelize.STRING(512),
                field: 'user_password',
                allowNull: true,
            },
            token: {
                type: Sequelize.STRING(512),
                field: 'user_token',
                allowNull: true,
            },
            salt: {
                type: Sequelize.BIGINT,
                field: 'user_salt',
                defaultValue: 0,
            },
            tokenExpare: {
                type: Sequelize.BIGINT,
                field: 'token_expare',
                allowNull: true,
            },
            permitionGroupSet: {
                type: Sequelize.STRING(255),
                field: 'permission_group_set',
                defaultValue: 0,
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
        await queryInterface.addIndex('users', { name: 'idx_store_point_set', fields: ['store_point_set'] })
        await queryInterface.addIndex('users', { name: 'idx_user_name', fields: ['user_name'] })
        await queryInterface.addIndex('users', { name: 'idx_user_login', fields: ['user_login'] })
        await queryInterface.addIndex('users', { name: 'idx_user_token', fields: ['user_token'] })
        await queryInterface.addIndex('users', { name: 'idx_permission_group_set', fields: ['permission_group_set'] })
        await queryInterface.addIndex('users', { name: 'idx_deleted_at', fields: ['deleted_at'] })
    },

    down: async (queryInterface) => {
        await queryInterface.removeIndex('users', 'idx_store_point_set')
        await queryInterface.removeIndex('users', 'idx_user_name')
        await queryInterface.removeIndex('users', 'idx_user_login')
        await queryInterface.removeIndex('users', 'idx_user_token')
        await queryInterface.removeIndex('users', 'idx_permission_group_set')
        await queryInterface.removeIndex('users', 'idx_deleted_at')
        await queryInterface.dropTable('users')
    },
}
