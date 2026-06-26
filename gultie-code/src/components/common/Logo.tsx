
type LogoProps = {
    className?: string;
};

const Logo = ({ className = "" }: LogoProps) =>{
    const classes = `rounded-full bg-primary text-white dark:text-white flex items-center justify-center font-bold ${
        className || "h-20 w-20 mb-8 text-2xl"
    }`;

    return(
        <div className={classes}>
            GC
        </div>
    );
}

export default Logo;