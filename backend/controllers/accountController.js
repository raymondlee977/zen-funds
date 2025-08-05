import { Account } from "../models/accountModel";

export const getAccounts = async (req, res) => {
  const userId = req.user._id;

  const accounts = await Account
    .find({ userId })
    .sort({ createdAt: 1 })
    .lean();
  
    res.status(200).json(accounts);
}