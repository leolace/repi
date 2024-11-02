import { Request, Response } from "express";
import { tagService } from "./tag.service.ts";
import { ErrorE } from "../../utils/error.ts";

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

	async assignTagToUser(req: Request, res: Response) {
		const { userId, tagId } = req.body;

		if (!userId || !tagId) throw new ErrorE("Invalid request");

		await tagService.assignTagToUser(userId, tagId);

		res.status(201).json();
	}

	async getUserTags(req: Request, res: Response) {
		const { userId } = req.params;

		if (!userId) throw new ErrorE("Invalid request");

		const userTags = await tagService.getUserTags(userId);

		res.json(userTags);
	}
}

export const tagController = new TagController();
