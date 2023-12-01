import * as dao from "./dao.js";
function UserRoutes(app) {
  const createUser = async (req, res) => {
    const {_id, ...user} = req.body;
    try {
      res.json(await dao.createUser(user));
    } catch (e) {
      console.log(e);
      return res.status(403).send("Username already taken");
    }
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const status = await dao.updateUser(userId, req.body);
      if (!status.acknowledged) {
        return res.status(404).send("User not found");
      }
      const user = await dao.findUserById(userId);
      if (userId in req.session) req.session[userId] = user;
      res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(403).send("Username already taken");
    }
  };

  
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user === null) {
      return res.status(403).json({ error: "Invalid credentials" });
    }
    // req.session["currentUser"] = user;
    req.session[user._id] = user;
    res.json(user);
  };

  const loggedIn = (req, res) => {
    const {userId} = req.body;
    return res.json(userId in req.session ? req.session[userId] : null);
  };

  const signup = async (req, res) => {
    return createUser(req, res);
  };

  const signout = (req, res) => {
    delete req.session[req.body.userId];
    res.status(200).send("OK");
  };
  // const account = async (req, res) => {
  //   res.json(currentUser);
  // };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  // app.post("/api/users/account", account);
  app.post("/api/users/see", loggedIn);
}
export default UserRoutes;
