import { republicaRepository } from "@shared/repositories/republica.repository";
import { AppError } from "@shared/utils/error";
import { CreateRepublicaDto, createRepublicaSchema } from "./schemas/create";
import { userRepository } from "@shared/repositories/user.repository";
import { EditRepublicaDto, editRepublicaSchema } from "./schemas/update";

class RepublicaService {
  async find(id: string) {
    const republica = await republicaRepository.find(id);
    if (!republica) throw AppError.NotFoundException("Republica not found");

    return republica;
  }

  async findByUser(userId: string) {
    const republica = await republicaRepository.findByUser(userId);
    if (!republica) throw AppError.NotFoundException("Republica not found");

    return republica;
  }

  async findAll() {
    const republicas = await republicaRepository.findAll();

    return republicas;
  }

  async store(republica: CreateRepublicaDto) {
    const parsedData = createRepublicaSchema.safeParse(republica);
    if (!parsedData.success)
      throw AppError.BadRequestException(parsedData.error.message);

    const validatedRepublica = parsedData.data;

    const user = await userRepository.findBy({
      id: validatedRepublica.userId,
    });

    if (!user) throw AppError.NotFoundException("User not found");

    await republicaRepository.store(validatedRepublica);
  }

  async edit(userId: string, partialRepublica: EditRepublicaDto) {
    const parsedData = editRepublicaSchema.safeParse(partialRepublica);
    if (!parsedData.success)
      throw AppError.NotFoundException(parsedData.error.message);

    const validatedEditRepublica = parsedData.data;

    const user = await userRepository.findBy({
      id: userId,
    });
    if (!user) throw AppError.NotFoundException("User not found");

    const republica = await republicaRepository.findByUser(userId);
    if (!republica) throw AppError.NotFoundException("Republica not found");

    const editedRepublica = await republicaRepository.edit(userId, {
      ...validatedEditRepublica,
    });

    return editedRepublica;
  }
}

export const republicaService = new RepublicaService();
