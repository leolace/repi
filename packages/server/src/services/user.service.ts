import { authModel } from "../models/auth.model.ts";
import { tagModel } from "../models/tag.model.ts";
import { userModel } from "../models/user.model.ts";
import { ErrorE } from "../utils/error.ts";

class UserService {
  async assignTagToUser(userId: string, tagId: string) {
    const tagExists = await tagModel.show({ id: tagId });

    if (!tagExists) throw new ErrorE("Tag not found", 400);

    const userExists = await authModel.findBy({ id: userId });

    if (!userExists[0]) throw new ErrorE("User not found", 400);

    await userModel.assignTagToUser(userId, tagId);
  }

	async getUserTags(userId: string) {
		const userExists = await authModel.findBy({ id: userId });

		if (!userExists[0]) throw new ErrorE("User not found", 400);

		const userTags = await userModel.getUserTags(userId);

		return userTags;
	}
}

export const userService = new UserService();
