import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Utils from '../../infrastructure/Utils';
import { IPage } from '../../Models/IPage'
import './index.css'


interface RecommendPageProps {
    Page: IPage
}
interface RecommendPageStates {
    page: IPage
}
export class RecommendPage extends React.Component<RecommendPageProps, RecommendPageStates>{
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.Page
        }
    }
    public componentWillReceiveProps(nextProps: RecommendPageProps) {
        if (nextProps.Page != this.props.Page) {
            this.setState({ page: nextProps.Page });
        }
    }

    public render() {
        let render = null;
        let Page = this.state.page
        if (Page == null) render = null
        else {
            render = <li>
                <div className="page-item">
                    <img src="../../../../assets/images/brand/logo10.png" alt="DC comics" />
                    <div className="page-item-info">
                        <div className="page-item-title">
                            {Page.DisplayName}
                                        </div>
                        <div className="page-item-rate">
                            {Page.Rate} <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half"></i>
                        </div>
                        <div className="page-item-like">100k người thích trang này</div>
                        <div className="page-item-description">
                            {Page.Title}
                                        </div>
                    </div>
                    <div className="page-item-button">
                        <a href="#">Follow</a>
                    </div>
                </div>
            </li>
        }
        
        return render;
    }
}