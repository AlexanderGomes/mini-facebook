import dbConnect from "../../../utils/dbConnect";
import User from '../../../models/user'
import bcrypt from 'bcrypt'

dbConnect();


export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;


    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(id);
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
            case 'PUT':
                if (req.body.userId === id ) {
                    if (req.body.password) {
                      try {
                        const salt = await bcrypt.genSalt(10);
                        req.body.password = await bcrypt.hash(req.body.password, salt);
                      } catch (err) {
                        return res.status(500).json(err);
                      }
                    }
                    try {
                      const user = await User.findByIdAndUpdate(id, {
                        $set: req.body,
                      });
                      res.status(200).json("Account has been updated");
                    } catch (err) {
                      return res.status(500).json(err);
                    }
                  } else {
                    return res.status(403).json("You can update only your account!");
                  }
                break;
                case 'DELETE':
                    try {
                        const deletedUser = await User.deleteOne({ _id: id });
                        res.status(200).json({ success: true, data: 'deleted' });
                    } catch (error) {
                        res.status(400).json({ success: false })
                    }
                    break;
            default:
           res.status(400).json({ success: false });
        }

}