import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

export function Grid({ 
  children, 
  className,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = "gap-6"
}: GridProps) {
  // Convert column configuration to Tailwind classes
  const columnClasses = [
    `grid-cols-${columns.default || 1}`,
    columns.sm ? `sm:grid-cols-${columns.sm}` : "",
    columns.md ? `md:grid-cols-${columns.md}` : "",
    columns.lg ? `lg:grid-cols-${columns.lg}` : "",
    columns.xl ? `xl:grid-cols-${columns.xl}` : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={cn("grid", columnClasses, gap, className)}>
      {children}
    </div>
  );
}
