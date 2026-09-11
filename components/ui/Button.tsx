import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  title: string;
  href: string;
  arrow?:Boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground  transition hover:bg-red-700",
  outline:
    "border border-border text-foreground hover:border-primary transition hover:text-primary",
  ghost: "text-muted-foreground  transition hover:text-primary",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 lg:text-sm text-[12px]",
  lg: "h-14 px-10 text-base",
};

export function Button({
  title,
  href,
  arrow,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex
        items-center
        justify-center
        font-medium
        transition-all
        duration-300
        gap-2
        group
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {title}
      {
        arrow && <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

      }
      
    </Link>
  );
}

export default function ArrowButton({ title, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-5 border-b text-muted border-primary/60 pb-3 text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:border-primary"
    >
      {title}

      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-black transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight size={17} />
      </span>
    </Link>
  );
}
