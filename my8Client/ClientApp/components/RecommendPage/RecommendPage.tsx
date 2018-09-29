import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Utils from '../../infrastructure/Utils';
import * as Models from '../../Models'
import './index.css'


interface RecommendPageProps {
    Page: Models.IPage
}
export class RecommendPage extends React.Component<RecommendPageProps, {}>{
    constructor(props) {
        super(props);
        this.state = {
            Page: this.props.Page
        }
    }
    public componentWillReceiveProps(this, nextProps: RecommendPageProps) {
        if (nextProps != null) {
            this.setState({ Page: nextProps.Page });
        }
    }

    public render(this) {
        let render = null;
        let Page = this.state.Page as Models.IPage;
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