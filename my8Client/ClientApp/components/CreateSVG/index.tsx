import * as React from 'react';
import * as classnames from 'classnames';
import './index.css';

interface ICreateSVGProps {
    linkHref: string,
    className?: string,
    size: number,
    rotate?: number,
    style?: any
}

export class CreateSVG extends React.Component<ICreateSVGProps, {}> {
    constructor(props: any) {
        super(props)
    }

    public render() {
        let { className, size, rotate, style } = this.props
        let classes = classnames({
            'svg-next-icon': true,
            [className]: className,
            [`svg-next-icon-size-${size}`]: size,
            [`svg-next-icon-rotate-${rotate}`]: rotate
        })

        if (this.props.linkHref != null) {
            return <svg className={classes} style={style}>
                <use xmlnsXlink='http://www.w3.org/1999/xlink' xlinkHref={this.props.linkHref}></use>
            </svg>;
        } else {
            return null;
        }

    }
}