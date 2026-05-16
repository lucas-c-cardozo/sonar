interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

export function Badge ({ children, className = '' }: BadgeProps) {
    return (
        <span className={`inline-flex align-center px-2.5 py-0.5 rounded-2xl size-fit text-xs font-semibold text-white bg-(--color-accent) gap-1 ${className}`}>
            {children}
        </span>
    );
}
