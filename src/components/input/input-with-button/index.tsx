import { ReactNode } from "react";

interface IProps {
    containerStyle?: object;
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: Function;
    disableInput?: boolean;
    disableButton?: boolean;
    buttonStyle?: object;
    loading?: boolean;
    onClick?: Function;
    onFocus?: Function;
    Icon?: ReactNode;
    inputStyle?: object;
    isValid?: boolean;
    state?: string;
    ButtonComponent?: ReactNode;
}

/**
 * @TODO add statemachines or state handling for success, typing etc to keep it a controlled compone...
 * @TODO Icon Support
 */

const InputWithButton = ({ 
    containerStyle = {}, 
    type = 'text',
    placeholder = 'Enter Here',
    value = "",
    disableInput = false,
    disableButton = false,
    onChange = () => {},
    buttonStyle = {},
    inputStyle ={},
    onClick = () => {},
    onFocus = () => {},
    Icon = <></>,
    isValid = true,
    ButtonComponent = <></>,
 }: IProps) => {


    return <div style={{
        borderRadius: '30px',
        borderWidth: '1',
        display: 'flex',
        backgroundColor: "#ffff",
        width: '250px',
        padding: '10px',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...containerStyle,
        borderColor: isValid ? containerStyle['borderColor'] ?? 'transparent' : 'red'
    }}>

        <>
        {
            // icon
        }
        {Icon && Icon}
        </>
        
        <input 
            style={{
                borderWidth: '0px',
                backgroundColor: 'transparent',
                ...inputStyle
            }}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disableInput}
            onFocus={onFocus}
        />
        <button
            disabled = {disableButton}
            style={{
                borderRadius: "30px",
                backgroundColor: '#40739e',
                color: 'white',
                fontWeight: 'bold',
                borderWidth: '0px',
                padding: '10px',
                width: '80px',
                height: '35px',
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...buttonStyle
            }}
            onClick={onClick}
        >
            {ButtonComponent}
        </button>
    </div>
}

export default InputWithButton;