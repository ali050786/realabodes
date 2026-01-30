import { motion } from 'framer-motion';
import { Search, X, Grid, List } from 'lucide-react';
import { categories, statusFilters, budgetRanges, serviceAreas } from '@/lib/projects-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectFiltersProps {
  selectedCategory: string;
  selectedStatus: string;
  selectedBudget: string;
  selectedLocation: string;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onBudgetChange: (budget: string) => void;
  onLocationChange: (location: string) => void;
  onSearchChange: (search: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  resultCount: number;
}

export function ProjectFilters({
  selectedCategory,
  selectedStatus,
  selectedBudget,
  selectedLocation,
  searchQuery,
  viewMode,
  onCategoryChange,
  onStatusChange,
  onBudgetChange,
  onLocationChange,
  onSearchChange,
  onViewModeChange,
  resultCount,
}: ProjectFiltersProps) {
  const hasActiveFilters =
    selectedCategory !== 'All Projects' ||
    selectedStatus !== 'All Status' ||
    selectedBudget !== 'All Budgets' ||
    selectedLocation !== 'All Locations' ||
    searchQuery !== '';

  const clearFilters = () => {
    onCategoryChange('All Projects');
    onStatusChange('All Status');
    onBudgetChange('All Budgets');
    onLocationChange('All Locations');
    onSearchChange('');
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, location, or tag..."
          className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          aria-label="Search projects"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div className="flex flex-col gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              role="tab"
              aria-selected={selectedCategory === category}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${selectedCategory === category
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dropdowns & View Toggle */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusFilters.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Budget Filter */}
            <Select value={selectedBudget} onValueChange={onBudgetChange}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={onLocationChange}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {serviceAreas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden md:block w-px h-8 bg-border mx-2" />

          {/* View Toggle */}
          <div className="flex items-center self-end md:self-auto bg-card border border-border rounded-lg p-1 ml-auto md:ml-0">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count & Clear */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          Showing <span className="text-foreground font-medium">{resultCount}</span> project{resultCount !== 1 ? 's' : ''}
        </p>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear filters
          </motion.button>
        )}
      </div>
    </div>
  );
}
