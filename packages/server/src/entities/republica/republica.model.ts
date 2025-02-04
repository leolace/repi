import { knex } from "@database/knex";
import { CreateRepublicaDto } from "./republica.dto";
import { v4 as uuid } from "uuid";
import { RepublicaEdit } from "./republica.types";
import { Republica } from "common";

class RepublicaModel {
  async find(id: string) {
    const republica = await knex<Republica>("republicas")
      .where({ id })
      .select("*")
      .then((rows) => rows[0]);

    return republica;
  }

  async findByUser(userId: string) {
    const republica = await knex<Republica>("republicas")
      .where({ userId: userId })
      .select("*")
      .then((rows) => rows[0]);

    return republica;
  }

  async findAll() {
    const republicas = await knex<Republica>("republicas").select("*");
    return republicas;
  }

  async store(republica: CreateRepublicaDto) {
    const [editedRepublica] = await knex<Republica>("republicas")
      .insert({
        id: uuid(),
        userId: republica.userId,
        class: republica.class,
      })
      .returning("*");

    return editedRepublica;
  }

  async edit(userId: string, republicaEditValues: RepublicaEdit) {
    const editedRepublica = await knex<Republica>("republicas")
      .where({ userId })
      .update(republicaEditValues)
      .returning("*")
      .then((rows) => rows[0]);

    return editedRepublica;
  }
}

export const republicaModel = new RepublicaModel();
