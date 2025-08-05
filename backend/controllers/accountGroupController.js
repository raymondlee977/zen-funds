import { AccountGroup } from "../models/accountGroupModel.js";
import mongoose from "mongoose";

// GET /api/accountGroups
// Fetch all accountGroups belonging to the authenticated user
export const getAccountGroups = async (req, res) => {
  const userId = req.user._id

  try {
    const accountGroups = await AccountGroup
      .find({ userId })
      .sort({ createdAt: 1 })

    return res.status(200).json(accountGroups)
  } catch (err) {
    console.error("Error fetching accountGroups:", err)
    return res.status(500).json({ error: "Server error fetching accountGroups." })
  }
}

// GET /api/accountGroups/:id
// Fetch a single accountGroup by id (only if it belongs to this user)
export const getAccountGroup = async (req, res) => {
  const { id } = req.params
  const userId = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid accountGroup ID." })
  }

  try {
    const accountGroup = await AccountGroup.findOne({ _id: id, userId })

    if (!accountGroup) {
      return res.status(404).json({ error: "AccountGroup not found." })
    }

    return res.status(200).json(accountGroup)
  } catch (err) {
    console.error("Error fetching accountGroup:", err)
    return res.status(500).json({ error: "Server error fetching accountGroup." })
  }
}

// POST /api/accountGroups
// Create a new accountGroup for the authenticated user
export const createAccountGroup = async (req, res) => {
  const userId = req.user._id
  const { name, icon, color, order } = req.body

  if (!name) {
    return res.status(400).json({ error: "AccountGroup name is required." })
  }

  try {
    const newAccountGroup = await AccountGroup.create({
      userId,
      name,
      icon,
      color,
      order
    })

    return res.status(201).json(newAccountGroup)
  } catch (err) {
    console.error("Error creating accountGroup:", err)
    return res.status(500).json({ error: "Server error creating accountGroup." })
  }
}

// PUT /api/accountGroups/:id
// Update an existing accountGroup (only if it belongs to this user)
export const updateAccountGroup = async (req, res) => {
  const { id } = req.params
  console.log(id);
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid accountGroup ID." })
  }

  try {
    const updated = await AccountGroup.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!updated) {
      return res.status(404).json({ error: "AccountGroup not found or not owned by user." })
    }

    return res.status(200).json(updated)
  } catch (err) {
    console.error("Error updating accountGroup:", err)
    return res.status(500).json({ error: "Server error updating accountGroup." })
  }
}

// DELETE /api/accountGroups/:id
// Delete a accountGroup (only if it belongs to this user)
export const deleteAccountGroup = async (req, res) => {
  const { id } = req.params
  const userId = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid accountGroup ID." })
  }

  try {
    const deleted = await AccountGroup.findOneAndDelete({ _id: id, userId })

    if (!deleted) {
      return res.status(404).json({ error: "AccountGroup not found or not owned by user." })
    }

    return res.status(200).json({ message: "AccountGroup deleted successfully." })
  } catch (err) {
    console.error("Error deleting accountGroup:", err)
    return res.status(500).json({ error: "Server error deleting accountGroup." })
  }
}