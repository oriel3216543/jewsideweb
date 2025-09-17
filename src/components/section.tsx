import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function Section({ 
  title, 
  description, 
  children, 
  className,
  action
}: SectionProps) {
  return (
    <section className={cn("py-12", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
        {action && (
          <div className="mt-4 md:mt-0">
            <Button variant="ghost" asChild>
              <Link href={action.href} className="group">
                {action.label}
                <ChevronRight className="ms-1 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-[-0.25rem]" />
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
}
