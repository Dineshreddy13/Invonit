import React from "react";
import { AlertCircle } from "lucide-react";
import useCategoriesStore from "../../store/categoriesStore";
import useBusinessStore from "../../store/businessStore";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

export default function CategoryDeleteConfirmation({
  isOpen,
  category,
  onClose,
  onDeleteSuccess,
}) {
  const { business } = useBusinessStore();
  const { deleteCategory, deleting } = useCategoriesStore();

  const handleDelete = async () => {
    if (!business?.id || !category?.id) {
      return;
    }

    const result = await deleteCategory(business.id, category.id);
    if (result.success) {
      onClose();
      onDeleteSuccess?.();
    }
  };

  if (!category) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Category"
      description={`Are you sure you want to delete "${category.name}"?`}
      size="sm"
      footer={
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            isLoading={deleting}
          >
            Delete Category
          </Button>
        </div>
      }
    >
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-amber-900">
              This action cannot be undone
            </p>
            <p className="text-sm text-amber-800">
              Deleting this category cannot be reversed. Please make sure you want to proceed.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
