import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  priority?: 'high' | 'normal';
}

export function SkeletonCard({ priority = 'normal' }: SkeletonCardProps) {
  return (
    <div className={`bg-gradient-card rounded-xl overflow-hidden border border-border ${priority === 'high' ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <Skeleton className={`w-full ${priority === 'high' ? 'aspect-[16/10]' : 'aspect-[4/3]'}`} />
      <div className="p-6 space-y-4">
        <Skeleton className="h-3 w-20" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-gradient-card rounded-xl border border-border">
      <Skeleton className="w-full md:w-64 lg:w-80 flex-shrink-0 aspect-[16/10] md:aspect-[4/3] rounded-lg" />
      <div className="flex-1 py-2 space-y-4">
        <div className="flex gap-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <div className="flex gap-4 pt-4 border-t border-border">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
