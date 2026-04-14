import React from "react";
import { Loader2, Inbox } from "lucide-react";

export default function CategoryEmptyState({
  isLoading,
  searchTerm,
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Inbox size={48} className="mx-auto text-slate-300 mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {searchTerm ? "No categories found" : "No categories yet"}
      </h3>
      <p className="text-slate-600">
        {searchTerm
          ? "Try adjusting your search criteria"
          : "Create your first category to get started"}
      </p>
    </div>
  );
}
