import { motion } from 'framer-motion';
import { Search, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  searchQuery: string;
  onClear: () => void;
}

export function EmptyState({ searchQuery, onClear }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        {searchQuery ? (
          <Search className="w-10 h-10 text-muted-foreground" />
        ) : (
          <FolderOpen className="w-10 h-10 text-muted-foreground" />
        )}
      </div>
      
      <h3 className="font-serif text-2xl text-foreground mb-2">
        {searchQuery ? 'No results found' : 'No projects yet'}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-6">
        {searchQuery
          ? `We couldn't find any projects matching "${searchQuery}". Try adjusting your filters or search terms.`
          : 'Projects will appear here once they are added.'}
      </p>

      {searchQuery && (
        <button
          onClick={onClear}
          className="px-6 py-2.5 bg-gradient-gold text-primary-foreground rounded-full text-sm font-medium hover:shadow-gold transition-shadow"
        >
          Clear Search
        </button>
      )}
    </motion.div>
  );
}
