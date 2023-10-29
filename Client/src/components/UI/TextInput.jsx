
const TextInput = ({
    label,
    name,
    type,
    value,
    onChange,
    error,
    minLength
}) => {
    return (
        <div className="input">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                minLength={minLength ? minLength : null}
                required/> 
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default TextInput;
