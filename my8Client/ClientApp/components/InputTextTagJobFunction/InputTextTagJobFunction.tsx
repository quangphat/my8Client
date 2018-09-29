import * as React from 'react';
import * as AppIcons from '../../AppIcon';
import * as Utils from '../../infrastructure/Utils';
import { IJobFunction } from '../../Models/IJobFunction';
import { JobRepository } from '../../repositories/JobRepository'
import { Input } from '../Input/Input'
import './index.css'
import debounce from 'lodash/debounce';


interface InputTextTagJobFunctionProps {
    placeHolder?: string,
    className?: string,
    textboxClassName?: string,
    onSelect: Function,
    itemsSelected: IJobFunction[]
}
interface InputTextTagJobFunctionStates {
    jobFunctions: IJobFunction[],
    itemsSelected: IJobFunction[],
    allowInput: boolean,
    is_selecting: boolean,
    search: string,
    selecting_index: number,
}
export class InputTextTagJobFunction extends React.Component<InputTextTagJobFunctionProps, InputTextTagJobFunctionStates>{
    constructor(props) {
        super(props);
        this.state = {
            jobFunctions: [],
            itemsSelected: this.props.itemsSelected,
            allowInput: false,
            is_selecting: false,
            search: '',
            selecting_index: null as number,
        }
        this.handleOnChangeDebounce = debounce(this.handleOnChangeDebounce, 500)
    }
    static defaultProps = {
        placeHolder: 'Add job function'
    }
    componentWillMount() {
        
    }
    public componentDidMount() {
        //this.getJobFunctions();
    }

    public setFocus(this) {
        this.ref_component.setFocus()

        let self = this

        setTimeout(() => {
            self.handleOnChange(this.state.search)
        }, 50)
    }
    public componentWillReceiveProps(nextProps: InputTextTagJobFunctionProps) {
        if (this.props.itemsSelected != nextProps.itemsSelected) {
            this.setState({ itemsSelected: nextProps.itemsSelected })
        }
    }
    componentWillUnmount(this) {
        this.handleOnChangeDebounce.cancel()
    }
    private getJobFunctions(value) {
        return new Promise(resolve => {
            JobRepository.GetJobFunction(value).then(response => {
                if (response.error == null) {
                    let data = response.data as IJobFunction[]
                    resolve(data);
                }
                else {

                }
            })
        });

    }
    private handleOnChangeDebounce(value) {
        if (Utils.isNullOrEmpty(value)) {
            this.setState({ is_selecting: false, search: '' })
            return;
        }
        this.getJobFunctions(value)
            .then((data: IJobFunction[]) => {
                this.setState({ search: '', jobFunctions: data, selecting_index: 0, is_selecting: true })
            })
    }
    private handleOnChange(e) {
        if (e == null) return
        this.handleOnChangeDebounce(e.target.value)
    }
    private handleOnFocus() {
        if (Utils.isNullOrEmpty(this.state.search)) {
            this.setState({ is_selecting: false, search: '' })
        }
        else
            this.setState({ is_selecting: true })
            this.handleOnChangeDebounce(this.state.search)
    }
    private handleOnBlur(this) {
        this.setState({ search: '' });
        let refJobFunction = this.refs.refJobFunction
    }
    private handleOnKeyDown(this, e, value: string) {
        if (e.key == 'Enter') {
            let selecting_index = this.state.selecting_index

            let selectedValue = null

            if (selecting_index > -1) {
                let jobFunctions = this.state.jobFunctions as IJobFunction[]

                if (jobFunctions != null && jobFunctions.length > selecting_index) {
                    selectedValue = jobFunctions[selecting_index]
                }
            } else {
                selectedValue = value
            }

            if (selectedValue != null) {
                let self = this

                setTimeout(() => {
                    self.handleOnSelect(selectedValue)
                }, 50)
            }
        } else if (e.key == 'ArrowDown') {
            let selecting_index = this.state.selecting_index
            let jobFunctions = this.state.jobFunctions as IJobFunction[]

            if (selecting_index != -1 && jobFunctions != null && jobFunctions.length > selecting_index + 1) {
                selecting_index = selecting_index + 1
            } else {
                selecting_index = -1
            }

            this.setState({ selecting_index: selecting_index })

            e.stopPropagation()
        } else if (e.key == 'ArrowUp') {
            let selecting_index = this.state.selecting_index
            let jobFunctions = this.state.jobFunctions as IJobFunction[]

            if (jobFunctions != null) {
                if (selecting_index - 1 > 0) {
                    selecting_index = selecting_index - 1
                } else {
                    selecting_index = 0
                }
            } else {
                selecting_index = -1
            }

            this.setState({ selecting_index: selecting_index })

            e.stopPropagation()
        }
    }
    private handleOnSelect(this, value) {
        if (Utils.isNullOrUndefined(value)) return;
        this.props.onSelect(value)
        this.setState({ search: '', is_selecting: false });
        let refJobFunction = this.refs.refJobFunction
        this.handleOnFocus()
    }
    private onSwitch() {
        let status = this.state.allowInput
        this.setState({ allowInput: !status });
    }

    private renderInputSelect(status) {
        return status == false ? <div className="multiple-select mb10" onClick={()=>this.onSwitch()} >
            <div className="">
                <span className="pointer">{AppIcons.svgPlus("16px", "16px")}</span>
                <span className="ad-new-selection-label-text">{this.props.placeHolder}</span>
            </div>
        </div>
            : <div className="input-select mb10">
                <input type="text" placeholder={this.props.placeHolder} autoFocus={true} onChange={null} />
            </div>
    }
    private renderSelectedDatas(datas:IJobFunction[]) {
        let render = null;
        if (!Utils.isArrNullOrHaveNoItem(datas)) {
            render = <div className="tag-typer">
                {
                    datas.map((item, index) => {
                        return <span className="tag" key={item.Id}><span className="pointer">{AppIcons.svgCheck()}</span>{item.Display}</span>
                    })
                }
            </div>
        }
        return render;
    }
    public render() {
        let render = null;
        let status = this.state.allowInput;
        let jobFunctions = this.state.jobFunctions
        let is_selecting = this.state.is_selecting
        let search = this.state.search
        let selecting_index = this.state.selecting_index
        let renderListFunction = null
        if (is_selecting) {
            let canSelectIndexByKey = false

            if (search != '') {
                canSelectIndexByKey = true

                if (selecting_index >= jobFunctions.length) {
                    selecting_index = 0
                }
            }

            renderListFunction = <ul className="suggestion">
                {jobFunctions.map((item: IJobFunction, index: number) => {
                    return <li key={item.Id}
                        onClick={this.handleOnSelect.bind(this, item)}
                        value={item.Id}>
                        {item.Display}
                    </li>
                })
                }
            </ul>
        }
        render = <div className={`select-job-function ${this.props.className}`}>
            {status == false ? <div className="multiple-select" onClick={()=>this.onSwitch()} >
                <div className="">
                    <span className="pointer">{AppIcons.svgPlus("16px", "16px")}</span>
                    <span className="ad-new-selection-label-text">{this.props.placeHolder}</span>
                </div>
            </div>
                : <div className="input-select">
                    <Input type="text" placeholder={this.props.placeHolder}
                        className="form-control"
                        ref="refJobFunction"
                        value={this.state.search}
                        autoFocus={true}
                        onFocus={() => this.handleOnFocus()}
                        onBlur={this.handleOnBlur.bind(this)}
                        OnKeyPress={this.handleOnKeyDown.bind(this)}
                        onChange={(e) => this.handleOnChange(e)}
                    />
                    {/*<input type="text" ref="refJobFunction" className={this.props.textboxClassName} placeholder={this.props.placeHolder} autoFocus={true}
                        onFocus={() => this.handleOnFocus()}
                        onBlur={this.handleOnBlur}
                        onKeyDown={this.handleOnKeyDown.bind(this)}
                        onChange={(e) => this.handleOnChange(e)} />*/}

                </div>}
            {renderListFunction}
            {this.renderSelectedDatas(this.state.itemsSelected)}
        </div>
        return render;
    }
}