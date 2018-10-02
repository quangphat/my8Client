import * as React from 'react';
import * as Utils from '../../infrastructure/Utils';
import * as Models from '../../Models'
import './index.css'


interface ExperienceItemProps {
    
}
interface ExperienceItemStates {
    
}
export class ExperienceItem extends React.Component<ExperienceItemProps, ExperienceItemStates>{
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }
    public componentDidMount() {

    }
    public componentWillReceiveProps(nextProps: ExperienceItemProps) {
    }

    public render() {
        return <div className="timeline-date-event">
            <div className="timeline-date-time">
                11/2017 - Hiện tại . 6 tháng
                            </div>
            <div className="timeline-date-event-icon-lineleft"></div>
            <div className="timeline-date-event-line-vertical"></div>
            <div className="timeline-date-event-content">
                <div className="timeline-date-event-title">
                    <a className="btn-timeline-edit" href="#"><i className="fa fa-pencil"></i></a>
                    <div className="user-info-avatar">
                        <img src={Utils.GetCurrentUserAvatar100()} alt="Superman" />
                    </div>
                    <span className="company_item_name">
                        Superman
                                    </span>
                    <span className="user-info-company">
                        Haravan - Công ty công nghệ cung cấp giải pháp kinh doanh thương mại điện tử
                                        </span>
                    <span className="user-info-location">
                        Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh
                                    </span>
                    <div className="clearfix"></div>
                </div>
                <div className="timeline-date-event-content-main">
                    <a href="#">Thêm mô tả</a>
                    <ul className="nav-list-description">
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum convallis tempor
                                        <a className="ml10"><i className="fa fa-pencil"></i></a>
                        </li>
                        <li>Vestibulum aliquam arcu in odio mattis, nec aliquet velit rutrum
                                        <a className="ml10"><i className="fa fa-pencil"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    }
}