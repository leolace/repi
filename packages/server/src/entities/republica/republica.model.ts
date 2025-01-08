import { dbClient } from "@db-client";
import { CreateRepublicaDto } from "./republica.dto";
import { v4 as uuid } from "uuid";
import { RawRepublica, RawRepublicaEdit } from "./republica.types";
import { unRawRepublicaData } from "./republica.utils";

class RepublicaModel {
  async find(id: string) {
    const { rows } = await dbClient.query<RawRepublica>(
      "SELECT * FROM republicas WHERE id = $1",
      [id]
    );

    return unRawRepublicaData(rows[0]);
  }

  async findByUser(userId: string) {
    const { rows } = await dbClient.query<RawRepublica>(
      "SELECT * FROM republicas WHERE user_id = $1",
      [userId]
    );

    return unRawRepublicaData(rows[0]);
  }

  async findAll() {
    const { rows } = await dbClient.query<RawRepublica>(
      "SELECT * FROM republicas"
    );

    return rows.map(unRawRepublicaData);
  }

  async store(republica: CreateRepublicaDto) {
    const { rows } = await dbClient.query<RawRepublica>(
      "INSERT INTO republicas(id, user_id, class) VALUES($1, $2, $3) RETURNING *",
      [uuid(), republica.userId, republica.class]
    );

    return unRawRepublicaData(rows[0]);
  }

  async edit(userId: string, republicaEditValues: RawRepublicaEdit) {
    const columnsToEdit = Object.keys(republicaEditValues);
    const valuesToEdit = Object.values(republicaEditValues);

    const valuesToEditQuery = columnsToEdit
      .map((key, i) => `${key} = $${i + 1}`)
      .join(", ");

    const { rows } = await dbClient.query<RawRepublica>(
      `UPDATE republicas SET ${valuesToEditQuery} WHERE user_id = $${columnsToEdit.length + 1} RETURNING *`,
      [...valuesToEdit, userId]
    );

    return unRawRepublicaData(rows[0]);
  }
}

export const republicaModel = new RepublicaModel();
