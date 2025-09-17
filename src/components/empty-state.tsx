import { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  title, 
  description, 
  icon = "inbox", 
  action,
  className 
}: EmptyStateProps) {
  // Dynamically get the icon from Lucide
  const iconName = icon.charAt(0).toUpperCase() + icon.slice(1);
  // Using type assertion to avoid TypeScript issues with dynamic imports
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Inbox;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed",
      className
    )}>
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
        <IconComponent className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {action && (
        <Button 
          onClick={action.onClick} 
          className="mt-4"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
