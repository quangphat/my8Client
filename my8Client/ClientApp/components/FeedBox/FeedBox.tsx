import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Utils from '../../infrastructure/Utils';
import * as AppIcons from '../../AppIcon'
import { IFeed } from '../../Models/IFeed'
import { IShortFeed } from '../../Models/IShortFeed'
import { IComment } from '../../Models/IComment'
import { IFeedLike } from '../../Models/IFeedLike'
import { IAuthor } from '../../Models/IAuthor'
import { IShortPerson } from '../../Models/IShortPerson'
import { INotification } from '../../Models/INotification'
import { CommentBox } from '../CommentBox/CommnentBox';
import * as Enums from '../../Enum/Enum';
import { CommentRepository } from '../../repositories/CommentRepository'
import { FeedRepository } from '../../repositories/FeedRepository'
import { PropTypes } from 'prop-types';
interface FeedBoxProps {
    Feed: IFeed,
    onPersonComment: Function
}
interface FeedBoxStates {
    feed: IFeed,
    renderComments: boolean,
    Comments: IComment[],
    commentSkip: number,
    currentUserComment: string
}
export class FeedBox extends React.Component<FeedBoxProps, FeedBoxStates>{
    constructor(props) {
        super(props);
        this.state = {
            feed: this.props.Feed,
            renderComments: false,
            Comments: [],
            commentSkip: 0,
            currentUserComment: ''
        }
    }
    static contextTypes = {
        ShowMessage: PropTypes.func,
        _sendCommentNotify: PropTypes.func
    }
    public componentDidMount() {

    }
    private renderFeedComments() {
        let render = null;
        if (this.state.renderComments) {
            render = ''
        }
        return render;
    }
    private onInputComment(value) {
        this.setState({ currentUserComment: value })
    }
    private OnPostComment(feed: IFeed) {
        let currentUserComment = this.state.currentUserComment;
        if (currentUserComment == null || feed == null)
            return;
        let comment = {
            FeedId: feed.Id,
            FeedType: feed.PostType,
            Content: currentUserComment,
            Feed: {
                PersonId: feed.PersonId,
                PostBy: feed.PostBy,
                PostingAs: feed.PostingAs
            }
        } as IComment;
        CommentRepository.CreateComment(comment).then(response => {
            if (response.error == null) {
                let commentNotify = response.data as INotification;
                comment.Id = commentNotify.CommentId;
                comment.Commentator = {
                    AuthorId: commentNotify.AuthorId,
                    AuthorTypeId: commentNotify.AuthorType,
                    DisplayName: commentNotify.AuthorDisplayName,
                    Avatar: null
                }

                let Comments = this.state.Comments
                Comments.push(comment);
                //let feed = this.state.Feed as Models.IFeed;
                feed.Comments = feed.Comments + 1;
                this.setState({ Comments: Comments, feed: feed });
                this.context._sendCommentNotify(commentNotify);
            }
        })
    }
    private onLikeFeed(feed: IFeed) {
        let feedlike = {
            Liked: !feed.Liked,
            FeedId: feed.Id,
            FeedType: feed.PostType,
            BroadCastId: feed.BroadcastId,
            Feed: {
                PersonId: feed.PersonId,
                PostBy: feed.PostBy,
                PostingAs: feed.PostingAs
            }
        } as IFeedLike;
        FeedRepository.LikeFeed(feedlike).then(response => {
            if (response.error == null) {
                feed.Liked = feedlike.Liked;
                if (feed.Liked) {
                    feed.Likes += 1;
                }
                else {
                    if (feed.Likes > 0)
                        feed.Likes -= 1;
                }
                this.setState({ feed: feed });
                this.context.ShowMessage('success', "success");
            }
        })
    }
    private renderCommentBox(feed: IFeed) {
        let render = null;
        render = <CommentBox onChange={(e)=>this.onInputComment(e)} OnPostComment={(e)=>this.OnPostComment(e)} feed={feed} />
        return render;
    }
    private getPostComment(post: IFeed) {
        let comments = this.state.Comments as IComment[];
        if (comments == null)
            comments = [];
        let currentSkip = this.state.commentSkip;
        CommentRepository.GetPostComment(post.Id, post.PostType, currentSkip).then(response => {
            if (response.error == null) {
                let data = response.data as IComment[];
                comments = comments.concat(data);
                currentSkip = currentSkip + Utils.rowSkip;
                this.setState({ Comments: comments, renderComments: true, commentSkip: currentSkip });
            }
        })
    }
    private renderTagFriend(tags: IShortPerson[]) {
        let render = null;
        if (tags != null && tags.length > 0) {
            if (tags.length < 3)
                render = <span >
                    <span> cùng với </span>
                    {tags.map((item, index) => {
                        return index == 1 ? <span key={item.Id}> và <a href={item.Url}> {item.DisplayName}</a></span> : <a href={item.Url} > {item.DisplayName}</a>
                    })
                    }
                </span>
            else
                render = <span>
                    <span> cùng với </span>
                    <a href={tags[0].Url}>{tags[0].DisplayName}</a> và <span>{tags.length - 1} người khác</span>
                </span>
        }
        return render;
    }
    private renderComment(feed: IFeed) {
        let comments = this.state.Comments
        if (comments == null) comments = [];
        let render = null
        render = comments.map((comment, index) => {
            return <div key={comment.Id} className="feed-item">
                <div>
                    <div className="author-avatar">
                        <a href="#">
                            <img src={Utils.GetCurrentUserAvatar()} />
                        </a>
                    </div>
                    <div className="feed-body">
                        <div className="feed-comment-options">
                            <div className="feed-comment-time cool">{comment.CommentTimeUnix}</div>
                            {<a className="comment-options-trigger">
                                <span className="svg-icon-wrap">
                                    {AppIcons.svgEllipsisHorizontal()}
                                </span>
                            </a>}
                        </div>
                        <div className="feed-comment-author lh12" target="_self" href="/in/dieulinhht/">
                            <div>
                                <span className="feed-author-display_name">
                                    <a href="#">{comment.Commentator.DisplayName}</a>
                                </span>
                                <span className="author-headline cool">
                                    {comment.Commentator.WorkAs}
                                </span>
                            </div>
                        </div>
                        <div className="feed-comment-content">
                            <p className="feed-comment-text-content">
                                <span className="ember-view">
                                    <span>{comment.Content}</span>
                                </span>
                                {/*<a target="_blank" href="mailto:dieulinh.ht234@gmail.com" className="feed-link ember-view">dieulinh.ht234@gmail.com</a>*/}
                                {/*<span id="ember5807" className="ember-view">
                                <span> gúp mình. Thanks ạ </span>
                            </span>*/}
                            </p>
                            {/*<button aria-hidden="true" data-control-name="expand" className="see-more Sans-15px-black-55% hoverable-link-text" data-ember-action="" data-ember-action-4838="4838">…see more</button>*/}
                        </div>
                    </div>
                </div>
                <div className="feed-shared-highlighted-comment-item-content-body">
                    <div className="comment-view-interactive">
                        <span className="user-like">
                            <img src="../../../../assets/images/icon-like.png" alt="" /> {comment.Likes > 0 ? comment.Likes : ''}
                            <a className="" >Like</a>
                        </span>
                        <a className="feed-comment-interactive-button">Reply</a>
                    </div>
                    {/*<div className="feed-shared-comment-social-bar display-flex ember-view">
                        <div className="feed-shared-comment-social-bar__action-group  ">
                            <button data-control-name="comment_like_toggle" className="feed-shared-comment-social-bar__action-button Sans-13px-black-55%-semibold pr3 ml0 hoverable-link-text like-button button like ember-view">
                                <span aria-hidden="true">Like</span>
                                <span className="visually-hidden">
                                    Like Linh Dieu’s comment
                                </span>
                            </button>
                            <button data-control-name="reply" className="feed-shared-comment-social-bar__action-button Sans-13px-black-55%-semibold pr3 ml0 hoverable-link-text button reply ember-view">
                                <span className="svg-icon-wrap">
                                    <span className="visually-hidden">Reply to Linh Dieu’s comment</span>
                                </span>
                                <span aria-hidden="true">Reply</span>
                            </button>
                        </div>
                    </div>*/}
                    <div className="feed-comment-replies">
                        <div>
                            <div className="author-avatar">
                                <a href="#">
                                    <img src={Utils.GetCurrentUserAvatar()} />
                                </a>
                            </div>
                            <div className="feed-body">
                                <div className="feed-comment-options">
                                    <div className="feed-comment-time cool">{comment.CommentTimeUnix}</div>
                                    {<a className="comment-options-trigger">
                                        <span className="svg-icon-wrap">
                                            {AppIcons.svgEllipsisHorizontal()}
                                        </span>
                                    </a>}
                                </div>
                                <div className="feed-comment-author lh12" target="_self" href="/in/dieulinhht/">
                                    <div>
                                        <span className="feed-author-display_name">
                                            <a href="#">{comment.Commentator.DisplayName}</a>
                                        </span>
                                        <span className="author-headline cool">
                                            Developer
                                        </span>
                                    </div>
                                </div>
                                <div className="feed-reply-content">
                                    <p className="feed-comment-text-content">
                                        <span className="ember-view">
                                            <span>{comment.Content}</span>
                                        </span>
                                        {/*<a target="_blank" href="mailto:dieulinh.ht234@gmail.com" className="feed-link ember-view">dieulinh.ht234@gmail.com</a>*/}
                                        {/*<span id="ember5807" className="ember-view">
                                <span> gúp mình. Thanks ạ </span>
                            </span>*/}
                                    </p>
                                    {/*<button aria-hidden="true" data-control-name="expand" className="see-more Sans-15px-black-55% hoverable-link-text" data-ember-action="" data-ember-action-4838="4838">…see more</button>*/}
                                </div>

                            </div>
                            <div className="comment-view-interactive ml40">
                                <span className="user-like">
                                    <img src="../../../../assets/images/icon-like.png" alt="" /> {comment.Likes > 0 ? comment.Likes : ''}
                                    <a className="" >Like</a>
                                </span>
                                <a className="feed-comment-interactive-button">Reply</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        })

        return render
    }
   
    public render() {
        let render = null
        let feed = this.state.feed
        let classLiked = feed.Liked?' liked':''
        if (feed != null) {
            render = <div className="feedbox">
                <div className="feedbox-control">
                    <div className="feedbox-control-wrapper">
                        <a href="#" className="feedbox-option-icon">
                            <i className="fa fa-angle-down"></i>
                        </a>
                        <div className="feedbox-option-list">
                            <ul className="nav">
                                <li><a href="#"><i className="fa fa-bookmark-o fa-2x"></i> Lưu bài viết</a></li>
                                <li><a href="#"><i className="fa fa-clock-o fa-2x"></i> Tạm ẩn trong 30 ngày</a></li>
                                <li><a href="#"><i className="fa fa-flag-o fa-2x"></i> Báo cáo bài viết này</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="feedbox-friend-action">
                    <a href="#" className="text-black fw600">{feed.PostBy.DisplayName}</a> commented on this
                </div>
                <div className="feedbox-author-avatar">
                    <img src="../../../../assets/images/avatar/avatar4.png" />
                </div>
                <div className="feedbox-author-display">
                    <span className="">
                        <a href="#" className="fw600">
                            {feed.PostBy.DisplayName}
                        </a>
                        
                    </span>
                    <span> {this.renderTagFriend(feed.PersonTags)} </span>
                    <div className="author-headline cool">
                        {feed.PostBy.WorkAs}
                    </div>
                    {
                        feed.PostType == Enums.PostType.Job ? <div className="btn-apply">Apply</div> : ''
                    }
                </div>

                <div className="clearfix"></div>
                <div className="feedbox-content">
                    <div className="feedbox-content-text">
                        {feed.Content}
                    </div>
                    <div className="feedbox-content-img">
                        {/*<img src="../../../../assets/images/background.jpg" />*/}
                    </div>
                    <div className="Content_news_item_status">
                        <div className="like_share_feeling pull-left">
                            <span><i className="like"></i></span>
                            <a href="#" className="cool">{feed.Likes} lượt thích</a>
                            <a className="times_comment cool" onClick={this.getPostComment.bind(this, feed)}>
                                {feed.Comments} bình luận
                            </a>
                            <a className="times_share cool">
                                {feed.Shares} chia sẻ
                            </a>
                        </div>
                        <div className="feedbox-feed-time cool pull-right mt5">
                            {feed.PostTimeUnix} <i className="fa fa-globe fa-1x"></i>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="feedbox-person-action">
                        <a className={"feedbox-single-action action-like" + classLiked} onClick={this.onLikeFeed.bind(this, feed)} >
                            <i className="fa fa-thumbs-o-up margin-r-5"></i>
                            Like
                        </a>
                        <a className="feedbox-single-action action-comment" onClick={this.getPostComment.bind(this, feed)}>
                            <i className="fa fa-comments-o margin-r-5"></i>
                            Comments
                        </a>
                        <a className="feedbox-single-action action-share">
                            <i className="fa fa-share margin-r-5"></i>
                            Share
                        </a>
                    </div>
                    <div className="clearfix"></div>
                    <div className="feed-comment-area">
                        <div className="clearfix"></div>
                        {this.state.renderComments ?
                            <div>
                                {this.renderCommentBox(feed)}
                                {this.renderComment(feed)}
                                {feed.Comments > 0 ?
                                    <div className="comment-showmore">
                                        <a className="green-link" onClick={this.getPostComment.bind(this, feed)} >Xem thêm</a>
                                    </div>
                                    : null
                                }

                            </div>
                            : null
                        }
                        <div className="clearfix"></div>


                    </div>
                </div>
            </div>
        }

        return render;
    }
}