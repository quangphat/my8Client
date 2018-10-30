import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { HubConnection } from '@aspnet/signalr';
import * as Croppie from "react-croppie";
import '../css/cropper.css';
import * as Utils from '../infrastructure/Utils';
export class CropImage extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
        let croppie = new Croppie();
        this.state = {
            email: '',
            message: '',
            messages: [],
            hubConnection: null,
            croppie: null
        };

    }

    public componentDidMount(this) {

    };
    getResult(options) {
        let x = options;
    }
    private resultantImage(this) {
        let el = this.refs.reactCroppie
        //el.croppie('result', {
        //    type: 'rawcanvas',
        //    circle: true,
        //    // size: { width: 300, height: 300 },
        //    format: 'png'
        //}).then(function (canvas) {

        //});
        el.result({ format: 'base64', size: { width: 100, height: 100 } }).then(function (resp) {
            console.log(resp);
            var image = new Image();
            image.src = resp;
            document.body.appendChild(image);
        });

    }
    reactCroppie = null
    public render(this) {
        let render = null;
        render = <div><img className="crop-area image-responsive" src='../../../../assets/images/banner.jpg' />
            <button className="btn btn-primary" onClick={this.resultantImage.bind(this)}>Image</button>
        </div >

        render = <div><Croppie url='../../../../assets/images/banner.jpg' ref={(reactCroppie)=>this.reactCroppie = reactCroppie} />
            <button className="btn btn-primary" onClick={this.resultantImage.bind(this)}>Image</button>
        </div>
        return render;
    }
}
