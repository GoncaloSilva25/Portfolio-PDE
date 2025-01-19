"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookIcon, ClockIcon, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Master Thesis", icon: BookIcon },
    { href: "/portfolio", label: "Portfolio", icon: ClockIcon },
    { href: "/documents", label: "Documents", icon: FileText },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}