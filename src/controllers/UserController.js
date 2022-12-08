const UserService = require('../service/UserService');

class UserController {
  userService = new UserService();
  constructor(userService) {
    this.userService = userService;
  }

  async login(req, res) {
    const token = await this.userService.makelogin(req.body);
    return res.status(200).send({ token });
  }

  async validateLogin(req, res) {
    const token = req.headers.authorization;
    const user = await this.userService.validateLogin(token);
    return res.status(200).send(user);
  }

  async createUser(req, res) {
    const token = await this.userService.createUser(req.body);
    return res.status(201).send({ token });
  }
}

module.exports = UserController;