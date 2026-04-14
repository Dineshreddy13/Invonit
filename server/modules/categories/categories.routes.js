import { Router } from "express";
// import { authenticate } from "../../middlewares/auth.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";
import {
  getCategories,
  getCategoryById,
  getCategoryChildren,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categories.controller.js";

const router = Router({ mergeParams: true });

router.use(protect);

router.get("/",              getCategories);       // ?tree=true  ?parentId=  ?includeInactive=true
router.get("/:id",           getCategoryById);
router.get("/:id/children",  getCategoryChildren); // direct children only
router.post("/",             createCategory);
router.patch("/:id",         updateCategory);
router.delete("/:id",        deleteCategory);

export default router;