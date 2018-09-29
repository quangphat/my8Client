import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './popup.css'

interface PopupProps {
    isOpening: boolean,
    isShowCloseButton: boolean,
    headerTitle: JSX.Element,
    bodyContent: JSX.Element,
    footerContent?: JSX.Element,
    onClose: Function
}
export class Popup extends React.Component<PopupProps, {}>{
    constructor(props) {
        super(props);
        let isOpening = this.props.isOpening != null ? this.props.isOpening : false
        this.state = {
            isOpening: isOpening
        };
        this.handleOnClickOutside = this.handleOnClickOutside.bind(this)
    }
    public componentWillMount(this) {
        document.addEventListener('click', this.handleOnClickOutside, false);
    }
    public componentWillUnmount(this) {
        document.removeEventListener('click', this.handleOnClickOutside, false);
    }
    private handleOnClickOutside(this, e) {
        let ref_popup = this.refs.popup;
        if (ref_popup != null && e.target.id == "popup") {
            this.handleClose()
        }
    }
    public componentWillReceiveProps(this, nextProps: PopupProps) {
        let isOpening = nextProps.isOpening != null ? nextProps.isOpening : false
        this.setState({ isOpening: isOpening })
    }
    private handleClose(this) {
        this.props.onClose()
    }
    public render(this) {
        let render = null
        let className = this.state.isOpening == true ? ' opening' : ''
        render = <div ref="popup" id="popup" className={'modal' + className}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="popup-header">
                        {this.props.headerTitle}
                        {this.props.isShowCloseButton ?
                            <button type="button" className="popup-close" aria-label="Close" onClick={this.handleClose.bind(this)}><span aria-hidden="true">×</span></button>
                            : null
                        }
                    </div>
                    <div className="modal-body">
                        {this.props.bodyContent}
                    </div>
                    {this.props.footerContent != null ? <div className="popup-footer">{this.props.footerContent}</div>
                        : null
                    }
                   
                </div>
            </div>
        </div>
        return render;

    }
}