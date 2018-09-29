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
var Croppie = require("react-croppie");
require("../css/cropper.css");
var CropImage = (function (_super) {
    __extends(CropImage, _super);
    function CropImage(props) {
        var _this = _super.call(this, props) || this;
        var croppie = new Croppie();
        _this.state = {
            email: '',
            message: '',
            messages: [],
            hubConnection: null,
            croppie: null
        };
        return _this;
    }
    CropImage.prototype.componentDidMount = function () {
    };
    ;
    CropImage.prototype.getResult = function (options) {
        var x = options;
    };
    CropImage.prototype.resultantImage = function () {
        var el = this.refs.reactCroppie;
        el.result({ format: 'base64', size: { width: 100, height: 100 } }).then(function (resp) {
            console.log(resp);
            var image = new Image();
            image.src = resp;
            document.body.appendChild(image);
        });
    };
    CropImage.prototype.render = function () {
        var render = null;
        render = React.createElement("div", null,
            React.createElement("img", { className: "crop-area image-responsive", src: '../../../../assets/images/banner.jpg' }),
            React.createElement("button", { className: "btn btn-primary", onClick: this.resultantImage.bind(this) }, "Image"));
        render = React.createElement("div", null,
            React.createElement(Croppie, { url: '../../../../assets/images/banner.jpg', ref: "reactCroppie" }),
            React.createElement("button", { className: "btn btn-primary", onClick: this.resultantImage.bind(this) }, "Image"));
        return render;
    };
    return CropImage;
}(React.Component));
exports.CropImage = CropImage;
//# sourceMappingURL=CropImage.js.map