import * as React from 'react';
import * as FormatHelper from '../../infrastructure/FormatHelper';
import './index.css'

interface IFormProps {
    className?: string,
    submit: Function
}
interface IFormStates {
    isValidated: boolean
}


export class FormValidation extends React.Component<IFormProps, IFormStates> {
    constructor(props) {
        super(props);

        this.state = {
            isValidated: false
        }
    }
    formEl = null
    validate(){
        const formEl = this.formEl;
        const formLength = formEl.length;
        if (formEl.checkValidity() === false) {
            for (let i = 0; i < formLength; i++) {
                debugger
                const elem = formEl[i];
                const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
                if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
                    if (!elem.validity.valid) {
                        errorLabel.textContent = elem.validationMessage;
                    } else {
                        errorLabel.textContent = "";
                    }
                }
            }
            return false;
        } else {
            for (let i = 0; i < formLength; i++) {
                const elem = formEl[i];
                const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
                if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
                    errorLabel.textContent = "";
                }
            }
            return true;
        }
    }

    submitHandler(e){
        e.preventDefault();
        if (this.validate()) {
            this.props.submit();
        }

        this.setState({ isValidated: true });
    }
    render() {
        const props = { ...this.props };
        let classNames = this.props.className;
        if (this.state.isValidated) {
            classNames += " was-validated";
        }
        return <form
                className={classNames}
                noValidate
                ref={form => (this.formEl = form)}
                onSubmit={(e)=>this.submitHandler(e)}
            >
                {this.props.children}
            </form>
    }
}