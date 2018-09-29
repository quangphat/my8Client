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
require("./index.css");
var ContentEditable = (function (_super) {
    __extends(ContentEditable, _super);
    function ContentEditable(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ContentEditable.prototype.getText = function (el) {
        return el.innerText || this.getTextForFirefox(el);
    };
    ContentEditable.prototype.getTextForFirefox = function (el) {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            var tempRange = sel.getRangeAt(0);
            sel.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(el);
            sel.addRange(range);
            text = sel.toString();
            sel.removeAllRanges();
            sel.addRange(tempRange);
        }
        return text;
    };
    ContentEditable.prototype.OnChange = function (e) {
        var text = this.getText(e.target);
        if (this.props.onChange != null)
            this.props.onChange(text);
    };
    ContentEditable.prototype.onPaste = function (ev) {
        debugger;
        ev.preventDefault();
        var text = ev.clipboardData.getData("text");
        document.execCommand('insertText', false, text);
    };
    ContentEditable.prototype.render = function () {
        var render = null;
        var border = this.props.hasBorder ? 'border' : '';
        render = React.createElement("div", { className: "content-editable " + border + " pd5" },
            React.createElement("div", { contentEditable: true, "data-placeholder": this.props.placeHolder, role: "textbox", suppressContentEditableWarning: true, onPaste: this.onPaste, "aria-multiline": true, onInput: this.OnChange.bind(this), className: "content-editable-body" }));
        return render;
    };
    return ContentEditable;
}(React.Component));
exports.ContentEditable = ContentEditable;
//# sourceMappingURL=ContentEditable.js.map