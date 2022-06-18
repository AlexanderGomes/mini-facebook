import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        //password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //user
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
      default:
      res.status(400).json({ success: false });
      break;
  }
};
