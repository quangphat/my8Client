import * as React from 'react';
export declare type typeInput = 'text' | 'number';
export declare type typeClass = 'string' | 'money' | 'number';

interface IInputProps {
    placeholder?: string,
    name?: string,
    onChange?: Function,
    onFocus?: Function,
    onBlur?: Function,
    OnKeyPress?: Function,
    className?: string,
    prefix?: any,
    suffix?: any,
    value?: any,
    id?: string,
    type?: typeInput,
    typeClass?: typeClass,
    isDisabled?: boolean,
    isReadOnly?: boolean,
    noneBorder?: boolean,
    pattern?: string,
    min?: number,
    max?: number,
    step?: number,
    alwayResetData?: boolean,
    autoFocus?: boolean
}

export interface IInputStates {
    value?: any;
    isFocus: boolean;
}

export class Input extends React.Component<IInputProps, IInputStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            value: this.props.value || (this.props.type == 'text' || this.props.type == undefined ? '' : 0),
            isFocus: false,
        }

        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    static defautlProps = {
        type: 'text'
    }

    componentWillReceiveProps(newProps) {
        if (this.props.alwayResetData == true) {
            this.setState({
                value: newProps.value
            })
        }
        else if (this.props.value != newProps.value) {
            this.setState({
                value: newProps.value
            })
        }
    }

    handleOnChange(e) {
        let value = e.target.value
        this.setState({
            value: value
        })

        if (this.props.onChange)
            this.props.onChange(e)
    }

    handleOnFocus(e) {
        this.setState({
            isFocus: true
        })

        if (this.props.onFocus)
            this.props.onFocus(e)
    }

    handleOnBlur(e) {
        this.setState({
            isFocus: false
        })

        if (this.props.onBlur)
            this.props.onBlur(e)
    }

    handleKeyPress(e) {
        if (this.props.OnKeyPress)
            this.props.OnKeyPress(e)

        this.setState({
            isFocus: false,
        })
    }

    render() {
        const { type, id, placeholder, name, prefix, suffix, className, isDisabled, isReadOnly, pattern, min, max, step } = this.props
        let { value } = this.state

        return <div>
            <input type={type} id={id} autoFocus={this.props.autoFocus == true ? true : false}
                className={this.props.className} placeholder={placeholder} value={this.state.value}
                disabled={isDisabled}
                readOnly={isReadOnly} name={name}
                onChange={(e) => this.handleOnChange(e)}
                onFocus={(e) => this.handleOnFocus(e)}
                onBlur={(e) => this.handleOnBlur(e)}
                onKeyPress={(e) => this.handleKeyPress(e)}
                pattern={pattern}
                min={min != undefined ? min : null}
                max={max != undefined ? max : null}
                step={step ? step : 1}
            />
        </div>
    }
}
