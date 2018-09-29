import * as React from 'react';
import * as AppIcons from '../../AppIcon'
import * as Utils from '../../infrastructure/Utils';
import { IShortPerson } from '../../Models/IShortPerson'
import './index.css'


interface MultiSelectProps {
    datas: Array<any>,
    title: string
}
interface MultiSelectStates {
    selectedDatas: Array<any>,
    allowInput: boolean
}
export class MultiSelect extends React.Component<MultiSelectProps, MultiSelectStates>{
    constructor(props) {
        super(props);
        this.state = {
            selectedDatas: [],
            allowInput: false
        }
    }
    public componentWillReceiveProps(nextProps: MultiSelectProps) {
    }
    private onSwitch() {
        let status = this.state.allowInput
        this.setState({ allowInput: !status });
    }
    private renderInputSelect(status) {
        return status == false ? <div className="multiple-select mb10" onClick={()=>this.onSwitch()} >
            <div className="">
                <span className="pointer">{AppIcons.svgPlus("16px", "16px")}</span>
                <span className="ad-new-selection-label-text">{this.props.title}</span>
            </div>
        </div>
            : <div className="input-select mb10">
                <input type="text" placeholder={this.props.title} autoFocus={true} onChange={null} />
            </div>
    }
    private renderSelectedDatas(datas: IShortPerson[]) {
        let render = null;
        if (datas.length) {
            render = <div className="tag-typer">
                {
                    datas.map((item, index) => {
                        return <span className="tag" key={item.Id}><span className="pointer">{AppIcons.svgCheck()}</span>{item.DisplayName}</span>
                    })
                }
            </div>
        }
        return render;
    }
    public render() {
        let render = null;
        let allowInput = this.state.allowInput;
        let datas = this.props.datas
        render = <div>
            {this.renderInputSelect(allowInput)}
            {this.renderSelectedDatas(datas)}
        </div>
        return render;
    }
}