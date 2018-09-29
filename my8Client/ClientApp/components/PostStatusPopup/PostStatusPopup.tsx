import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PersonRepository } from '../../repositories/PersonRepository';
import { ContentEditable } from '../ContentEditable/ContentEditable';
import * as AppIcon from '../../AppIcon';
import { IStatusPost } from '../../Models/IStatusPost'
import { IShortPerson } from '../../Models/IShortPerson'

import * as Utils from '../../infrastructure/Utils';
import './index.css';

import * as Components from '../../components';
interface PostStatusPopupProps {
    isOpening: boolean,
    onClose: Function,
    onChange: Function,
    onPost: Function
}
interface PostStatusPopupStates {
    isOpening: boolean,
    friends: any,
    isShowListFriend: false,
    taggingFriends: any,
    tagsSelected: any,
    statusPostText: null,
    mouseDown: null
}
export class PostStatusPopup extends React.Component<PostStatusPopupProps, PostStatusPopupStates>{
    constructor(props) {
        super(props);
        let isOpening = this.props.isOpening != null ? this.props.isOpening : false
        this.state = {
            isOpening: isOpening,
            friends: [],
            isShowListFriend: false,
            taggingFriends: [],
            tagsSelected: [],
            statusPostText: null,
            mouseDown: null
        };
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this)
        this.handleOnClickOutside = this.handleOnClickOutside.bind(this)
    }
    public componentWillMount() {
        document.addEventListener('mousedown', this.handleOnMouseDown, false);
        document.addEventListener('mouseup', this.handleOnClickOutside, false);
    }
    public componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOnClickOutside, false);
        document.removeEventListener('mouseup', this.handleOnClickOutside, false);
    }
    private handleOnMouseDown(this, e) {
        this.setState({ mouseDown:e})
    }
    private handleOnClickOutside(this, e) {
        let ref_popup = this.refs.popup;
        if (ref_popup != null && e.target.id == "popup") {
            let mouseDown = this.state.mouseDown;
            //if ((mouseDown.clientX == e.clientX && mouseDown.clientY == e.clientY) || (mouseDown.target.id == "popup"))
            if (mouseDown.target.id == "popup") {
                this.handleClose()
            }
                
        }
    }
    public componentDidMount() {

    }
    private getTopInteractiveFriends() {
        return PersonRepository.GetTopFriend().then(response => {
            if (response.error == null) {
                return response.data;
            }
            else return null;
        })
    }
    private searchFriend(searchStr: string) {
        if (Utils.isNullOrEmpty(searchStr)) return null;
        let friends = this.state.friends
        let results = [];
        results = friends.filter(p => p.DisplayName.toLowerCase().includes(searchStr));
        return results;
    }
    public componentWillReceiveProps(nextProps: PostStatusPopupProps) {
        if (this.props.isOpening != nextProps.isOpening) {
            let isOpening = nextProps.isOpening != null ? nextProps.isOpening : false
            let friends = this.state.friends
            if (isOpening) {
                if (friends == null || friends.length == 0) {
                    friends = friends.concat(Utils.getFriends());
                    this.setState({ friends: friends });
                }
            }
            this.setState({ isOpening: isOpening })
        }
        
    }
    private handleClose() {
        this.props.onClose()
        this.setState({ taggingFriends: null, tagsSelected: null });
    }
    private onChange( value) {
        this.setState({ statusPostText: value })
    }
    private onPost() {
        
        let statusPostText = this.state.statusPostText;
        if (Utils.isNullOrEmpty(statusPostText)) return;
        let statusPost = {
            Content: statusPostText,
            PersonTags: this.state.tagsSelected
        }
        this.props.onPost(statusPost);
        this.setState({ statusPostText: null, tagsSelected: null });
    }
    //private onSearchingFriend(this, e) {
    //    let searchStr = e.target.value.toLowerCase();
    //    let friends = this.searchFriend(searchStr.trim());
    //    if (friends != null && friends.length > 0) {
    //        this.setState({ isShowListFriend: true, TaggingFriends: friends });
    //    }
    //    else {
    //        this.setState({ isShowListFriend: false, TaggingFriends: null });
    //    }
    //}
    private handleOnGetListFriend( friend: IShortPerson) {
        return new Promise(resolve => {
            let friends = this.state.friends
            resolve(friends);
        })
    }
    private onSelectTag(item) {
        let tagsSelected = this.state.tagsSelected
        if (tagsSelected == null) tagsSelected = [];
        if (item) {
            let exists = tagsSelected.findIndex(p => p.Id == item.Id);
            if (exists < 0) {
                tagsSelected.push(item);
                this.setState({ tagsSelected: tagsSelected });
            }
        }
    }
    private renderTaggingFriends() {
        let taggingFriends = this.state.taggingFriends
        if (taggingFriends == null) return null;
        let render = <ul className="tags-search-result">{
            taggingFriends.map((item, index) => {
                return <li key={index} className="tags-search-item" onClick={()=>this.onSelectTag(item)}>
                    <div className="ml-5">
                        <img className="avatar" src="../../../../assets/images/avatar/avatar4.png" />
                        <div className="tag-header-info">
                            <span className="displayname">{item.DisplayName}</span>
                            <span className="workas">{item.WorkAs}</span>
                        </div>
                    </div>
                </li>
            })
        }
        </ul>
        return render;
    }
    private renderTaggedFriend() {
        let TagsSelected = this.state.tagsSelected
        let render = null;
        if (TagsSelected != null && TagsSelected.length > 0) {
            if (TagsSelected.length < 3)
                render = <div className="Status_tagging" >
                    <span> cùng với </span>
                    {TagsSelected.map((item, index) => {
                        return index == 1 ? <span> và <a href={item.Url}> {item.DisplayName}</a></span> : <a href={item.Url} > {item.DisplayName}</a>
                    })
                    }
                </div>
            else
                render = < div className="Status_tagging" >
                    <span> cùng với </span>
                    <a href={TagsSelected[0].Url}>{TagsSelected[0].DisplayName}</a> và <span>{TagsSelected.length - 1} người khác</span>
                </div>
        }
        return render;
    }
    public render() {
        let isShowListFriend = this.state.isShowListFriend;
        let render = null
        let className = this.state.isOpening == true ? ' opening' : ''
        render = <div ref="popup" id="popup" className={'modal' + className}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="popup-header">
                        <p>Trạng thái</p>
                        <a className="popup-close" aria-label="Close" onClick={this.handleClose.bind(this)}><span>{AppIcon.svgCloseIcon()}</span></a>
                    </div>
                    <div className="modal-body">
                        <ContentEditable onChange={this.onChange.bind(this)} hasBorder={false} placeHolder="Chia sẻ điều gì đó với mọi người">
                        </ContentEditable>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {this.renderTaggedFriend()}
                            </div>
                        </div>
                        {/*<div className="row status-with-friend">
                            <span>Bạn bè:</span>
                            <div className="status-select-friend">
                                <input type="text" placeholder="Tag bạn bè vào bài viết này" onChange={this.onSearchingFriend.bind(this)} />
                            </div>
                        </div>*/}
                        {/*<div className="clearfix"></div>*/}
                        {/*isShowListFriend ? this.renderTaggingFriends() : null*/}
                        <div className="row status-with-friend">
                            <label>Bạn bè:</label>
                            <div className="status-select-friend">
                                <Components.InputTextTagFriend onSelect={(e)=>this.onSelectTag(e)} />
                            </div>
                        </div>

                    </div>

                    <div className="popup-footer">
                        <a className="primary" onClick={()=>this.onPost()}>Đăng</a>
                    </div>

                </div>
            </div>
        </div>
        return render;

    }
}