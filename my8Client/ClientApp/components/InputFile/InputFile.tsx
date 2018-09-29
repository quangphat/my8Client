import * as React from 'react';
import * as Utils from '../../infrastructure/Utils';
import * as Models from '../../Models'
import { PropTypes } from 'prop-types';
import * as Dropzone from 'react-dropzone';

import './index.css'


interface InputFileProps {
    className?: string,
    children: React.ReactNode,
    multiple: boolean,
    accept: string,
    onChange: Function,
    isReadonly?: boolean,
    isTemporary?: boolean
}
export class InputFile extends React.Component<InputFileProps, {}>{
    constructor(props) {
        super(props);
        this.state = {
            dropzoneActive: false
        }
        this.handleOnDragEnter = this.handleOnDragEnter.bind(this)
        this.handleOnDragLeave = this.handleOnDragLeave.bind(this)
        this.handleOnDrop = this.handleOnDrop.bind(this)
    }
    static contextTypes = {
        ShowMessage: PropTypes.func
    }
    private handleOnDragEnter(this) {
        this.setState({ dropzoneActive: true })
    }
    private handleOnDragLeave(this) {
        this.setState({ dropzoneActive: false })
    }
    private handleOnDrop(this, acceptedFiles, rejectedFiles) {

        //if (acceptedFiles.length > 0) {
        //    if (this.props.multiple) {
        //        this.handleOnDragLeave()
        //        this.props.onChange(acceptedFiles)
        //    } else {
        //        this.getImageInfo(acceptedFiles[0], (imageInfo: ImageInfo) => {
        //            Fetch.Post("", {
        //                name: imageInfo.name,
        //                attachment: imageInfo.data,
        //                is_temporary: this.props.isTemporary != null ? this.props.isTemporary : false
        //            } as MediaUpload).then((response: IResponse<Models.IMedia>) => {
        //                this.handleOnDragLeave()

        //                if (response.error == null) {
        //                    imageInfo.src = response.data.url
        //                    imageInfo.size = response.data.size
        //                    imageInfo.expired_date = response.data.expired_date

        //                    this.props.onChange(imageInfo)
        //                } else {
        //                    this.context.ShowMessage('error', response.error.message, response.error.code)
        //                }
        //            })
        //        })
        //    }
        //}
    }
    private getImageInfo(file, onDone: Function) {
        const i = new Image()

        i.onload = () => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                onDone({
                    name: file.name,
                    src: file.preview,
                    width: i.width,
                    height: i.height,
                    data: reader.result,
                    size: file.size
                } as ImageInfo)
            }
        }

        i.src = file.preview
    }
    public render(this) {
        let render = null;
        let className = 'input-file'

        if (this.state.dropzoneActive) {
            className += ' is_dragging'
        }

        if (this.props.className != null) {
            className += ' ' + this.props.className
        }

        className = className.trim()

        render = < div className = { className } >
            <Dropzone
                disabled={this.props.isReadonly}
                onDragEnter={this.handleOnDragEnter}
                onDragLeave={this.handleOnDragLeave}
                onDrop={this.handleOnDrop}
                multiple={this.props.multiple}
                className='input-file-drop'
                accept={this.props.accept}>
                {this.props.children}
            </Dropzone>
        </div>
        return render;
    }
}
interface MediaUpload {
    name: string,
    attachment: string
}

export interface ImageInfo {
    name: string,
    src: string,
    width: number,
    height: number,
    data: string,
    size: number,
    expired_date?: number
}
