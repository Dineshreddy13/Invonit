import React, { useState, useEffect } from "react";
import useCategoriesStore from "../store/categoriesStore";
import useBusinessStore from "../store/businessStore";
import {
  CreateCategoryModal,
  EditCategoryModal,
  CategoryTable,
  CategoryFilters,
  CategoryEmptyState,
  CategoryDeleteConfirmation,
} from "../components/categories";

export default function Categories() {
  const { business } = useBusinessStore();
  const {
    categories,
    loading,
    fetchCategories,
  } = useCategoriesStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch categories on component mount and when business changes
  useEffect(() => {
    if (business?.id) {
      fetchCategories(business.id);
    }
  }, [business?.id, fetchCategories]);

  // Filter categories based on search
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDeleteSuccess = () => {
    setSearchTerm("");
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <CategoryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddCategory={() => setShowCreateModal(true)}
      />

      {/* Content */}
      {loading || filteredCategories.length === 0 ? (
        <CategoryEmptyState
          isLoading={loading}
          searchTerm={searchTerm}
        />
      ) : (
        <>
          <CategoryTable
            categories={filteredCategories}
            onEdit={handleEditCategory}
            onDelete={setDeleteConfirm}
          />

          {/* Pagination info */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-600">
              Showing {filteredCategories.length} of {categories.length} categories
            </p>
          </div>
        </>
      )}

      {/* Create Category Modal */}
      <CreateCategoryModal
        isOpen={showCreateModal}
        onClose={handleModalClose}
        categories={categories}
      />

      {/* Edit Category Modal */}
      {selectedCategory && (
        <EditCategoryModal
          isOpen={showEditModal}
          category={selectedCategory}
          onClose={handleModalClose}
          categories={categories}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <CategoryDeleteConfirmation
          isOpen={!!deleteConfirm}
          category={categories.find((c) => c.id === deleteConfirm)}
          onClose={() => setDeleteConfirm(null)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
