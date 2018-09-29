import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Utils from '../../infrastructure/Utils';
import { IPage } from '../../Models/IPage'

interface FollowingPageItemProps {
    Page: IPage
}
interface FollowingPageItemStates {
    page: IPage
}
export class FollowingPageItem extends React.Component<FollowingPageItemProps, FollowingPageItemStates>{
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.Page
        }
    }
    public render() {
        let render = null;
        let page = this.state.page
        if (page == null) return null;
        render = <li className="company_item">
            <div className="company_item_avartar">
                <img src="../../../../assets/images/brand/logo1.png" />
            </div>
            <div className="company_item_name">{page.DisplayName}</div>
            <span className="company-title">{page.Title}</span>
            <div className="clearfix"></div>
        </li>
        return render;
    }
}