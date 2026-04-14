import React from "react";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import useCategoriesStore from "../../store/categoriesStore";
import useBusinessStore from "../../store/businessStore";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";

const defaultValues = {
  name: "",
  description: "",
  parentId: "",
};

export default function CreateCategoryModal({ isOpen, onClose, categories = [] }) {
  const { business } = useBusinessStore();
  const { createCategory, creating, error } = useCategoriesStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues });

  const handleSelectChange = (field) => (value) => {
    setValue(field, value);
  };

  const getFieldError = (fieldName) => {
    return errors[fieldName]?.message;
  };

  const onSubmit = async (formData) => {
    if (!business?.id) {
      return;
    }

    // Prepare data
    const payload = {
      name: formData.name.trim(),
    };

    if (formData.description) payload.description = formData.description.trim();
    if (formData.parentId) payload.parentId = formData.parentId;

    const result = await createCategory(business.id, payload);
    if (result.success) {
      reset();
      onClose();
    }
  };

  const hasErrors = Object.keys(errors).length > 0 || !!error;

  // Filter categories for parent selection (exclude children in hierarchy)
  const parentCategories = categories.filter((c) => c.isActive !== false);
  const parentOptions = parentCategories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Category"
      description="Create a new product or service category for your business."
      size="md"
      footer={
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} disabled={creating}>
            Cancel
          </Button>
          <Button type="submit" form="create-category-form" isLoading={creating}>
            Create Category
          </Button>
        </div>
      }
    >
      <form id="create-category-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Messages */}
        {hasErrors && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-red-800">
                  Please correct the following errors:
                </p>
                <ul className="text-sm text-red-700 list-disc list-inside space-y-0.5">
                  {Object.values(errors).map((err, i) => (
                    <li key={i}>{err.message || "Invalid field"}</li>
                  ))}
                  {error && Object.keys(errors).length === 0 && <li>{error}</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Category Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name">
            Category Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="e.g., Electronics, Office Supplies"
            {...register("name", {
              required: "Category name is required",
            })}
          />
          {getFieldError("name") && (
            <p className="text-red-500 text-xs font-medium">
              {getFieldError("name")}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Optional description for this category"
            {...register("description")}
            rows={3}
          />
        </div>

        {/* Parent Category */}
        {parentOptions.length > 0 && (
          <div className="space-y-1.5">
            <Label htmlFor="parentId">Parent Category</Label>
            <Select
              id="parentId"
              onValueChange={handleSelectChange("parentId")}
              options={[
                { value: "", label: "No parent (top-level)" },
                ...parentOptions,
              ]}
              placeholder="Select parent category (optional)"
            />
            <p className="text-xs text-slate-500">
              Leave empty to create a top-level category
            </p>
          </div>
        )}
      </form>
    </Modal>
  );
}
