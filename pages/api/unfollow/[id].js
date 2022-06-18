import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/user";

dbConnect();

export default async (req, res) => {
    const {
      query: { id },
      method,
    } = req;
  
    switch (method) {         
case "PUT":
    if (req.body.userId !== id) {
        try {
          const user = await User.findById(id);
          const currentUser = await User.findById(req.body.userId);
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
        break;
        default: 
        res.status(403).json("you cant unfollow yourself");
    }
  };
  

