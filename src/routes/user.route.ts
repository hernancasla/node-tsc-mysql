import * as dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import * as userController from "../controllers/user.controller";
import passportHelper from "../helpers/passport.helper";

dotenv.config();

const router = express.Router();

const passport = passportHelper(process.env.SECRET_OR_key);
router.use(passport.initialize());

router.get("/users", (req, res) => {
    return res.send("GET HTTP method on user resource");
});
router.get("/user/:id", (req, res) => {
    const itemId = req.params.id;

    return res.send(`GET HTTP method on user resource [${itemId}]`);
});
router.post("/user", (req, res) => {
    const data = req.body.data;
    res.send("Add " + data);
    return res.send("POST HTTP method on user resource");
});

router.put("/user/:id", (req, res) => {
    const itemId = req.params.id;
    const data = req.body.data;
    res.send("Replace " + itemId + " with " + data);
});

router.delete("/users/:id", (req, res) => {
    const itemId = req.params.id;
    res.send("Delete " + itemId);
    return res.send("DELETE HTTP method on user resource");
});

// login route
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const validUser = await userController.validateLogin(email, password);
    if (validUser) {
        // from now on we'll identify the user by the id and the id is the
        // only personalized value that goes into our token
        const payload = { email };
        const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
        res.json({ msg: "ok", token });
    } else {
        res.status(401).json({ msg: "Password is incorrect" });
    }
  });
router.get("/protected", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json("Success! You can now see this without a token.");
});
export default router;
