export function validateCategoryPayload(body, isUpdate = false) {
  const errors = [];

  if (!isUpdate) {
    if (!body.name || String(body.name).trim().length < 2) {
      errors.push("Category name is required and must be at least 2 characters.");
    }
  } else {
    if (body.name !== undefined && String(body.name).trim().length < 2) {
      errors.push("Category name must be at least 2 characters.");
    }
  }

  if (body.description !== undefined && body.description !== null) {
    if (String(body.description).trim().length > 500) {
      errors.push("Description cannot exceed 500 characters.");
    }
  }

  // parentId must be a valid UUID if provided
  if (body.parentId !== undefined && body.parentId !== null && body.parentId !== "") {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(body.parentId)) {
      errors.push("parentId must be a valid UUID.");
    }
  }

  return errors;
}