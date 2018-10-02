import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { HubConnection } from '@aspnet/signalr';
import { PersonRepository } from '../../repositories/PersonRepository';
import './index.css';
import * as Utils from '../../infrastructure/Utils';
import * as AppIcons from '../../AppIcon'
import { StatusFeedBox } from '../../components/StatusFeedBox/StatusFeedBox'
import { IShortPerson } from '../../Models/IShortPerson'
import { IStatusPost } from '../../Models/IStatusPost'
import { IPaging } from '../../Models/IPaging'
import * as Enums from '../../Enum/Enum'
import { StatusRepository } from '../../repositories/StatusRepository'
interface SettingProps {
    person: IShortPerson
}
interface SettingStates {

}
export class Setting extends React.Component<SettingProps, SettingStates> {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    public render() {
        return  <div className="Settings_form">
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-2">
                            <label className="Settings_form_Input_label">Name</label>
                        </div>
                        <div className="col-md-10">
                            <input type="text" placeholder="Name" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-2">
                            <label className="Settings_form_Input_label">Email</label>
                        </div>
                        <div className="col-md-10">
                            <input type="text" placeholder="Email" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-2">
                            <label className="Settings_form_Input_label">Experience</label>
                        </div>
                        <div className="col-md-10">
                            <input type="text" placeholder="Experience" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-2">
                            <label className="Settings_form_Input_label">Skills</label>
                        </div>
                        <div className="col-md-10">
                            <input type="text" placeholder="Skills" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-offset-2 col-md-10">
                            <div className="icheckbox_flat" style={{ position: "relative" }}>
                                <input type="checkbox" style={{ position: "absolute", top: "-20%", left: "-20%", display: "block", width: "140%", height: "140%", margin: "0px", padding: "0px", background: "rgb(255, 255, 255)", border: "0px", opacity: 0 }} />
                            </div>
                            <label className="Settings_form_checkbox_label">I agree to the terms and conditions</label>
                        </div>
                    </div>
                </div>
            </div>
    }
}
