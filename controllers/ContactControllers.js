import ContactModel from "./../models/ContactModels.js";

export const contactMessages = async (req, res, next) => {
  const newMessages = new ContactModel(req.body);
  try {
    const savedMessages = await newMessages.save();
    res.status(200).json(savedMessages);
  } catch (err) {
    next(err);
  }
};
