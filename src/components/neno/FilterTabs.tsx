import { Button } from "@/components/ui/button";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FilterTabs = ({ categories, activeCategory, onCategoryChange }: FilterTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={`text-sm font-medium transition-[var(--transition-smooth)] ${ activeCategory === category ? "" : "text-accent-foreground/50" }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};