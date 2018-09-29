import * as React from 'react';
import './login.css';
export class Login extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
    }
    public componentDidMount(this) {
        window.location.reload()
    };
    public render(this) {
        let render = null;
        render = <div className="global-wrapper">
            <div className="login-header">
                <form className="login-form" action="Login" method="post">
                    <span className="icon1"><i className="fa fa-user" aria-hidden="true"></i></span>
                    <input placeholder="E-mail" className="login-email" name="Email" type="email" required />
                    <span className="icon2"><i className="fa fa-lock" aria-hidden="true"></i></span>
                    <input placeholder="Password" className="login-password" name="Password" type="password" required />
                            <input type="submit" className="btn btn-login" value="Login" />
            </form>
        </div>
                    <div className="login-body">
                        <div className="register-body">
                            <div className="register-main-content">
                                <div className="register-form">
                            <h2 className="title">Hãy là ngôi sao trong việc bạn làm</h2>
                            <div style={{ paddingTop :"20px" }}>
                                <div style={{ display: "block" }}><h2 className="register-title">Đăng ký</h2></div>
                                        <div><p>Luôn miễn phí</p></div>
                                    </div>
                                    <div className="border-bottom-1"></div>
                            <div className="register-form-body">
                                <div style={{ marginBottom: "10px" }}>
                                            <div><label>Họ</label></div>
                                            <div><input type="text" className="form-control" id="exampleInputEmail1" placeholder="Nhập họ của bạn"/></div>
                                            </div>
                                <div style={{ marginBottom: "10px" }}>
                                                <div><label>Tên</label></div>
                                                <div><input type="text" className="form-control" id="exampleInputEmail2" placeholder="Nhập tên của bạn"/></div>
                                                </div>
                                    <div style={{ marginBottom: "10px" }}>
                                                    <div><label>Email</label></div>
                                                    <div><input type="email" className="form-control" id="exampleInputEmail3" placeholder="Nhập email"/></div>
                                                    </div>
                                        <div style={{ marginBottom: "10px" }}>
                                                        <h3>Bạn là: </h3>
                                                        <a>(Tại sao tôi phải chọn thông tin này?)</a>
                                                        <br />
                                    <div>
                                        <div style={{ display: "inline-block", marginRight: "20px" }}><input type="radio" name="user-type" />Ứng viên tìm việc</div>
                                        <div style={{ display: 'inline-block' }}><input type="radio" name="user-type" />Nhà tuyển dụng</div>
                                                        </div>
                                </div>
                                <span className="agreement">By clicking Join now, you agree to the my8 <br /> <a tabIndex={4} href="#">User Agreement</a>, <a tabIndex={4} href="#">Privacy Policy</a>, and <a tabIndex={4} href="#">Cookie Policy</a>.</span>
                                                    <input type="submit" className="btn btn-signup" value="Sign up" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        </div>
        return null;
    }

}