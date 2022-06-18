import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/user";

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method,
      } = req;
  
      switch(method) {
        case "GET":
            try {
                const user = await User.findById(id);
                const friends = await Promise.all(
                  user.followings.map((friendId) => {
                    return User.findById(friendId);
                  })
                );
                let friendList = [];
                friends.map((friend) => {
                  const { _id, username, profilePicture } = friend;
                  friendList.push({ _id, username, profilePicture });
                });
                res.status(200).json(friendList)
              } catch (err) {
                res.status(500).json(err);
              }
              break;
              default:
             res.status(500).json(err);
              
      }
}