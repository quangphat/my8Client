import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Utils from '../../infrastructure/Utils';
import { IFeed } from '../../Models/IFeed'
import { IStatusPost } from '../../Models/IStatusPost'
import { IJobPost } from '../../Models/IJobPost'

import './index.css'


interface CommentBoxProps {
    onChange: Function,
    OnPostComment: Function,
    feed: IFeed | IStatusPost | IJobPost,
    defaultValue?: string
}
interface CommentBoxStates {
    value: string
}
export class CommentBox extends React.Component<CommentBoxProps, CommentBoxStates>{
    constructor(props) {
        super(props);
        let defaultValue = this.props.defaultValue != null ? this.props.defaultValue:''
        this.state = {
            value: defaultValue
        }
    }
    public componentDidMount(this) {
        let commentBox = this.refs.commentBox;
        if (commentBox != null) {
            commentBox.focus();
        }
    }
    public componentWillReceiveProps(nextProps: CommentBoxProps) {
            //let value = nextProps.defaultValue != null ? nextProps.defaultValue : ''
            //this.setState({value: value})
    }
    private OnChange(e) {
        //let text = e.target.value;
        let text = e.target.innerText;
        if (Utils.isNullOrEmpty(text)) return
        this.props.onChange(e.target.innerText)
        this.setState({ value: text });
        this.props.onChange(text);
    }
    private OnKeydown(e) {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            e.target.innerText = ''
            this.props.OnPostComment(this.props.feed);
            this.setState({ value: '' });
        }
        else if (e.key === "Enter") {
            //e.target.textContent = ''
            ////e.preventDefault();
            ////this.props.onChange(e.target.textContent)
            //this.props.OnPostComment(this.props.feed);
            //this.setState({ value: '' });
        }
           
    }
    commentBox =null
    public render() {
        let render = null;
        render = <div className="comment-box">
            <div className='comment-box-avatar'>
                <img src={Utils.GetCurrentUserAvatar()} />
            </div>
            {<div ref={(commentBox)=>this.commentBox=commentBox} contentEditable={true}
                data-placeholder="Type a comment"
                autoFocus={true} role="textbox"
                onKeyDown={(e)=>this.OnKeydown(e)}
                suppressContentEditableWarning={true}
                aria-multiline={true}
                onInput={(e)=>this.OnChange(e)} className="comment-box-textarea">
            </div>}
            {/*<input type="text" placeholder="Type a comment" value={this.state.value} onChange={this.OnChange.bind(this)} onKeyDown={this.OnPostComment.bind(this)} />*/}
            <div className="comment-box-icon">
                <a className="comment-box-camera" href="#"><i className="fa fa-camera"></i></a>
                <a className="comment-box-emoji" href="#"><i className="fa fa-smile-o"></i></a>
            </div>

            
        </div>
        return render;
    }
}