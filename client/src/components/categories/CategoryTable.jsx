import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}) {
  const getCategoryParentName = (parentId) => {
    if (!parentId) return "—";
    const parent = categories.find((c) => c.id === parentId);
    return parent ? parent.name : "Unknown";
  };

  const getStatusBadge = (isActive) => {
    if (isActive === false) {
      return <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">Inactive</span>;
    }
    return <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Active</span>;
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Parent Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{category.name}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">
                    {category.description || "—"}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">
                    {getCategoryParentName(category.parentId)}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(category.isActive)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(category)}
                      title="Edit category"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(category.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete category"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
