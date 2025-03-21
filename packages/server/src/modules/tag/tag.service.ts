import { tagRepository } from "@shared/repositories/tag.repository";
import { AppError } from "@shared/utils/error";
import { userService } from "../user/user.service";
import { ITag, TagEnum } from "common";

class TagService {
  async findAllTags(): Promise<ITag[]> {
    const tags = await tagRepository.index();

    return tags;
  }

  async assignTagToUser(
    tagName: TagEnum | TagEnum[],
    userId: string,
  ): Promise<void> {
    const user = await userService.findUserBy({ id: userId });
    if (!user) throw AppError.NotFoundException("User not found");
    const userTags = await this.getUserTags(userId);

    const handleAssignTag = async (tag: TagEnum) => {
      const tagFounded = await tagRepository.show({ name: tag });
      if (!tagFounded) throw AppError.NotFoundException("Tag not found");

      const userAlreadyHasTag = !!userTags.find((t) => t.id === tagFounded.id);

      if (userAlreadyHasTag)
        throw AppError.NotFoundException("User already has this tag assigned");

      await tagRepository.assignTagToUser(tagFounded, userId);
    };

    if (Array.isArray(tagName)) await Promise.all(tagName.map(handleAssignTag));
    else await handleAssignTag(tagName);
  }

  async getUserTags(userId: string): Promise<ITag[]> {
    const userExists = await userService.findUserBy({ id: userId });

    if (!userExists) throw AppError.NotFoundException("User not found");

    const userTags = await tagRepository.getUserTags(userId);

    return userTags;
  }

  async createTag(value: string | string[]): Promise<ITag[] | ITag> {
    const handleCreateTags = async (value: string) => {
      const tagAlreadyExists = await tagRepository.show({
        name: value.toUpperCase(),
      });
      if (tagAlreadyExists)
        throw AppError.ConflictException(`Tag ${value} already exists`);

      const tag = await tagRepository.store(value.toUpperCase());
      return tag;
    };

    if (Array.isArray(value))
      return await Promise.all(value.map(handleCreateTags));

    return await handleCreateTags(value);
  }

  async deleteTag(id: string): Promise<void> {
    const tag = await tagRepository.show({ id });

    if (!tag) throw AppError.NotFoundException("Tag not found");

    await tagRepository.delete(id);
  }
}

export const tagService = new TagService();
