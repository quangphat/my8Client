import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Utils from '../../infrastructure/Utils';
import * as AppIcon from '../../AppIcon';
import './index.css';
export interface LayoutNoFollowingPageProps {
    children?: React.ReactNode
}
export class LayoutNoFollowingPage extends React.Component<LayoutNoFollowingPageProps, {}> {
    constructor(props) {
        super(props)
    }
    private onChangeChecked() {

    }
    private renderNavBar() {
        let render = null
        let Account = Utils.getCurrentAccount();
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
                    <a href={'/profile/' + Account.ProfileName} className="avartar_and_name">
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

    public render() {
        if (document['account'] == null) {
            return null
        }
        return <div>
            {this.renderNavBar()}
            <section className="body_content">
                {this.props.children}
            </section>
        </div>
    }
}

