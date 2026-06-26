interface ButtonProps{
    text:string;
    type?:'button'|'submit'|'reset';
    onClick?:()=>void;
    loading?:boolean;
    disabled?:boolean;
    variant?:'primary'|'secondary'|'danger';
    className?:string;
}

const Button = ({
    text, 
    type = 'button',
    onClick,
    loading = false,
    disabled = false,
    variant = 'primary',
    className = '',
}: ButtonProps) => {
    const handleClick = () => {
        if (!loading && onClick) {
            onClick();
        }
    };

    const baseClass = 'px-4 py-2 rounded font-medium focus:outline-none transition-colors hover:cursor-pointer duration-200 disabled:cursor-not-allowed disabled:opacity-50';
    const variantClasses = {
        primary:
        'bg-primary text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed',

        secondary:
        'bg-success text-white hover:bg-success-hover disabled:opacity-50 disabled:cursor-not-allowed',

        danger:
        'bg-danger text-white hover:bg-danger-hover disabled:opacity-50 disabled:cursor-not-allowed',
    };
    
    return (
        <button 
            type={type} 
            onClick={handleClick} 
            disabled={disabled || loading} 
            className={`${baseClass} ${variantClasses[variant]} ${className}`}
        >
            {loading ? 'Loading...' : text}
        </button>
    );  
}

export default Button;