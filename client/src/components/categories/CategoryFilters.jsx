import React from "react";
import { Plus } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function CategoryFilters({
  searchTerm,
  onSearchChange,
  onAddCategory,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex gap-4 items-end">
        <Input
          type="text"
          placeholder="Search by category name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
        />
        <Button onClick={onAddCategory} className="gap-2 shrink-0">
          <Plus size={18} />
          Add Category
        </Button>
      </div>
    </div>
  );
}
