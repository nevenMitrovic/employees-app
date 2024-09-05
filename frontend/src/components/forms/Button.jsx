
const Button = ({ text, color, hoverColor, textSize, buttonType, func, width = 'w-[70px]' }) => {
    return (
        <button
            type={buttonType}
            className={`text-white ${color} hover:${hoverColor} font-medium rounded-lg ${textSize} px-2 py-2 ${width}`}
            onClick={func}
        >
            { text }
        </button>
    )
}

export default Button