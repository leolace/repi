import {
  CreateRepublicaDto,
  createRepublicaSchema,
  EditRepublicaDto,
  editRepublicaSchema,
} from "./republica.dto";
import { republicaModel } from "./republica.model";
import { userService } from "@entities/user";
import { ErrorE } from "@utils/error";

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

    const editedRepublica = await republicaModel.edit(userId, {
      ...validatedEditRepublica,
    });

    return editedRepublica;
  }
}

export const republicaService = new RepublicaService();
