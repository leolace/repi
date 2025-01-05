import {
  CreateRepublicaDto,
  createRepublicaSchema,
  EditRepublicaDto,
  editRepublicaSchema,
} from "./republica.dto";
import { republicaModel } from "./republica.model";
import { userService } from "@entities/user";
import { ErrorE } from "@utils/error";
import { RawRepublica, RawRepublicaEdit } from "./republica.types";
import { unRawRepublicaData } from "./republica.utils";

class RepublicaService {
  async find(id: string) {
    const republica = await republicaModel.find(id);
    if (!republica) throw new ErrorE("Republica not found");

    return republica;
  }

  async findByUser(userId: string) {
    const republica = await republicaModel.findByUser(userId);
    if (!republica) throw new ErrorE("Republica not found");

    return republica;
  }

  async findAll() {
    const republicas = await republicaModel.findAll();

    return republicas;
  }

  async store(republica: CreateRepublicaDto) {
    const parsedData = createRepublicaSchema.safeParse(republica);
    if (!parsedData.success) throw new ErrorE(parsedData.error.message);

    const validatedRepublica = parsedData.data;

    const user = await userService.findUserBy({
      id: validatedRepublica.userId,
    });

    if (!user) throw new ErrorE("User not found");

    await republicaModel.store(validatedRepublica);
  }

  async edit(userId: string, partialRepublica: EditRepublicaDto) {
    const parsedData = editRepublicaSchema.safeParse(partialRepublica);
    if (!parsedData.success) throw new ErrorE(parsedData.error.message);

    const validatedEditRepublica = parsedData.data;

    const user = await userService.findUserBy({
      id: userId,
    });
    if (!user) throw new ErrorE("User not found");

    const republica = await republicaModel.findByUser(userId);
    if (!republica) throw new ErrorE("Republica not found");

    const entriesToEdit: RawRepublicaEdit = Object.fromEntries(
      Object.entries({
        image_url: validatedEditRepublica.imageUrl,
        occupants_count: validatedEditRepublica.occupantsCount,
        rental_value: validatedEditRepublica.rentalValue,
      }).filter(([, value]) => Boolean(value))
    );

    const editedRepublica = await republicaModel.edit(userId, entriesToEdit);

    return editedRepublica;
  }
}

export const republicaService = new RepublicaService();
