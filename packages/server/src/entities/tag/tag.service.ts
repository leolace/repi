import { tagModel } from "./tag.model.ts";
import { ErrorE } from "../../utils/error.ts";
import { userService } from "../user/user.service.ts";
import { TagEnum } from "common";

class TagService {
  async findAllTags() {
    const tags = await tagModel.index();

    return tags;
  }

  async assignTagToUser(tagName: TagEnum | TagEnum[], userId: string) {
    const user = await userService.findUserBy({ id: userId });
    if (!user) throw new ErrorE("User not found", 400);
    const userTags = await this.getUserTags(userId);

    const assignTag = async (tag: TagEnum) => {
      const tagFounded = await tagModel.show({ name: tag });
      if (!tagFounded) throw new ErrorE("Tag not found", 400);

      const userAlreadyHasTag = !!userTags.find((t) => t.id === tagFounded.id);

      if (userAlreadyHasTag)
        throw new ErrorE("User already has this tag assigned", 400);

      await tagModel.assignTagToUser(tagFounded, userId);
    };

    if (Array.isArray(tagName)) tagName.map(assignTag);
    else assignTag(tagName);
  }

  async getUserTags(userId: string) {
    const userExists = await userService.findUserBy({ id: userId });

    if (!userExists) throw new ErrorE("User not found", 400);

    const userTags = await tagModel.getUserTags(userId);

    return userTags;
  }

  async createTag(name: string) {
    const tagAlreadyExists = await tagModel.show({ name: name.toUpperCase() });

    if (tagAlreadyExists) throw new ErrorE(`Tag ${name} already exists`, 400);

    const tag = await tagModel.store(name.toUpperCase());

    return tag;
  }

  async deleteTag(id: string) {
    const tag = await tagModel.show({ id });

    if (!tag) throw new ErrorE("Tag not found");

    await tagModel.delete(id);
  }
}

export const tagService = new TagService();
