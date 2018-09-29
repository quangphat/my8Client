import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './index.css'



interface ContentEditableProps {
    onChange: Function,
    hasBorder: boolean,
    placeHolder: string
}
export class ContentEditable extends React.Component<ContentEditableProps, {}>{
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    private getText(el) {
        return el.innerText || this.getTextForFirefox(el);
    }
    private getTextForFirefox(el) {
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
    }
    private OnChange(this, e) {
        var text = this.getText(e.target);
        if (this.props.onChange != null)
            this.props.onChange(text)
    }
    private onPaste(ev) {
        debugger
        ev.preventDefault();
        var text = ev.clipboardData.getData("text");
        document.execCommand('insertText', false, text);
    }
    public render(this) {
        let render = null;
        let border = this.props.hasBorder ? 'border' : '';
        render = <div className={`content-editable ${border} pd5`}>
            <div contentEditable={true}
                data-placeholder={this.props.placeHolder}
                role="textbox" suppressContentEditableWarning={true}
                onPaste={this.onPaste}
                aria-multiline={true} onInput={this.OnChange.bind(this)} className="content-editable-body">
            </div>
        </div>
        return render;
    }
}