type ButtonProps = {
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
    icon,
    iconPosition = "start",
    children,
    className,
    ...buttonProps
}: ButtonProps): React.JSX.Element => (
    <button
        className={`align-center flex w-fit min-w-fit cursor-pointer flex-row justify-center gap-2 rounded-md border-2
            p-1 ${className}`}
        {...buttonProps}
    >
        {iconPosition === "start" && icon}

        {children}

        {iconPosition === "end" && icon}
    </button>
);
