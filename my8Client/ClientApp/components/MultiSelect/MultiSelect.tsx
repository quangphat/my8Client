import * as React from 'react';
import * as AppIcons from '../../AppIcon'
import * as Utils from '../../infrastructure/Utils';
import * as Models from '../../Models'
import './index.css'


interface MultiSelectProps {
    datas: Array<any>,
    title: string
}
export class MultiSelect extends React.Component<MultiSelectProps, {}>{
    constructor(props) {
        super(props);
        this.state = {
            selectedDatas: [],
            allowInput: false
        }
    }
    public componentWillReceiveProps(this, nextProps: MultiSelectProps) {
    }
    private onSwitch(this) {
        let status = this.state.allowInput
        this.setState({ allowInput: !status });
    }
    private renderInputSelect(this, status) {
        return status == false ? <div className="multiple-select mb10" onClick={this.onSwitch.bind(this)} >
            <div className="">
                <span className="pointer">{AppIcons.svgPlus("16px", "16px")}</span>
                <span className="ad-new-selection-label-text">{this.props.title}</span>
            </div>
        </div>
            : <div className="input-select mb10">
                <input type="text" placeholder={this.props.title} autoFocus={true} onChange={null} />
            </div>
    }
    private renderSelectedDatas(this, datas: Models.IShortPerson[]) {
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
    public render(this) {
        let render = null;
        let allowInput = this.state.allowInput as boolean;
        let datas = this.props.datas as Models.IShortPerson[]
        render = <div>
            {this.renderInputSelect(allowInput)}
            {this.renderSelectedDatas(datas)}
        </div>
        return render;
    }
}