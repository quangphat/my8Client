import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Utils from '../../infrastructure/Utils';
import * as Models from '../../Models';
import { PersonRepository } from '../../repositories/PersonRepository';
import { FollowingPageItem } from '../../components/FollowingPageItem/FollowingPageItem';
import { Notification } from '../../components/Notification/Notification'
import { Button } from '../../components/Button'
import * as AppIcon from '../../AppIcon';
import { PropTypes } from 'prop-types';
import './index.css';
export interface MainLayoutProps {
    children?: React.ReactNode
}
interface MainLayoutStates {
    FollowingPages: Models.IPage[],
    testSignalR: any,
    showNotify: boolean,
    notifies: any[]
}
export class MainLayout extends React.Component<MainLayoutProps, MainLayoutStates> {
    constructor(props) {
        super(props);
        this.state = {
            FollowingPages: [],
            testSignalR: null,
            showNotify: false,
            notifies: []
        }
    }

    componentDidMount() {
        this.getFollowingPages();
        this.getTopInteractiveFriends();
        Utils.createHubConnection();
        Utils.hubConnection.on('NotifyComment', (Notify) => {
            this.ShowMessage('success', Notify.Content);
            //this.setState({ Notify: Notify })
        });
    }
    static childContextTypes = {
        ShowMessage: PropTypes.func,
        _sendCommentNotify: PropTypes.func
    }
    private _sendCommentNotify(Notify: Models.INotification) {
        Utils.hubConnection
            .invoke('NotifyComment', Notify).then((response) => {
            })
            .catch(err => console.error(err));

    }
    private ShowMessage(type: string, message?: string, error_code?: string) {
        let notifies = this.state.notifies;
        if (notifies == null) notifies = []
        let notify = <Notification timeOut={10000} content={message} />
        let key = new Date().getMilliseconds();
        notifies.push(notify);

        notifies = notifies.reverse()
        this.setState({ notifies: notifies, showNotify: true });
    }
    private getChildContext() {
        return {
            ShowMessage: this.ShowMessage.bind(this),
            _sendCommentNotify: this._sendCommentNotify.bind(this)
        }
    }
    private getTopInteractiveFriends() {
        let friendsRaw = Utils.getFriends();
        if (friendsRaw == null) {
            PersonRepository.GetTopFriend().then(response => {
                if (response.error == null) {
                    let persons = response.data as Models.IPersonAllin[]
                    Utils.setFriends(persons);
                }
                else {

                }
            })
        }
        else {
            
        }
    }
    private getFollowingPages() {
        let cached = Utils.getFollowingPages();
        if (cached == null) {
            PersonRepository.GetFollowingPages().then(response => {
                if (response.error == null) {
                    let data = response.data as Models.IPage[]
                    Utils.setFollowingPages(data);
                    this.setState({ FollowingPages: data });
                }
            })
        }
        else {
            this.setState({ FollowingPages: cached });
        }
    }
    private onChangeChecked() {

    }
    private renderNavBar() {
        let Account = Utils.getCurrentAccount();
        let render = null
        render = <div className="header">
            <div className="container">
                <div className="logo-area">
                    <div className="logo">
                        <a href="#">LOGO</a>
                    </div>
                </div>
                <div className="search-area">
                    <div className="search_input">
                        <input type="text" placeholder="Tìm kiếm" />
                        <a className="btn-seach" href="#">{AppIcon.svgSearch()}</a>
                        <a className="search_Setting" href="#">
                            {AppIcon.svgSearchPlus()}
                        </a>
                    </div>
                </div>
                <div className="controller_notify">
                    <a href="#" className="notify-icon">
                        {AppIcon.svgHome()}
                    </a>
                    <div className="notify-icon">
                        {AppIcon.svgPersonAddFriendNotify()}
                        <span className="notify-label">4</span>
                    </div>
                    <div className="notify-icon">
                        {AppIcon.svgJobApplyNotify()}
                        <span className="notify-label">4</span>
                    </div>
                    <div className="notify-icon">
                        {AppIcon.svgNotify()}
                        <span className="notify-label">4</span>
                    </div>
                </div>
                <div className="info_user_header">
                    <a href={Utils.Path.profile(Account.Url)} className="avartar_and_name">
                        <div className="avartar_and_name_avartar">
                            <img src="../../../../assets/images/avatar/avatar_main.png" />
                        </div>
                        <div className="avartar_and_name_Name">
                            Superman
                        </div>
                        <div className="avartar_and_name_hover">
                            <div className="avartar_and_name_hover_background">
                                <div className="avartar_and_name_avartar_avartar">
                                    <img src="../../../../assets/images/avatar/avatar_main.png" />
                                </div>
                                <div className="avartar_and_name_name_avartar">
                                    <div className="name">
                                        Superman - Super Hero
                                    </div>
                                    <div className="job">
                                        Member since 1933
                                    </div>

                                </div>
                            </div>
                            <div className="avartar_and_name_name_avartar_control">
                                <div>Followers</div>
                                <div>Sales</div>
                                <div>Friends</div>
                            </div>
                            <div className="button_signOut_profile">
                                <div className="profile btn btn-default btn-flat">Profile</div>
                                <div className="SignOut btn btn-default btn-flat">Sign out</div>
                            </div>

                        </div>
                    </a>
                </div>
                <div id="openMenuRight" className="menu_toggle sidebar-toggle">
                    {AppIcon.svgMenu()}
                </div>

                <div className="clearfix"> </div>
            </div>
        </div>

        return render
    }
    private renderFollowedPageShortcut() {
        let render = null;
        let FollowingPages = this.state.FollowingPages;
        if (FollowingPages == null)
            return null;
        if (FollowingPages != null && FollowingPages.length > 0) {
            render = FollowingPages.map((page, index) => {
                return <FollowingPageItem key={page.PageId} Page={page} />
            })
        }
        return <div className="content_fix_left">
            <ul className="nav list_company">
                {render}
            </ul>
            <div className="clearfix"></div>
            <div className="about_company">
                <div className="logo_info_Company">
                    <img src="../../../../assets/images/Logo.png" />
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
    }
    private renderRecommendPage() {
        return <div className="list-page-wrapper">
            <div className="list-page-panel">
                <div className="list-page-panel-heading">
                    Trang được đề xuất
                    </div>
                <div className="list-page-panel-body">
                    <ul className="nav list-page">
                        <li>
                            <div className="page-item">
                                <img src="../../../../assets/images/brand/logo10.png" alt="DC comics" />
                                <div className="page-item-info">
                                    <div className="page-item-title">
                                        DC Comics
                                        </div>
                                    <div className="page-item-rate">
                                        4.7 <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half"></i>
                                    </div>
                                    <div className="page-item-like">100k người thích trang này</div>
                                    <div className="page-item-description">
                                        Chuyên trang về siêu anh hùng
                                        </div>
                                </div>
                                <div className="page-item-button">
                                    <a href="#">Follow</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="page-item">
                                <img src="../../../../assets/images/brand/logo11.png" alt="Marvel Comics" />
                                <div className="page-item-info">
                                    <div className="page-item-title">
                                        Marvel Comics
                                        </div>
                                    <div className="page-item-rate">
                                        4.5 <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half"></i>
                                    </div>
                                    <div className="page-item-like">100k người thích trang này</div>
                                    <div className="page-item-description">
                                        Chuyên trang về siêu anh hùng
                                        </div>
                                </div>
                                <div className="page-item-button">
                                    <a href="#">Follow</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="page-item">
                                <img src="../../../../assets/images/brand/logo12.png" alt="Disney Channel" />
                                <div className="page-item-info">
                                    <div className="page-item-title">
                                        Disney Channel
                                        </div>
                                    <div className="page-item-rate">
                                        4.5 <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half"></i>
                                    </div>
                                    <div className="page-item-like">100k người thích trang này</div>
                                    <div className="page-item-description">
                                        Chuyên trang về thiếu nhi
                                        </div>
                                </div>
                                <div className="page-item-button">
                                    <a href="#">Follow</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    }
    private renderChatlist() {
        return <section className="Chat_list">
            <div className="yourpage">
                <div className="your_page_title">
                    Trang của bạn
            </div>
                <div className="list_friends_item">
                    <div className="list_friends_item_avartar">
                        <img src="../../../../assets/images/avatar/avatar_main.png" />
                    </div>
                    <div className="list_friends_item_tittle title-oneline">
                        Superman
                </div>
                </div>
            </div>
            <div className="list_friends_wrapper">
                <div className="your_page_title">
                    Danh sách bạn bè
            </div>
                <ul className="nav list_friends">
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar1.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Ưng Hoàng Phúc<br />
                            <span>Ca sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                        <div id="hidden" className="hover_info_item_friend">
                            <div className="hover_info_item_friend_avartar">
                                <img src="../../../../assets/images/avatar/avatar1.png" />
                            </div>
                            <div className="hover_info_item_friend_info">
                                <div className="hover_info_item_friend_info_name">
                                    Ưng Hoàng Phúc<br />
                                    <span>Ca sĩ</span>
                                </div>
                                <div className="arrown_after_hover">

                                </div>
                            </div>
                            <div className="hover_info_item_friend_info_1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
                        </div>
                        </div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar2.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Đức Phúc<br />
                            <span>Ca sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar3.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Zero9<br />
                            <span>Boy band</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar4.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Sơn Tùng<br />
                            <span>Ca sĩ</span>
                        </div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar5.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Bùi Anh Tuấn<br />
                            <span>Ca sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar6.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Trung Quân<br />
                            <span>Ca sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar7.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Đạt G<br />
                            <span>Ca sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar8.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Phương Ly<br />
                            <span>Ca sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar9.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Mr. Siro<br />
                            <span>Nhạc sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar10.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Bảo Anh<br />
                            <span>Ca sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar11.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Hương Tràm<br />
                            <span>Ca sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="list_friends_item online_flag">
                        <div className="list_friends_item_avartar">
                            <img src="../../../../assets/images/avatar/avatar12.png" />
                        </div>
                        <div className="list_friends_item_tittle">
                            Mỹ Tâm<br />
                            <span>Ca sĩ</span>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                </ul>
            </div>
        </section>
    }
    private renderNotify() {
        let notifies = this.state.notifies
        if (notifies != null && notifies.length > 0) {
            return <div className="notification-container">
                {
                    notifies.map((item, index) => {
                        return <span key={index}>
                            {item}
                        </span>
                    })
                }

            </div>
        }

    }
    public render() {
        if (document['account'] == null) {
            return null
        }
        if (this.state.testSignalR != null) {
            console.log("Main layout : " + this.state.testSignalR)
        }
        let showNotify = this.state.showNotify

        return <div>
            {this.renderNavBar()}

            <section className="body_content">
                <div className="wrapper-content">
                    {this.renderFollowedPageShortcut()}
                    {showNotify ? this.renderNotify() : ''}
                    {this.props.children}
                    <div className="clearfix" />
                    {this.renderRecommendPage()}
                </div>
            </section>

            {this.renderChatlist()}
        </div>
    }
}

