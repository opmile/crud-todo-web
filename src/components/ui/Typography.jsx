const variantToTag = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    body: 'p',
    caption: 'span',
}

const variantToClassName = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-medium opacity-80',
    body: 'text-base',
    caption: 'text-sm text-gray-500',
}

const Typography = ({ variant = 'body', children, className = "" }) => {
    const Component = variantToTag[variant] ?? "p"
    const style = variantToClassName[variant] ?? vriantToClassName.body

    return (
        <Component className={`${style} ${className}`}>
            {children}
        </Component>
    )
}

export default Typography