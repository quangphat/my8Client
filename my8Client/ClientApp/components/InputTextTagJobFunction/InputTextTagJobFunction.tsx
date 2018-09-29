import * as React from 'react';
import * as AppIcons from '../../AppIcon';
import * as Utils from '../../infrastructure/Utils';
import * as Models from '../../Models';
import { JobRepository } from '../../repositories/JobRepository'
import './index.css'
import debounce from 'lodash/debounce';


interface InputTextTagJobFunctionProps {
    placeHolder?: string,
    className?: string,
    textboxClassName?: string,
    onSelect: Function,
    itemsSelected: Models.IJobFunction[]
}
export class InputTextTagJobFunction extends React.Component<InputTextTagJobFunctionProps, {}>{
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
        this.setFocus = this.setFocus.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnFocus = this.handleOnFocus.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
    }
    static defaultProps = {
        placeHolder: 'Add job function'
    }
    componentWillMount(this) {
        this.handleOnChange = debounce(this.handleOnChange, 500)
    }
    public componentDidMount(this) {
        //this.getJobFunctions();
    }
    
    public setFocus(this) {
        this.ref_component.setFocus()

        let self = this

        setTimeout(() => {
            self.handleOnChange(this.state.search)
        }, 50)
    }
    public componentWillReceiveProps(this, nextProps: InputTextTagJobFunctionProps) {
        if (this.props.itemsSelected != nextProps.itemsSelected) {
            this.setState({ itemsSelected: nextProps.itemsSelected})
        }
    }
    private getJobFunctions(this,value) {
        return new Promise(resolve => {
            JobRepository.GetJobFunction(value).then(response => {
                if (response.error == null) {
                    let data = response.data as Models.IJobFunction[]
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
            .then((data: Models.IJobFunction[]) => {
                this.setState({ search: null, jobFunctions: data, selecting_index: 0, is_selecting: true })
            })
    }
    private handleOnChange(value) {
        this.handleOnChangeDebounce(value)
    }
    private handleOnFocus(this) {
        if (Utils.isNullOrEmpty(this.state.search)) {
            this.setState({ is_selecting: false, search: '' })
        }
        else
            this.setState({ is_selecting: true })

        let self = this

        setTimeout(() => {
            self.handleOnChange(this.state.search)
        }, 50)
    }
    private handleOnBlur(this) {
        this.setState({ search: '' });
        let refJobFunction = this.refs.refJobFunction
        refJobFunction.value = '';
        refJobFunction.defaultValue = ''
    }
    private handleOnKeyDown(this, e, value: string) {
        if (e.key == 'Enter') {
            let selecting_index = this.state.selecting_index

            let selectedValue = null

            if (selecting_index > -1) {
                let jobFunctions = this.state.jobFunctions as Models.IJobFunction[]

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
            let jobFunctions = this.state.jobFunctions as Models.IJobFunction[]

            if (selecting_index != -1 && jobFunctions != null && jobFunctions.length > selecting_index + 1) {
                selecting_index = selecting_index + 1
            } else {
                selecting_index = -1
            }

            this.setState({ selecting_index: selecting_index })

            e.stopPropagation()
        } else if (e.key == 'ArrowUp') {
            let selecting_index = this.state.selecting_index
            let jobFunctions = this.state.jobFunctions as Models.IJobFunction[]

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
        refJobFunction.value = '';
        refJobFunction.defaultValue = ''
        refJobFunction.focus();
    }
    private onSwitch(this) {
        let status = this.state.allowInput
        this.setState({ allowInput: !status });
    }

    private renderInputSelect(this, status) {
        return status == false ? <div className="multiple-select mb10" onClick={this.onSwitch.bind(this)} >
            <div className="">
                <span className="pointer">{AppIcons.svgPlus("16px", "16px")}</span>
                <span className="ad-new-selection-label-text">{this.props.placeHolder}</span>
            </div>
        </div>
            : <div className="input-select mb10">
                <input type="text" placeholder={this.props.placeHolder} autoFocus={true} onChange={null} />
            </div>
    }
    private renderSelectedDatas(this, datas: Models.IJobFunction[]) {
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
    public render(this) {
        let render = null;
        let status = this.state.allowInput as boolean;
        let jobFunctions = this.state.jobFunctions as Models.IJobFunction[]
        let is_selecting = this.state.is_selecting
        let search = this.state.search as string
        let selecting_index = this.state.selecting_index as number
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
                {jobFunctions.map((item: Models.IJobFunction, index: number) => {
                    return <li key={item.Id}
                        onClick={this.handleOnSelect.bind(this,item)}
                        value={item.Id}>
                        {item.Display}
                    </li>})
                }
            </ul>
        }
        render = <div className={`select-job-function ${this.props.className}`}>
            {status == false ? <div className="multiple-select" onClick={this.onSwitch.bind(this)} >
                <div className="">
                    <span className="pointer">{AppIcons.svgPlus("16px", "16px")}</span>
                    <span className="ad-new-selection-label-text">{this.props.placeHolder}</span>
                </div>
            </div>
                : <div className="input-select">
                    <input type="text" ref="refJobFunction" className={this.props.textboxClassName} placeholder={this.props.placeHolder} autoFocus={true}
                        onFocus={this.handleOnFocus}
                        onBlur={this.handleOnBlur}
                        onKeyDown={this.handleOnKeyDown}
                        onChange={(e) => this.handleOnChange(e.target.value)} />
                    
                </div>}
            {renderListFunction}
            {this.renderSelectedDatas(this.state.itemsSelected)}
        </div>
        return render;
    }
}