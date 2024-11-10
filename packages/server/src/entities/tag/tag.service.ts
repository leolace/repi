import { tagModel } from "./tag.model.ts";
import { ErrorE } from "../../utils/error.ts";
import { userService } from "../user/user.service.ts";
import { ITag, TagEnum } from "common";

class TagService {
  async findAllTags(): Promise<ITag[]> {
    const tags = await tagModel.index();

    return tags;
  }

  async assignTagToUser(tagName: TagEnum | TagEnum[], userId: string): Promise<void> {
    const user = await userService.findUserBy({ id: userId });
    if (!user) throw new ErrorE("User not found", 400);
    const userTags = await this.getUserTags(userId);

    const handleAssignTag = async (tag: TagEnum) => {
      const tagFounded = await tagModel.show({ name: tag });
      if (!tagFounded) throw new ErrorE("Tag not found", 400);

      const userAlreadyHasTag = !!userTags.find((t) => t.id === tagFounded.id);

      if (userAlreadyHasTag)
        throw new ErrorE("User already has this tag assigned", 400);

      await tagModel.assignTagToUser(tagFounded, userId);
    };

    if (Array.isArray(tagName)) await Promise.all(tagName.map(handleAssignTag));
    else await handleAssignTag(tagName);
  }

  async getUserTags(userId: string): Promise<ITag[]> {
    const userExists = await userService.findUserBy({ id: userId });

    if (!userExists) throw new ErrorE("User not found", 400);

    const userTags = await tagModel.getUserTags(userId);

    return userTags;
  }

  async createTag(value: string | string[]): Promise<ITag[] | ITag> {
    const handleCreateTags = async (value: string) => {
      const tagAlreadyExists = await tagModel.show({
        name: value.toUpperCase(),
      });
      if (tagAlreadyExists)
        throw new ErrorE(`Tag ${value} already exists`, 400);

      const tag = await tagModel.store(value.toUpperCase());
      return tag;
    };

    if (Array.isArray(value))
      return await Promise.all(value.map(handleCreateTags));

    return await handleCreateTags(value);
  }

  async deleteTag(id: string): Promise<void> {
    const tag = await tagModel.show({ id });

    if (!tag) throw new ErrorE("Tag not found");

    await tagModel.delete(id);
  }
}

export const tagService = new TagService();
