import { categoriesService } from "./categories.service.js";
import { validateCategoryPayload } from "./categories.validator.js";
import { MSG } from "../../utils/constants.js";

export async function getCategories(req, res) {
  try {
    const data = await categoriesService.getCategories(
      req.params.businessId,
      req.user.id,
      req.query        // tree, includeInactive, parentId
    );
    return res.status(200).json({
      success: true,
      message: MSG.CATEGORIES_FETCHED,
      data: { categories: data, count: Array.isArray(data) ? data.length : undefined },
    });
  } catch (err) {
    console.error("[getCategories]", err);
    return res.status(err.statusCode || 500).json({ success: false, message: err.message || MSG.INTERNAL_ERROR });
  }
}

export async function getCategoryById(req, res) {
  try {
    const category = await categoriesService.getCategoryById(
      req.params.id,
      req.params.businessId,
      req.user.id
    );
    if (!category) {
      return res.status(404).json({ success: false, message: MSG.CATEGORY_NOT_FOUND });
    }
    return res.status(200).json({ success: true, message: MSG.CATEGORY_FETCHED, data: { category } });
  } catch (err) {
    console.error("[getCategoryById]", err);
    return res.status(err.statusCode || 500).json({ success: false, message: err.message || MSG.INTERNAL_ERROR });
  }
}

export async function getCategoryChildren(req, res) {
  try {
    const children = await categoriesService.getChildren(
      req.params.id,
      req.params.businessId,
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: MSG.CATEGORIES_FETCHED,
      data: { categories: children, count: children.length },
    });
  } catch (err) {
    console.error("[getCategoryChildren]", err);
    return res.status(err.statusCode || 500).json({ success: false, message: err.message || MSG.INTERNAL_ERROR });
  }
}

export async function createCategory(req, res) {
  try {
    const errors = validateCategoryPayload(req.body, false);
    if (errors.length > 0) {
      return res.status(422).json({ success: false, message: MSG.VALIDATION_ERROR, errors });
    }
    const category = await categoriesService.createCategory(
      req.params.businessId,
      req.user.id,
      req.body
    );
    return res.status(201).json({ success: true, message: MSG.CATEGORY_CREATED, data: { category } });
  } catch (err) {
    console.error("[createCategory]", err);
    return res.status(err.statusCode || 500).json({ success: false, message: err.message || MSG.INTERNAL_ERROR });
  }
}

export async function updateCategory(req, res) {
  try {
    const errors = validateCategoryPayload(req.body, true);
    if (errors.length > 0) {
      return res.status(422).json({ success: false, message: MSG.VALIDATION_ERROR, errors });
    }
    const category = await categoriesService.updateCategory(
      req.params.id,
      req.params.businessId,
      req.user.id,
      req.body
    );
    return res.status(200).json({ success: true, message: MSG.CATEGORY_UPDATED, data: { category } });
  } catch (err) {
    console.error("[updateCategory]", err);
    return res.status(err.statusCode || 500).json({ success: false, message: err.message || MSG.INTERNAL_ERROR });
  }
}

export async function deleteCategory(req, res) {
  try {
    await categoriesService.deleteCategory(
      req.params.id,
      req.params.businessId,
      req.user.id
    );
    return res.status(200).json({ success: true, message: MSG.CATEGORY_DELETED });
  } catch (err) {
    console.error("[deleteCategory]", err);
    return res.status(err.statusCode || 500).json({ success: false, message: err.message || MSG.INTERNAL_ERROR });
  }
}