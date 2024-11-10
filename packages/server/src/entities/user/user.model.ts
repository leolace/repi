import { IUser } from "common";
import { dbClient } from "../../db-client";

class UserModel {
	async findAll() {
		const res = await dbClient.query<IUser>(
			`SELECT name, email, class, id FROM "user";`,
		);

		return res.rows;
	}

	async findBy(values: Partial<IUser>) {
		const searchedValues = Object.keys(values)
			.map((key, index) => {
				return `${key}=$${index + 1}`;
			})
			.join(" AND ");

		const query = `SELECT (email, class, id) FROM "user" WHERE ${searchedValues}`;
		const res = await dbClient.query<IUser>(query, Object.values(values));

		return res.rows;
	}

}

export const userModel = new UserModel();
