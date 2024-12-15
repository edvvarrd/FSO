const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('tokens', {
			session: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
			created_at: DataTypes.DATE,
			updated_at: DataTypes.DATE,
		})
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('tokens')
	},
}
