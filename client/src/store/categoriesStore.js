import { create } from "zustand";
import apiClient from "../api/apiClient";

const useCategoriesStore = create((set, get) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,

  // Fetch all categories for the current business
  fetchCategories: async (businessId, filters = {}) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (filters.tree) params.append("tree", filters.tree);
      if (filters.parentId) params.append("parentId", filters.parentId);
      if (filters.includeInactive) params.append("includeInactive", filters.includeInactive);
      if (filters.search) params.append("search", filters.search);

      const res = await apiClient.get(`/business/${businessId}/categories?${params}`);
      const categories = res.data.data.categories;
      set({ categories, loading: false });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch categories.";
      set({ loading: false, error: msg });
      return { success: false, message: msg };
    }
  },

  // Get a single category by ID
  getCategoryById: async (businessId, categoryId) => {
    try {
      const res = await apiClient.get(`/business/${businessId}/categories/${categoryId}`);
      const category = res.data.data.category;
      set({ selectedCategory: category });
      return { success: true, category };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch category.";
      set({ error: msg });
      return { success: false, message: msg };
    }
  },

  // Get children categories of a parent
  getChildren: async (businessId, parentCategoryId) => {
    try {
      const res = await apiClient.get(`/business/${businessId}/categories/${parentCategoryId}/children`);
      const children = res.data.data.categories;
      return { success: true, children };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch category children.";
      return { success: false, message: msg };
    }
  },

  // Create a new category
  createCategory: async (businessId, data) => {
    set({ creating: true, error: null });
    try {
      const res = await apiClient.post(`/business/${businessId}/categories`, data);
      const category = res.data.data.category;
      set((state) => ({
        categories: [category, ...state.categories],
        creating: false,
      }));
      return { success: true, category };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create category.";
      const errors = err.response?.data?.errors || [];
      set({ creating: false, error: msg });
      return { success: false, message: msg, errors };
    }
  },

  // Update an existing category
  updateCategory: async (businessId, categoryId, data) => {
    set({ updating: true, error: null });
    try {
      const res = await apiClient.patch(`/business/${businessId}/categories/${categoryId}`, data);
      const category = res.data.data.category;
      set((state) => ({
        categories: state.categories.map((c) => (c.id === categoryId ? category : c)),
        selectedCategory: category,
        updating: false,
      }));
      return { success: true, category };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update category.";
      const errors = err.response?.data?.errors || [];
      set({ updating: false, error: msg });
      return { success: false, message: msg, errors };
    }
  },

  // Delete a category
  deleteCategory: async (businessId, categoryId) => {
    set({ deleting: true, error: null });
    try {
      await apiClient.delete(`/business/${businessId}/categories/${categoryId}`);
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== categoryId),
        selectedCategory: null,
        deleting: false,
      }));
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete category.";
      set({ deleting: false, error: msg });
      return { success: false, message: msg };
    }
  },

  clearError: () => set({ error: null }),
  clearSelectedCategory: () => set({ selectedCategory: null }),
}));

export default useCategoriesStore;
