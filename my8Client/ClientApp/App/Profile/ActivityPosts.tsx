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
import { ScrollBottom } from '../../components/ScrollBottom/ScrollBottom'
interface ActivityPostProps {
    person: IShortPerson
}
interface ActivityPostStates {
    posts: IStatusPost[],
    paging: IPaging,
    isPostOver: boolean,
    isLoading: boolean
}
export class ActivityPost extends React.Component<ActivityPostProps, ActivityPostStates> {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isPostOver: false,
            isLoading: true,
            paging: {
                page: 0,
                limit: Utils.limit
            }
        };
    }

    public componentWillMount() {

    }

    public componentDidMount() {
        this.getStatusPost(0)
    };
    public componentWillUnmount() {
    }
    private onScroll() {
        this.getStatusPost(this.state.paging.page+1)
    }
    private getStatusPost(page) {
        if (this.state.isPostOver) return
        if (page == 0 && this.state.posts.length > 0) return
        this.setState({ isLoading: true })
        let paging = this.state.paging
        
        StatusRepository.GetStatusPostByAuthor(this.props.person.Id, 1, page, paging.limit).then(response => {
            if (response != null && response.error == null && response.data != null) {
                paging.page = page
                let datas = response.data as IStatusPost[]
                let posts = this.state.posts
                datas.map(p => {
                    posts.push(p);
                })
                if (datas.length < Utils.limit) {
                    this.setState({ posts: posts, isPostOver: true, paging: paging, isLoading: false })
                }
                else {
                    this.setState({ posts: posts, paging: paging, isLoading: false })
                }
            }
        })
    }
    private renderFeed(posts: IStatusPost[]) {
        if (Utils.isArrNullOrHaveNoItem(posts)) return null
        return posts.map(post => {
            return <StatusFeedBox key={post.Id} feed={post}
                onPersonComment={null} />
        })
    }
    public render() {
        return <div>
            <ScrollBottom onBottom={() => this.onScroll()} />
            {this.renderFeed(this.state.posts)}
        </div>
    }
}
