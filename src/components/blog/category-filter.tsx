"use client"

import { Badge } from "@/components/ui/badge"
import type { BlogCategory } from "@/types/blog"

interface CategoryFilterProps {
  categories: BlogCategory[]
  selectedCategory: string | null
  onCategorySelect: (categoryId: string | null) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Badge
        variant={selectedCategory === null ? "default" : "secondary"}
        className="cursor-pointer hover:bg-[#309be8] hover:text-white transition-colors px-4 py-2"
        onClick={() => onCategorySelect(null)}
      >
        All Categories
      </Badge>

      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "secondary"}
          className={`cursor-pointer hover:opacity-80 transition-opacity px-4 py-2 ${
            selectedCategory === category.id ? "bg-[#309be8] text-white" : ""
          }`}
          onClick={() => onCategorySelect(category.id)}
        >
          {category.name}
        </Badge>
      ))}
    </div>
  )
}
