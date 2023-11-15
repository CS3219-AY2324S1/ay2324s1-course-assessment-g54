import { CATEGORIES_ARRAY } from "../model/constants.js";

export async function getCategories(req, res) {
  try {
      res.send(CATEGORIES_ARRAY);
  } catch (error) {
      res.status(400).send(error.message);
  }
}