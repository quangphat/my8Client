import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PropTypes } from 'prop-types';
import * as Utils from '../../infrastructure/Utils';
import './index.css';
interface NotificationProps {
    timeOut: number,
    content: string
}
export class Notification extends React.Component<NotificationProps, {}> {
    constructor(props) {
        super(props);
        this.state = {
            timeOut: this.props.timeOut,
            hidden: false
        };
    }

    public componentDidMount(this) {
        setTimeout(() => {
            this.setState({ hidden: true })
        }, this.props.timeOut)
    }

    public render(this) {
        let render = null;
        let hidden = this.state.hidden;
        if (hidden) return null
        let key = new Date().getMilliseconds();
        render = <div className="notification notification-error">
                    <div className="author-avatar"><img src="../../../../assets/images/brand/logo1.png" /></div>
                    <div className="notification-message" role="alert">
                        <div className="message">{this.props.content}</div>
                    </div>
                </div>
        return render;
    }
}