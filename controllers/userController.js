import User from "../models/User.js";

// Get all users (only Admin can access this)
export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a specific user (any authenticated user can access their own data)
export const getUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Retrieve the user from the request (authenticated user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

// Update a user's information (only Admin or the user themselves can update)
export const updateUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Get the logged-in user
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user data (only allowed to change name, email, etc., not role for non-admin users)
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
};

// Delete a user (only Admin can delete users)
export const deleteUserController = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
