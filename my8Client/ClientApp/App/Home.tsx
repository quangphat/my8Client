import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { FeedRepository } from '../repositories/FeedRepository';
import { JobRepository } from '../repositories/JobRepository';
import { StatusRepository } from '../repositories/StatusRepository';
import * as Utils from '../infrastructure/Utils';
import * as Models from '../Models'
import * as Enums from '../Enum/Enum'
import { Popup } from '../components/Popup/Popup';
import { ContentEditable } from '../components/ContentEditable/ContentEditable';
import { PostStatusPopup } from '../components/PostStatusPopup/PostStatusPopup';
import { CommentBox } from '../components/CommentBox/CommnentBox';
import { FeedBox } from '../components/FeedBox/FeedBox';
import * as AppIcon from '../AppIcon';
import { PropTypes } from 'prop-types';

interface HomeStates {
    feeds: Models.IFeed[],
    feedTemps: Models.IFeed[],
    skip: number,
    outOfFeed: boolean,
    isShowPostStatusPopup: boolean,
    statusPost: Models.IStatusPost,
    statusPostText: string,
    isShowPostJobPoup: boolean,
    jobPostText: string
}
export class Home extends React.Component<{}, HomeStates> {
    constructor(props) {
        super(props);

        this.state = {
            feeds: [],
            feedTemps: [],
            skip: 0,
            outOfFeed: false,
            isShowPostStatusPopup: false,
            statusPost: null,
            statusPostText: null,
            isShowPostJobPoup: false,
            jobPostText: null
        };
        this.getFeeds = this.getFeeds.bind(this)
        this.OnFeedScroll = this.OnFeedScroll.bind(this);
    }
    static contextTypes = {
        ShowMessage: PropTypes.func
    }
    
    public componentDidMount() {
        window.addEventListener('scroll', this.OnFeedScroll);
        this.getFeeds()
        let userName = document['account'].Displayname;
        this.InitBroadCast()
    };
    private async InitBroadCast() {
        let lastInit = Utils.getLastInitBroadCastTime();
        let now = Utils.getUtcNowInMilisecond();
        if (now - lastInit > 600000)//10 minutes
        {
            FeedRepository.InitBroadCast().then(response => {
                if (response.success == true) {
                    Utils.setLastInitBroadCastTime();
                }
            })
        } 
    }

    private onPersonComment(commentNotify: Models.ICommentNotify) {
        
    }
    public componentWillUnmount() {
        window.removeEventListener('scroll', this.OnFeedScroll);
    }
    private OnFeedScroll() {
        let feedPoint = document.body.offsetHeight;
        if ((window.innerHeight + window.pageYOffset) >= feedPoint) {
            if (!this.state.outOfFeed)
                this.getFeeds();
        }
    }
    private getFeeds() {
        let currentSkip = this.state.skip;
        let currentFeeds = this.state.feeds as Models.IFeed[];
        if (currentSkip == 0 && this.state.outOfFeed == true) return;
        if (this.state.feedTemps == null || this.state.feedTemps.length == 0) {
            FeedRepository.GetFeeds(currentSkip).then(response => {
                if (response.error == null) {

                    let data = response.data as Models.IFeed[]
                    let outOfFeed = (data == null || data.length == 0) ? true : false;
                    if ((data != null && data.length > 0)) {
                        let feeds = [];
                        let nextSkip = data != null ? currentSkip + data.length : 0;

                        if (data.length <= 10) {
                            this.setState({ feeds: data, skip: nextSkip, outOfFeed: true });
                        }
                        else {
                            feeds = Utils.splitArrIntoTwo(data, true);
                            this.setState({ feeds: feeds, skip: nextSkip, outOfFeed: outOfFeed });
                            let temp = Utils.splitArrIntoTwo(data, false);
                            this.setState({ feedTemps: temp });
                        }
                    }
                    else {
                        this.setState({ outOfFeed: outOfFeed });
                    }
                }
            })
        }
        else {
            let appentFeeds = currentFeeds.concat(this.state.feedTemps);
            this.setState({ feeds: appentFeeds });
            FeedRepository.GetFeeds(currentSkip).then(response => {
                if (response.error == null) {
                    let data = response.data as Models.IFeed[]
                    let nextSkip = data != null ? currentSkip + data.length : 0;
                    let outOfFeed = (data == null || data.length == 0) ? true : false;
                    this.setState({ feedTemps: data, skip: nextSkip, outOfFeed: outOfFeed });
                }
            })
        }
    }
    //private getPostComment(this, post: Models.IFeed) {
    //    Fetch.Get(Utils.Api.getPostComments(post.Id, post.PostType)).then((response: IResponse<Models.IComment[]>) => {
    //        let currents = this.state.Comments as Models.IComment[]
    //        if (response.error == null) {
    //            this.setState({ Comments: response.data })
    //        }

    //    })
    //}
    private handelOnShowPostStatusPopup() {
        this.setState({ isShowPostStatusPopup: true })
    }
    private handelOnShowPostJobPopup() {
        this.setState({ isShowPostJobPoup: true })
    }
    private onPostJob() {
        let jobPostText = this.state.jobPostText as string
        if (jobPostText === '') return
        let jobPost = new Object as Models.IJobPost
        jobPost.Content = jobPostText;
        JobRepository.PostJob(jobPost).then(response => {
            if (response.error == null)
                this.setState({ isShowPostJobPoup: false })
        })

    }
    private renderPostStatusButton() {
        return <div className="control_post_news" onScroll={()=>this.OnFeedScroll()}>
            <div className="control_post">
                <span className="post-control">
                    <a href="#" onClick={()=>this.handelOnShowPostStatusPopup()}>
                        {AppIcon.svgPencil('status-post-icon')}
                        <span className="mg-l20">Bài viết</span>
                    </a>
                </span>
                <span className="post-control">
                    <a href="#" onClick={() => window.open("/jobposting", "_blank")}>
                        {AppIcon.svgBriefcase('status-post-icon')}
                        <span className="mg-l15">Tuyển dụng</span>
                    </a>
                </span>
                <span className="post-control">
                    <a href="#">
                        {AppIcon.svgfindJob('status-post-icon')}
                        <span className="mg-l15">Tìm việc làm</span>
                    </a>
                </span>
                <div className="clearfix"></div>
            </div>
            <div className="control_post_new_body">
                <div className="text_area">
                    <div className="avartar_text_area">
                        <img src="../../../../assets/images/avatar/avatar_main.png" />
                    </div>
                    <div className="text_area_input">
                        <textarea id="post_news" placeholder="Bạn đang nghĩ gì"></textarea>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
            <div className="function_post">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="Status_tagging" style={{ display: 'none' }}>
                            <a href="#">Lampard</a> Cùng với <a href="#" data-toggle="tooltip" data-placement="bottom"
                                title="Hooray!<br />Hooray!">2 người khác</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="function_post_tagging" style={{ display: 'none' }}>
                            <select className="form-control">
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">orange</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">white</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple2</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple3</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple4</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple5</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple6</option>
                            </select>
                        </div>
                        <div className="function_post_border">
                            <div id="tagging" className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttom_control_post">
                <div className="Post_buttom">Đăng</div>
            </div>
        </div>
    }

    private renderFeedBlock() {
        let feeds = this.state.feeds

        if (feeds == null) return null
        let render = feeds.map((feed) => {
            return <FeedBox key={feed.Id} Feed={feed} onPersonComment={(w)=>this.onPersonComment(w)} />
        })
        return <div className="Content_news">
            {render}
        </div>
    }

    private onPostStatus(statusPost: Models.IStatusPost) {
        if (statusPost == null) return;
        StatusRepository.PostStatus(statusPost).then((response) => {
            if (response.error == null)
                this.setState({ isShowPostStatusPopup: false })
        })
    }
    private onClosePostStatusPopup() {
        this.setState({ isShowPostStatusPopup: false })
    }
    private OnChangeStatusText( value) {
        //this.setState({ statusPostText: value })
    }
    private renderPostStatusPopup() {
        return <PostStatusPopup
            isOpening={this.state.isShowPostStatusPopup}
            onClose={()=>this.onClosePostStatusPopup()}
            onPost={(e)=>this.onPostStatus(e)}
            onChange={(e)=>this.OnChangeStatusText(e)}>
        </PostStatusPopup>
    }
    private onClosePostJobPopup() {
        this.setState({ isShowPostJobPoup: false })
    }
    private OnChangeJobText(value) {
        this.setState({ jobPostText: value })
    }
    private renderPostJobPopup() {
        return <PostStatusPopup
            isOpening={this.state.isShowPostJobPoup}
            onClose={()=>this.onClosePostJobPopup()}
            onPost={()=>this.onPostJob()}
            onChange={(e)=>this.OnChangeJobText(e)}>
        </PostStatusPopup>
    }
    
    public render() {
        let render = null
        render = <div className="control_and_content">
            <div id="abc" className="presentation_blue"></div>
            {this.renderPostStatusButton()}
            {this.renderFeedBlock()}
            {this.renderPostStatusPopup()}
            {this.renderPostJobPopup()}
        </div>
        return render
    }
}
