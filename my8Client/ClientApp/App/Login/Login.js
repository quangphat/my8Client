"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./login.css");
var Login = (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        return _super.call(this, props) || this;
    }
    Login.prototype.componentDidMount = function () {
        window.location.reload();
    };
    ;
    Login.prototype.render = function () {
        var render = null;
        render = React.createElement("div", { className: "global-wrapper" },
            React.createElement("div", { className: "login-header" },
                React.createElement("form", { className: "login-form", action: "Login", method: "post" },
                    React.createElement("span", { className: "icon1" },
                        React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" })),
                    React.createElement("input", { placeholder: "E-mail", className: "login-email", name: "Email", type: "email", required: true }),
                    React.createElement("span", { className: "icon2" },
                        React.createElement("i", { className: "fa fa-lock", "aria-hidden": "true" })),
                    React.createElement("input", { placeholder: "Password", className: "login-password", name: "Password", type: "password", required: true }),
                    React.createElement("input", { type: "submit", className: "btn btn-login", value: "Login" }))),
            React.createElement("div", { className: "login-body" },
                React.createElement("div", { className: "register-body" },
                    React.createElement("div", { className: "register-main-content" },
                        React.createElement("div", { className: "register-form" },
                            React.createElement("h2", { className: "title" }, "H\u00E3y l\u00E0 ng\u00F4i sao trong vi\u1EC7c b\u1EA1n l\u00E0m"),
                            React.createElement("div", { style: { paddingTop: "20px" } },
                                React.createElement("div", { style: { display: "block" } },
                                    React.createElement("h2", { className: "register-title" }, "\u0110\u0103ng k\u00FD")),
                                React.createElement("div", null,
                                    React.createElement("p", null, "Lu\u00F4n mi\u1EC5n ph\u00ED"))),
                            React.createElement("div", { className: "border-bottom-1" }),
                            React.createElement("div", { className: "register-form-body" },
                                React.createElement("div", { style: { marginBottom: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement("label", null, "H\u1ECD")),
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "text", className: "form-control", id: "exampleInputEmail1", placeholder: "Nh\u1EADp h\u1ECD c\u1EE7a b\u1EA1n" }))),
                                React.createElement("div", { style: { marginBottom: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement("label", null, "T\u00EAn")),
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "text", className: "form-control", id: "exampleInputEmail2", placeholder: "Nh\u1EADp t\u00EAn c\u1EE7a b\u1EA1n" }))),
                                React.createElement("div", { style: { marginBottom: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement("label", null, "Email")),
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "email", className: "form-control", id: "exampleInputEmail3", placeholder: "Nh\u1EADp email" }))),
                                React.createElement("div", { style: { marginBottom: "10px" } },
                                    React.createElement("h3", null, "B\u1EA1n l\u00E0: "),
                                    React.createElement("a", null, "(T\u1EA1i sao t\u00F4i ph\u1EA3i ch\u1ECDn th\u00F4ng tin n\u00E0y?)"),
                                    React.createElement("br", null),
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { display: "inline-block", marginRight: "20px" } },
                                            React.createElement("input", { type: "radio", name: "user-type" }),
                                            "\u1EE8ng vi\u00EAn t\u00ECm vi\u1EC7c"),
                                        React.createElement("div", { style: { display: 'inline-block' } },
                                            React.createElement("input", { type: "radio", name: "user-type" }),
                                            "Nh\u00E0 tuy\u1EC3n d\u1EE5ng"))),
                                React.createElement("span", { className: "agreement" },
                                    "By clicking Join now, you agree to the my8 ",
                                    React.createElement("br", null),
                                    " ",
                                    React.createElement("a", { tabIndex: 4, href: "#" }, "User Agreement"),
                                    ", ",
                                    React.createElement("a", { tabIndex: 4, href: "#" }, "Privacy Policy"),
                                    ", and ",
                                    React.createElement("a", { tabIndex: 4, href: "#" }, "Cookie Policy"),
                                    "."),
                                React.createElement("input", { type: "submit", className: "btn btn-signup", value: "Sign up" })))))));
        return null;
    };
    return Login;
}(React.Component));
exports.Login = Login;
//# sourceMappingURL=Login.js.map