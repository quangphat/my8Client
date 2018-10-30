import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { HubConnection } from '@aspnet/signalr';
import './index.css';
import * as Utils from '../../infrastructure/Utils';
import * as AppIcons from '../../AppIcon'
import * as Models from '../../Models';
import * as Enum from '../../Enum/Enum'
import { PersonRepository } from '../../repositories/PersonRepository';
import { JobRepository } from '../../repositories/JobRepository';
import * as OptionList from '../../OptionList'
import * as components from '../../components';
//import { testxxx } from '../../components/testxxx/testxxx';

interface JobPostingStates {
    Friends: Models.IShortPerson[],
    TaggedFriends: Models.IShortPerson[],
    Job: Models.IJobPost
}
export class JobPosting extends React.Component<{}, JobPostingStates> {
    constructor(props) {
        super(props);
        this.state = {
            Friends: [],
            TaggedFriends: [],
            Job: new Object as Models.IJobPost
        };
    }
    public componentWillMount() {
    }

    public componentDidMount() {
        this.getListFriends();
    };
    private getListFriends() {
        let friends = Utils.getFriends();
        if (friends == null) {
            PersonRepository.GetTopFriend().then(response => {
                if (response.error == null) {
                    let persons = response.data as Models.IPersonAllin[]
                    this.setState({ Friends: friends })
                    Utils.setFriends(persons);
                }
            })
        }
        else {
            this.setState({ Friends: friends })
        }
    }
    private handleOnGetListFriend() {
        return new Promise(resolve => {
            let friends = this.state.Friends
            resolve(friends);
        })
    }
    private onSelectTag(item) {
        let TaggedFriends = this.state.TaggedFriends as Models.IShortPerson[]
        if (TaggedFriends == null) TaggedFriends = [];
        if (item) {
            let exists = TaggedFriends.findIndex(p => p.Id == item.Id);
            if (exists < 0) {
                TaggedFriends.push(item);
                this.setState({ TaggedFriends: TaggedFriends });
            }
        }
    }
    private renderTaggedFriend() {
        let TaggedFriends = this.state.TaggedFriends
        let render = null;
        if (TaggedFriends != null && TaggedFriends.length > 0) {
            if (TaggedFriends.length < 3)
                render = <div className="Status_tagging" >
                    <span> cùng với </span>
                    {TaggedFriends.map((item, index) => {
                        return index == 1 ? <span key={item.Id}> và <a href={item.ProfileName}> {item.DisplayName}</a></span> : <a href={item.ProfileName} key={item.Id} > {item.DisplayName}</a>
                    })
                    }
                </div>
            else
                render = < div className="Status_tagging" >
                    <span> cùng với </span>
                    <a href={TaggedFriends[0].ProfileName}>{TaggedFriends[0].DisplayName}</a> và <span>{TaggedFriends.length - 1} người khác</span>
                </div>
        }
        return render;
    }
    private onChangJobTitle( e) {
        if (e == null) return;
        let value = e.target.value;
        if (Utils.isNullOrEmpty(value)) return;
        let job = this.state.Job;
        job.Title = value;
        this.setState({ Job: job });
    }
    private onChangeCompanyName(e) {
        if (e == null) return;
        let value = e.target.value;
        if (Utils.isNullOrEmpty(value)) return;
        let job = this.state.Job ;
        job.CompanyName = value;
        this.setState({ Job: job });
    }
    private onChangeEmploymentType(value) {
        if (value == null) return;
        let job = this.state.Job;
        job.EmploymentType = value;
        this.setState({ Job: job });
    }
    private onChangeSeniorityType(value) {
        if (value == null) return;
        let job = this.state.Job;
        job.SeniorityType = value;
        this.setState({ Job: job });
    }

    private onChangeContent( value) {
        if (value == null) return;
        let job = this.state.Job;
        job.Content = value;
        this.setState({ Job: job });
    }
    private handleOnSelectFunction(item) {
        let job = this.state.Job
        if (Utils.isArrNullOrHaveNoItem(job.JobFunctionTags)) job.JobFunctionTags = []
        let exists = job.JobFunctionTags.find(p => p.Id == item.Id)
        if (Utils.isNullOrUndefined(exists)) {
            job.JobFunctionTags.push(item)
            this.setState({ Job: job });
        }
        
    }
    private onPostJob() {
        let job = this.state.Job;
        if (job == null) return;
        job.PersonTags = this.state.TaggedFriends;
        JobRepository.PostJob(job).then(response => {
            if (response.error == null) {
                console.log("success")
            }
        })
    }
    private submit() {
        console.log("submit")
    }
    public render() {
        let render = null;
        let datas = Utils.getFriends();
        let job = this.state.Job as Models.IJobPost
        //if (Utils.isNullOrUndefined(job)) return null
        //render = <div className="job-posting-container">
        //    <div className="form-group">
        //        <div className="row">
        //            <div className="col-xs-12 col-md-8">
        //                <label >Job title</label>
        //                <input type="text" className="form-control" onChange={(e)=>this.onChangJobTitle(e)} placeholder="Tiêu đề việc làm" />
        //            </div>
        //        </div>
        //    </div>
        //    <div className="form-group">
        //        <div className="row">
        //            <div className="col-xs-12 col-md-8">
        //                <label >Company name</label>
        //                <input type="text" className="form-control" onChange={(e)=>this.onChangeCompanyName(e)} placeholder="Tên công ty" />
        //            </div>
        //            <div className="col-xs-12 col-md-4">
        //                <label>Location</label>
        //                <input type="text" className="form-control" id="" placeholder="Địa điểm" />
        //            </div>
        //        </div>
        //    </div>
        //    <div className="form-group">
        //        <div className="row">
        //            <div className="col-xs-12 col-md-8">
        //                <label style={{ display: "block" }}>Job function</label>
        //                <Components.InputTextTagJobFunction
        //                    onSelect={(e)=>this.handleOnSelectFunction(e)}
        //                    itemsSelected={Utils.isNullOrUndefined(job) == true ? null : job.JobFunctionTags}
        //                    placeHolder="Add job function"
        //                    textboxClassName="form-control" />
        //            </div>
        //            <div className="col-xs-12 col-md-4" id="job-post-form">
        //                <label>Employment type</label>
        //                <Components.Combobox
        //                    data={OptionList.SeniorityLevels}
        //                    defaultValue={OptionList.SeniorityLevels[0].value.toString()}
        //                    isBlueScreen={false}
        //                    onChange={(e) => this.onChangeSeniorityType(e)}
        //                    className="" />
        //            </div>
        //        </div>
        //    </div>
        //    <div className="form-group">
        //        <div className="row">
        //            <div className="col-xs-12 col-md-8">
        //                <label style={{ display: "block" }}>Chi tiết</label>
        //                <Components.ContentEditable onChange={(e)=>this.onChangeContent(e)} hasBorder={true} placeHolder="Chi tiết công việc">
        //                </Components.ContentEditable>
        //            </div>
        //            <div className="col-xs-12 col-md-4" id="job-post-form">
        //                <label>Employment type</label>
        //                <Components.Combobox
        //                    data={OptionList.Employments}
        //                    defaultValue={OptionList.Employments[0].value.toString()}
        //                    isBlueScreen={false}
        //                    onChange={(e)=>this.onChangeEmploymentType(e)}
        //                    className="" />
        //            </div>
        //        </div>
        //    </div>
        //    <div className="row">
        //        <div className="col-md-12 col-sm-12 col-xs-12">
        //            {this.renderTaggedFriend()}
        //        </div>
        //    </div>
        //    <div className="form-group">
        //        <div className="row">
        //            <div className="col-xs-12 col-md-8">
        //                <label style={{ display: "block" }}>Thêm bạn bè vào bài viết này</label>
        //                <Components.InputTextTagFriend onSelect={(e)=>this.onSelectTag(e)} placeholder={'Thêm bạn bè của bạn vào bài viết'} className="form-control" />
        //            </div>
        //        </div>
        //    </div>

        //    <div className="form-group">
        //        <div className="row">
        //            <div className="col-xs-12 col-md-8">
        //                <label style={{ display: "block" }}>Location</label>
        //                <label>
        //                    <div id="tags">
        //                        <div className="inline-bl">
        //                            <input id="tag-typer" type="text" placeholder="+ Add tag..." />
        //                        </div>
        //                    </div>
        //                    <div className="tag-typer mt20">
        //                        <span className="tag"><span className="pointer">{AppIcons.svgCheck()}</span>such tage</span>
        //                        <span className="tag"><span className="pointer">{AppIcons.svgCloseTag()}</span>so color</span>
        //                        <span className="tag"><span className="pointer">{AppIcons.svgCloseTag()}</span>many type</span>
        //                        <span className="tag"><span className="pointer">{AppIcons.svgCloseTag()}</span>wow</span>
        //                    </div>
        //                </label>
        //            </div>
        //        </div>
        //    </div>
        //    <input type="button" value="Continue" onClick={()=>this.onPostJob()} className="btn btn-primary big-but" />
        //</div>
        render = <components.FormValidation submit={()=>this.submit()}>
            <div className={"form-group"}>
                <label
                    htmlFor={"email"}
                >
                    Email
                  </label>
                <input
                    id={"email"}
                    className={"form-control"}
                    required={true}
                    name={"email"}
                    type={"email"}
                />
                <small className="form-text text-muted">yeah</small>
                <div className="invalid-feedback" />
            </div>
            <div className={"form-group"}>
                <label
                    htmlFor={"password"}
                >
                    Password
                  </label>
                <input
                    id={"password"}
                    className={"form-control"}
                    required={true}
                    name={"password"}
                    type={"password"}
                    minLength={6}
                    pattern="(?=.*\d)(?=.*[a-z]).{6,}"
                />
                <small className="form-text text-muted">Must be at least 6 characters long, contain letters and numbers</small>
                <div className="invalid-feedback" />
            </div>
            <div className={"row justify-content-md-center"}>
                <div className={"col-sm-12"}>
                    <button
                        type="submit"
                        className={"btn btn-primary mb-2"}
                    >
                        Test submit!
                    </button>
                </div>
            </div>
        </components.FormValidation>
        return render;
    }
}
