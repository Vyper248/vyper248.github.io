import StyledInputCheckbox from './InputCheckbox.style';

type InputCheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}

const InputCheckbox = ({label, checked, onChange}: InputCheckboxProps) => {
    const onClick = () => {
        onChange(!checked);
    }

    return (
        <StyledInputCheckbox checked={checked}>
            <label>{label}</label>
            <div className='container' onClick={onClick}>
                <div className='circle'></div>
            </div>
        </StyledInputCheckbox>
    );
}

export default InputCheckbox;