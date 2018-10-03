import * as React from 'react';
import * as classnames from 'classnames';
import * as AppICons from '../../AppIcon';
import { CreateSVG } from '../CreateSVG'
import './index.css';

interface IInputCheckboxProps {
    nameInput: string,
    className?: string,
    content?: any,
    isChecked?: boolean,
    isRequired?: boolean,
    isReadOnly?: boolean,
    isDisabled?: boolean,
    handleOnChange?: Function,
    iconCheck?: string
}

interface IInputCheckboxStates {
    isChecked: boolean,
    iconCheck: string
}

export class InputCheckbox extends React.Component<IInputCheckboxProps, IInputCheckboxStates> {
    constructor(props: any) {
        super(props)

        this.state = {
            isChecked: this.props.isChecked || false,
            iconCheck: this.props.iconCheck || '#next-icon-checkmark'
        }
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    static defaultProps = {
        isDisabled: false,
        iconCheck: '#next-icon-checkmark'
    }

    componentWillReceiveProps(newProps) {
        if (this.props.isChecked != newProps.isChecked || this.props.iconCheck != newProps.iconCheck) {
            this.setState({
                isChecked: newProps.isChecked,
                iconCheck: newProps.iconCheck
            })
        }
    }

    handleOnChange(e) {
        let { isChecked } = this.state
        this.setState({
            isChecked: !isChecked
        }, () => {
            if (this.props.handleOnChange)
                this.props.handleOnChange(this.state.isChecked)
        })
    }

    public render() {
        let { nameInput, className, content, isRequired, isReadOnly, isDisabled } = this.props;
        let classes = classnames({
            'next-input-checkbox': true,
            [className]: className,
            'input-disabled': isDisabled
        });

        return (
            <div className={classes}>
                <label className='next-label--switch' htmlFor={nameInput} >{content}</label>
                <input className='next-checkbox'
                    type='checkbox' name={nameInput} id={nameInput} checked={this.state.isChecked}
                    disabled={isDisabled} required={isRequired} readOnly={isReadOnly}
                    onChange={(e) => { this.handleOnChange(e) }}
                />
                <span className='next-checkbox--styled'>
                    <CreateSVG size={10} className='checkmark' linkHref={this.state.iconCheck} />
                </span>
            </div>
        );
    }
}