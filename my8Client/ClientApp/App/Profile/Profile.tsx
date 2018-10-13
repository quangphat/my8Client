import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { HubConnection } from '@aspnet/signalr';
import { PersonRepository } from '../../repositories/PersonRepository';
import './index.css';
import * as Utils from '../../infrastructure/Utils';
import * as AppIcons from '../../AppIcon'
import * as Models from '../../Models';
import { Experience } from './Experience'
import { ActivityPost } from './ActivityPosts'
import { Setting } from './Setting'
import { JobPostings } from './JobPostings'
interface ProfileStates {
    person: Models.IShortPerson,
    hash: string
}
export class Profile extends React.Component<RouteComponentProps<any>, ProfileStates> {
    constructor(props) {
        super(props);
        let hash = this.getHash()
        this.state = {
            person: null,
            hash: hash
        };
    }

    public componentWillMount() {
        this.handleProps(this.props, true)
    }

    componentWillReceiveProps(newProps) {
        this.handleProps(newProps)
    }
    private getHash() {
        let hash = window.location.hash
        if (Utils.isNullOrEmpty(hash))
            hash = listTab[0].hash
        return hash
    }
    private getPersonProfile(profileName) {
        PersonRepository.GetPersonProfile(profileName).then(response => {
            if (response.error == null) {
                this.setState({ person: response.data })
            }
        })
    }
    private handleProps(props, isInit: boolean = false) {
        if (this.props.location.hash != props.location.hash) {
            let hash = this.getHash()
            this.setState({ hash: hash })
        }
        if (isInit || this.props.location.pathname != props.location.pathname) {
            let profileName = props.match.params.profilename
            if (profileName) {
                this.getPersonProfile(profileName)

            }
        }
    }

    public componentDidMount() {

    };
    getResult(options) {
        let x = options;
    }
    private resultantImage(this) {
        let el = this.refs.reactCroppie
        //el.croppie('result', {
        //    type: 'rawcanvas',
        //    circle: true,
        //    // size: { width: 300, height: 300 },
        //    format: 'png'
        //}).then(function (canvas) {

        //});
        el.result({ format: 'base64', size: { width: 100, height: 100 } }).then(function (resp) {
            console.log(resp);
            var image = new Image();
            image.src = resp;
            document.body.appendChild(image);
        });

    }
    private setHash(hash) {

    }
    private renderLeft(person: Models.IShortPerson) {
        let render = null;
        render = <div className="colleft-twocolumn info-about-yourself">
            <div className="box box-primary">
                <div className="box-body box-profile">
                    <img className="profile-user-img img-responsive img-circle" src={Utils.GetCurrentUserAvatar100()} alt="User profile picture" />

                    <h3 className="profile-username text-center">{person.DisplayName}</h3>

                    <p className="text-muted text-center">{person.WorkAs}</p>
                    <div className="user-function-button">
                        <a href="#" className="btn btn-friend">Follow</a>
                        <a href="#" className="btn btn-rate" id="Show_Modal_input">Rate</a>
                    </div>
                    <ul className="list-group list-group-unbordered">
                        <li className="list-group-item">
                            <b>Followers</b> <a className="pull-right">1,322</a>
                        </li>
                        <li className="list-group-item">
                            <b>Following</b> <a className="pull-right">543</a>
                        </li>
                        <li className="list-group-item">
                            <b>Friends</b> <a className="pull-right">13,287</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="clearfix" />
            <div className="info_about_yourself_bottom">
                <div className="info_about_yourself_bottom_tittle">
                    About Me
                    </div>
                <div className="info_about_yourself_bottom_infolist">
                    <div className="info_about_yourself_bottom_info_item">
                        <div className="info_about_yourself_bottom_info_title">
                            <i className="fa fa-book margin-r-5"></i>  Education
                            </div>
                        <div className="info_about_yourself_bottom_info_Content">
                            B.S. in Computer Science from the University of Tennessee at Knoxville
                            </div>
                    </div>
                    <div className="info_about_yourself_bottom_info_item">
                        <div className="info_about_yourself_bottom_info_title">
                            <i className="fa fa-book margin-r-5"></i>  Education
                            </div>
                        <div className="info_about_yourself_bottom_info_Content">
                            B.S. in Computer Science from the University of Tennessee at Knoxville
                            </div>
                    </div>
                    <div className="info_about_yourself_bottom_info_item">
                        <div className="info_about_yourself_bottom_info_title">
                            <i className="fa fa-book margin-r-5"></i>  Education
                            </div>
                        <div className="info_about_yourself_bottom_info_Content">
                            B.S. in Computer Science from the University of Tennessee at Knoxville
                            </div>
                    </div>
                </div>
                <div className="about_company">
                    <div className="logo_info_Company">
                        <img src="Image/Logo.png" />
                    </div>
                    <div className="Name_company">
                        CÔNG TY XXXXX
                        </div>
                    <div className="Adress_and_info_contact">
                        <span><b>Trụ sở chính:</b> 184 Hồng Hà, P.9, Q. Phú Nhuận, TP. HCM</span><br />
                        <span><b>Điện thoại:</b> 090.909.0909</span><br />
                    </div>
                </div>
            </div>
        </div>
        return render;
    }

    private renderTabs(hash: string) {
        return <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
                {listTab.map(tab => {
                    let className = tab.hash == hash ? 'active' : ''
                    return <li key={tab.hash} className={className} onClick={() => window.location.hash = tab.hash}><a>{tab.name}</a></li>
                })
                }
            </ul>
        </div>
    }
    private renderTabContent() {
        let content = null
        if (this.state.hash == listTab[0].hash)
            content = <Experience person={this.state.person} />
        //else if (this.state.hash == listTab[1].hash)
        //    content = null;
        else if (this.state.hash == listTab[1].hash)
            content = <JobPostings person={this.state.person} />;
        else if (this.state.hash == listTab[2].hash)
            content = <ActivityPost person={this.state.person} />;
        else if (this.state.hash == listTab[3].hash)
            content = <Setting person={this.state.person} />;
        return <div className="tab-panel active">
            {content}
        </div>
    }
    private renderRight() {
        let render = null;
        render = <div className="colright-twocolumn content_right_activity_timeline_Settings">
            <div className="control_on_content_right">
                {this.renderTabs(this.state.hash)}
                {this.renderTabContent()}
            </div>
        </div>
        return render;
    }
    public render() {
        let render = null;
        let person = this.state.person
        if (person == null) return null
        render = <div className="profile_content">
            {this.renderLeft(person)}
            {this.renderRight()}
        </div>
        return render;
    }
}
const listTab = [
    { name: "Kinh nghiệm", hash: '#experiences' },
    //{ name: 'Học vấn', hash: '#educations' },
    { name: "Việc làm", hash: '#jobs' },
    { name: "Hoạt động", hash: '#activities' },
    { name: "Cài đặt", hash: '#setting' },
]