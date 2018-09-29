import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Utils from '../../infrastructure/Utils';
import * as Models from '../../Models'

interface FollowingPageItemProps {
    Page: Models.IPage
}
export class FollowingPageItem extends React.Component<FollowingPageItemProps, {}>{
    constructor(props) {
        super(props);
        this.state = {
            Page: this.props.Page
        }
    }
    public render(this) {
        let render = null;
        let page = this.state.Page as Models.IPage;
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