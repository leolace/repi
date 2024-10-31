import { Request, Response } from "express";
import { tagService } from "../services/tag.service.ts";
import { ErrorE } from "../utils/error.ts";

class TagController {
  async findAllTags(_: Request, res: Response) {
    const tags = await tagService.findAllTags();

    res.json(tags);
  }

  async createTag(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) throw new ErrorE("Name not found", 400);

    const createdTag = await tagService.createTag(req.body.name);

    res.json(createdTag).status(201);
  }

  async deleteTag(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) throw new ErrorE("Id not found", 400);

    await tagService.deleteTag(req.body.id);

    res.status(204).json();
  }
}

export const tagController = new TagController();
