import { Request, Response } from "express";
import { tagService } from "./tag.service";
import { AppError } from "../../shared/utils/error";

class TagController {
  async findAllTags(_: Request, res: Response) {
    const tags = await tagService.findAllTags();

    res.json(tags);
  }

  async createTag(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) throw AppError.NotFoundException("Name not found");

    const createdTag = await tagService.createTag(req.body.name);

    res.json(createdTag).status(201);
  }

  async deleteTag(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) throw AppError.NotFoundException("Id not found");

    await tagService.deleteTag(req.body.id);

    res.status(204).json();
  }

  async assignTagToUser(req: Request, res: Response) {
    const { userId, tagId } = req.body;

    if (!userId || !tagId)
      throw AppError.BadRequestException("Invalid request");

    await tagService.assignTagToUser(userId, tagId);

    res.status(201).json();
  }

  async getUserTags(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) throw AppError.BadRequestException("Invalid request");

    const userTags = await tagService.getUserTags(userId);

    res.json(userTags);
  }
}

export const tagController = new TagController();
