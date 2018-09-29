import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { HubConnection } from '@aspnet/signalr';
import { PersonRepository } from '../../repositories/PersonRepository';
import './index.css';
import * as Utils from '../../infrastructure/Utils';
import * as AppIcons from '../../AppIcon'
import * as Models from '../../Models';

interface ProfileStates {
    person: Models.IShortPerson
}
export class Profile extends React.Component<{}, ProfileStates> {
    constructor(props) {
        super(props);
        this.state = {
            person: null
        };
    }
    
    public componentWillMount(this) {
        let url = Utils.getParamFromPathname(this.props.pathname, 2);
        this.getPersonProfile(url);
    }
    
    componentWillReceiveProps(props) {
        debugger
    }
    private getPersonProfile(url) {
        if (url) {
            PersonRepository.GetPersonProfile(url).then(response => {
                if (response.error == null) {
                    let data = response.data as Models.IShortPerson
                    this.setState({ person: data })
                }
            })
        }
    }
    
    public componentDidMount() {

    };
    getResult(options) {
        let x = options;
    }
    private resultantImage(this) {
        let el = this.refs.reactCroppie
        //el.croppie('result', {
        //    type: 'rawcanvas',
        //    circle: true,
        //    // size: { width: 300, height: 300 },
        //    format: 'png'
        //}).then(function (canvas) {

        //});
        el.result({ format: 'base64', size: { width: 100, height: 100 } }).then(function (resp) {
            console.log(resp);
            var image = new Image();
            image.src = resp;
            document.body.appendChild(image);
        });

    }
    private renderLeft( person: Models.IShortPerson) {
        let render = null;
        render = <div className="colleft-twocolumn info-about-yourself">
            <div className="box box-primary">
                <div className="box-body box-profile">
                    <img className="profile-user-img img-responsive img-circle" src={Utils.GetCurrentUserAvatar100()} alt="User profile picture" />

                    <h3 className="profile-username text-center">{person.DisplayName}</h3>

                    <p className="text-muted text-center">{person.WorkAs}</p>
                    <div className="user-function-button">
                        <a href="#" className="btn btn-friend">Follow</a>
                        <a href="#" className="btn btn-rate" id="Show_Modal_input">Rate</a>
                    </div>
                    <ul className="list-group list-group-unbordered">
                        <li className="list-group-item">
                            <b>Followers</b> <a className="pull-right">1,322</a>
                        </li>
                        <li className="list-group-item">
                            <b>Following</b> <a className="pull-right">543</a>
                        </li>
                        <li className="list-group-item">
                            <b>Friends</b> <a className="pull-right">13,287</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="clearfix" />
            <div className="info_about_yourself_bottom">
                <div className="info_about_yourself_bottom_tittle">
                    About Me
                    </div>
                <div className="info_about_yourself_bottom_infolist">
                    <div className="info_about_yourself_bottom_info_item">
                        <div className="info_about_yourself_bottom_info_title">
                            <i className="fa fa-book margin-r-5"></i>  Education
                            </div>
                        <div className="info_about_yourself_bottom_info_Content">
                            B.S. in Computer Science from the University of Tennessee at Knoxville
                            </div>
                    </div>
                    <div className="info_about_yourself_bottom_info_item">
                        <div className="info_about_yourself_bottom_info_title">
                            <i className="fa fa-book margin-r-5"></i>  Education
                            </div>
                        <div className="info_about_yourself_bottom_info_Content">
                            B.S. in Computer Science from the University of Tennessee at Knoxville
                            </div>
                    </div>
                    <div className="info_about_yourself_bottom_info_item">
                        <div className="info_about_yourself_bottom_info_title">
                            <i className="fa fa-book margin-r-5"></i>  Education
                            </div>
                        <div className="info_about_yourself_bottom_info_Content">
                            B.S. in Computer Science from the University of Tennessee at Knoxville
                            </div>
                    </div>
                </div>
                <div className="about_company">
                    <div className="logo_info_Company">
                        <img src="Image/Logo.png" />
                    </div>
                    <div className="Name_company">
                        CÔNG TY XXXXX
                        </div>
                    <div className="Adress_and_info_contact">
                        <span><b>Trụ sở chính:</b> 184 Hồng Hà, P.9, Q. Phú Nhuận, TP. HCM</span><br />
                        <span><b>Điện thoại:</b> 090.909.0909</span><br />
                    </div>
                </div>
            </div>
        </div>
        return render;
    }
    private renderRight() {
        let render = null;
        render = <div className="colright-twocolumn content_right_activity_timeline_Settings">
            <div className="control_on_content_right">
                <div className="nav-tabs-custom">
                    <ul className="nav nav-tabs">
                        <li className="active"><a> Kinh nghiệm</a></li>
                        <li id="Timeline_button"><a> Học vấn</a></li>
                        <li id="Settings_button"><a> Hoạt động</a></li>
                        <li id="MyPictures_button"><a> Giới thiệu</a></li>
                    </ul>
                </div>
                <div className="tab-panel active" id="Activity">
                    <div className="new-experience">
                            {AppIcons.svgPlus()}
                            <span>Thêm kinh nghiệm</span>
                    </div>
                    <div className="timeline-date-event">
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
                    <div className="timeline-date-event">
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
                                <div className="user-info-description">
                                    <div className="company_item_name">
                                        Superman
                                        </div>
                                    <div className="user-info-company">
                                        Haravan - Công ty công nghệ cung cấp giải pháp kinh doanh thương mại điện tử
                                        </div>
                                    <div className="user-info-location">
                                        Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh
                                        </div>
                                </div>
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
                    <div className="timeline-date-event">
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
                                <div className="user-info-description">
                                    <div className="company_item_name">
                                        Superman
                                        </div>
                                    <div className="user-info-company">
                                        Haravan - Công ty công nghệ cung cấp giải pháp kinh doanh thương mại điện tử
                                        </div>
                                    <div className="user-info-location">
                                        Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh
                                        </div>
                                </div>
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
                </div>
                <div className="tab-panel" id="Timeline">
                    <div className="Timeline_date_event">
                        <div className="Timeline_date_time">
                            11/2017 - Hiện tại . 6 tháng
                            </div>
                        <div className="Timeline_date_event_icon_lineleft"></div>
                        <div className="Timeline_date_event_line_vertical"></div>
                        <div className="Timeline_date_event_content">
                            <div className="Timeline_date_event_title">
                                <a className="btnTimeLineEdit" href="#"><i className="fa fa-pencil"></i></a>
                                <div className="user-info-avatar">
                                    <img src="image/avatar/avatar_main_92x92.png" alt="Superman" />
                                </div>
                                <div className="user-info-description">
                                    <div className="company_item_name">
                                        Superman
                                        </div>
                                    <div className="user-info-company">
                                        Haravan - Công ty công nghệ cung cấp giải pháp kinh doanh thương mại điện tử
                                        </div>
                                    <div className="user-info-location">
                                        Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh
                                        </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="Timeline_date_event_content_main">
                                <a className="btnAddDescription" href="#">Thêm mô tả</a>
                                <ul className="nav-list-description">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum convallis tempor <a className="btnAddDescription" href="#"><i className="fa fa-pencil"></i></a></li>
                                    <li>Vestibulum aliquam arcu in odio mattis, nec aliquet velit rutrum <a className="btnAddDescription" href="#"><i className="fa fa-pencil"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="Timeline_date_event">
                        <div className="Timeline_date_time">
                            10-2016 - 10/2017 . 1 năm
                            </div>
                        <div className="Timeline_date_event_icon_lineleft"></div>
                        <div className="Timeline_date_event_line_vertical"></div>
                        <div className="Timeline_date_event_content">
                            <div className="Timeline_date_event_title">
                                <a className="btnTimeLineEdit" href="#"><i className="fa fa-pencil"></i></a>
                                <div className="user-info-avatar">
                                    <img src="image/avatar/avatar_main_92x92.png" alt="Superman" />
                                </div>
                                <div className="user-info-description">
                                    <div className="user-info-name">
                                        Superman
                                        </div>
                                    <div className="user-info-company">
                                        Haravan - Công ty công nghệ cung cấp giải pháp kinh doanh thương mại điện tử
                                        </div>
                                    <div className="user-info-location">
                                        Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh
                                        </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="Timeline_date_event_content_main">
                                <a className="btnAddDescription" href="#">Thêm mô tả</a>
                                <ul className="nav-list-description">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum convallis tempor <a className="btnAddDescription" href="#"><i className="fa fa-pencil"></i></a></li>
                                    <li>Vestibulum aliquam arcu in odio mattis, nec aliquet velit rutrum <a className="btnAddDescription" href="#"><i className="fa fa-pencil"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="Timeline_date_event">
                        <div className="Timeline_date_time">
                            06-2014 - 09/2017 . 3 năm 3 tháng
                            </div>
                        <div className="Timeline_date_event_icon_lineleft"></div>
                        <div className="Timeline_date_event_line_vertical"></div>
                        <div className="Timeline_date_event_content">
                            <div className="Timeline_date_event_title">
                                <a className="btnTimeLineEdit" href="#"><i className="fa fa-pencil"></i></a>
                                <div className="user-info-avatar">
                                    <img src="image/avatar/avatar_main_92x92.png" alt="Superman" />
                                </div>
                                <div className="user-info-description">
                                    <div className="user-info-name">
                                        Superman
                                        </div>
                                    <div className="user-info-company">
                                        Haravan - Công ty công nghệ cung cấp giải pháp kinh doanh thương mại điện tử
                                        </div>
                                    <div className="user-info-location">
                                        Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh
                                        </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="Timeline_date_event_content_main">
                                <a className="btnAddDescription" href="#">Thêm mô tả</a>
                                <ul className="nav-list-description">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum convallis tempor <a className="btnAddDescription" href="#"><i className="fa fa-pencil"></i></a></li>
                                    <li>Vestibulum aliquam arcu in odio mattis, nec aliquet velit rutrum <a className="btnAddDescription" href="#"><i className="fa fa-pencil"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-panel" id="Settings">
                    <div className="Settings_form">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="Settings_form_Input_label">Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" placeholder="Name" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="Settings_form_Input_label">Email</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" placeholder="Email" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="Settings_form_Input_label">Experience</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" placeholder="Experience" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="Settings_form_Input_label">Skills</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" placeholder="Skills" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-offset-2 col-md-10">
                                    <div className="icheckbox_flat" style={{ position: "relative" }}>
                                        <input type="checkbox" style={{ position: "absolute", top: "-20%", left: "-20%", display: "block", width: "140%", height: "140%", margin: "0px", padding: "0px", background: "rgb(255, 255, 255)", border: "0px", opacity: 0 }} />
                                    </div>
                                    <label className="Settings_form_checkbox_label">I agree to the terms and conditions</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-panel" id="MyPictures">
                    <div className="MyPictures_content_main">
                        <div className="MyPictures_content_main_title">
                            Hình ảnh của tôi
                                <div className="MyPictures_content_main_date_time">
                                <i className="fa fa-clock-o"></i>
                                12:05
                                </div>
                        </div>
                        <div className="Picture_Area">
                            <div className="grid" style={{ position: "relative", height: "0px" }}>
                                <div className="Picture_Item" style={{ position: "absolute", transitionProperty: "opacity, transform", transitionDuration: "0.4s", transitionDelay: "0ms" }}>
                                    <a data-fancybox-href="image/background.jpg" data-fancybox="galleryUser">
                                        <img src="image/background.jpg" />
                                    </a>
                                </div>
                                <div className="Picture_Item" style={{ position: "absolute", transitionProperty: "opacity, transform", transitionDuration: "0.4s", transitionDelay: "0ms" }}>
                                    <a data-fancybox-href="image/picture1.jpeg" data-fancybox="galleryUser">
                                        <img src="image/picture1.jpeg" />
                                    </a>
                                </div>
                                <div className="Picture_Item" style={{ position: "absolute", transitionProperty: "opacity, transform", transitionDuration: "0.4s", transitionDelay: "0ms" }}>
                                    <a data-fancybox-href="image/picture2.jpg" data-fancybox="galleryUser">
                                        <img src="image/picture2.jpg" />
                                    </a>
                                </div>
                                <div className="Picture_Item" style={{ position: "absolute", transitionProperty: "opacity, transform", transitionDuration: "0.4s", transitionDelay: "0ms" }}>
                                    <a data-fancybox-href="image/picture3.jpg" data-fancybox="galleryUser">
                                        <img src="image/picture3.jpg" />
                                    </a>
                                </div>
                                <div className="Picture_Item" style={{ position: "absolute", transitionProperty: "opacity, transform", transitionDuration: "0.4s", transitionDelay: "0ms" }}>
                                    <a data-fancybox-href="image/picture4.jpg" data-fancybox="galleryUser">
                                        <img src="image/picture4.jpg" />
                                    </a>
                                </div>
                                <div className="Picture_Item" style={{ position: "absolute", transitionProperty: "opacity, transform", transitionDuration: "0.4s", transitionDelay: "0ms" }}>
                                    <a data-fancybox-href="image/picture5.jpeg" data-fancybox="galleryUser">
                                        <img src="image/picture5.jpeg" />
                                    </a>
                                </div>
                                <div className="Picture_Item" style={{ position: "absolute", transitionProperty: "opacity, transform", transitionDuration: "0.4s", transitionDelay: "0ms" }}>
                                    <a data-fancybox-href="image/picture6.jpg" data-fancybox="galleryUser">
                                        <img src="image/picture6.jpg" />
                                    </a>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        return render;
    }
    public render() {
        let render = null;
        let person = this.state.person
        if (person == null) return null
        render = <div className="profile_content">
            {this.renderLeft(person)}
            {this.renderRight()}
        </div>
        return render;
    }
}
