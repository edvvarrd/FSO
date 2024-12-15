const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Token extends Model {}

Token.init(
	{
		session: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: true,
		modelName: 'token',
	}
)

module.exports = Token
