import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as ReactDOM from 'react-dom';
import * as Utils from '../../infrastructure/Utils';
import * as Models from '../../Models'
import './index.css'


interface ComboboxProps {
    defaultValue?: string,
    data: Array<object>,
    onChange?: Function,
    onSelect?: Function,
    selectButton?: Function,
    valueFieldName?: string,
    displayFieldName?: string,
    isBlueScreen?: boolean,
    className?: string,
    classNameInside?: string,
    allowSelect?: boolean,
    is_opening?: boolean
}
interface ComboboxStates {
    defaultValue: string,
    data: Array<object>,
    valueFieldName: string,
    displayFieldName: string,
    isBlueScreen: boolean,
    is_selecting: boolean,
    allowSelect: boolean
}
interface ComboboxOptionProps {
    key: string,
    data: object
}
export class Combobox extends React.Component<ComboboxProps, ComboboxStates> {
    constructor(props) {
        super(props)

        let defaultValue: string = this.props.defaultValue
        let data:ComboboxOptionProps[] = []
        let valueFieldName = this.props.valueFieldName != null ? this.props.valueFieldName : 'value'
        let displayFieldName = this.props.displayFieldName != null ? this.props.displayFieldName : 'display'
        let allowSelect = this.props.allowSelect != null ? this.props.allowSelect : true
        let is_opening = this.props.is_opening != null ? this.props.is_opening : false
        if (this.props.data != null && this.props.data.length > 0) {
            this.props.data.map(a => data.push({
                key: Utils.getNewGuid(),
                data: a
            }))

            if (defaultValue == null) {
                defaultValue = data[0].data[valueFieldName]
            }
        }

        this.state = {
            defaultValue: defaultValue,
            data: data,
            valueFieldName: valueFieldName,
            displayFieldName: displayFieldName,
            isBlueScreen: this.props.isBlueScreen != null ? this.props.isBlueScreen : true,
            is_selecting: is_opening,
            allowSelect: allowSelect
        }
    }
    
    componentDidMount() {
        this.callOnChange(this.state.defaultValue)
    }
    public componentWillReceiveProps(nextProps: ComboboxProps) {
        if (this.props.is_opening != nextProps.is_opening)
            this.setState({ is_selecting: nextProps.is_opening });
    }
    private handleOnChange(event) {
        this.callOnChange(event.target.value)
    }
    private handleOnSelectAction(option: ComboboxOptionProps) {
        if (this.props.onSelect != null) {
            this.props.onSelect(Utils.deepClone(option.data))
        }

        this.setState({ is_selecting: false })
    }

    private callOnChange(value) {
        if (this.props.onChange != null) {
            this.props.onChange(value)
        }
    }

    private handleOnClickSelectAcion() {
        this.setState({ is_selecting: !this.state.is_selecting })
    }

    public render() {
        let className = 'input-select'
        let classNameSvg = ''

        if (this.state.isBlueScreen) {
            className += ' blue-screen'
            classNameSvg += ' fill-white'
        }

        if (this.props.className != null) {
            className += ' ' + this.props.className
        }

        return this.props.onSelect != null
            ? this.renderSelectAction(className, classNameSvg)
            : this.renderDefault(className, classNameSvg)
    }
    private renderDefault(className: string, classNameSvg: string) {
        let classNameInside = ''

        if (this.props.classNameInside) {
            classNameInside += ' ' + this.props.classNameInside
        }

        return <div className={className}>
            <select className={classNameInside} onChange={(e) => this.handleOnChange(e)}
                defaultValue={this.state.defaultValue} disabled={!this.state.allowSelect} >
                {this.state.data.map((a: ComboboxOptionProps, index: number) =>
                    <option key={a.key} value={a.data[this.state.valueFieldName]}>
                        {a.data[this.state.displayFieldName]}
                    </option>)}
            </select>
            <svg className={classNameSvg} viewBox='0 0 24 24' style={{ width: '20px', height: '100%' }}>
                <path d='M7 10l5 5 5-5z'></path>
                <path d='M0 0h24v24H0z' fill='none'></path>
            </svg>
        </div>
    }
    private renderSelectAction( className: string, classNameSvg: string) {
        return <div className={className + ' input-select-action'}>
            <a className='block-display' onClick={()=>this.handleOnClickSelectAcion()}>{this.props.selectButton()}</a>
            <div className={'input-select-action-wrapper text-smaller' + (this.state.is_selecting ? ' is_selecting' : '')}>
                {this.state.data.map((a: ComboboxOptionProps, index: number) =>
                    <div key={a.key}
                        onClick={()=>this.handleOnSelectAction(a)}
                        className='input-select-action-item pointer'>
                        {a.data[this.state.displayFieldName]}
                    </div>)}
            </div>
        </div>
    }
}