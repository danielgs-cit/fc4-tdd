import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.createUser(req.body.name);
      return res.status(201).json({ id: user.getId(), name: user.getName() });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
