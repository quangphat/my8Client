import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Utils from '../../infrastructure/Utils';
import * as Models from '../../Models'
import './index.css'


interface CommentNotifyProps {

}
export class CommentNotify extends React.Component<CommentNotifyProps, {}>{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    public componentWillReceiveProps(this, nextProps: CommentNotifyProps) {
    }

    public render(this) {
        let render = null;
        return render;
    }
}