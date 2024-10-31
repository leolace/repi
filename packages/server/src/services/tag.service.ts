import { capitalize } from "../utils/string.ts";
import { tagModel } from "../models/tag.model.ts";
import { ErrorE } from "../utils/error.ts";

class TagService {
  async findAllTags() {
    const tags = await tagModel.index();

    return tags;
  }

  async createTag(name: string) {
    const tagAlreadyExists = await tagModel.show({ name: capitalize(name) });

    if (tagAlreadyExists) throw new ErrorE(`Tag ${name} already exists`, 400);

    const tag = await tagModel.store(capitalize(name));

    return tag;
  }

  async deleteTag(id: string) {
    const tag = await tagModel.show({ id });

    if (!tag) throw new ErrorE("Tag not found");

		await tagModel.delete(id);
  }
}

export const tagService = new TagService();
