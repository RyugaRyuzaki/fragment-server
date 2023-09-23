import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("mydb", "root", "root", {
	host: "localhost",
	dialect: "postgres",
});

const PgFileModel = sequelize.define("PgFileModel", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	filename: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	fileID: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
const PgMetaModel = sequelize.define("PgMetaModel", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	fileID: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	expressID: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	metaData: {
		type: DataTypes.JSON,
		allowNull: true,
	},
});

(async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({ force: true });
		console.log("PostgreSQL connected successfully");
	} catch (error) {
		console.error("Error connecting to PostgreSQL:", error);
	}
})();
export { PgFileModel, PgMetaModel };
