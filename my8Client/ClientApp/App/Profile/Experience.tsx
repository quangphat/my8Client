import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { HubConnection } from '@aspnet/signalr';
import { PersonRepository } from '../../repositories/PersonRepository';
import './index.css';
import * as Utils from '../../infrastructure/Utils';
import * as AppIcons from '../../AppIcon'
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { ExperienceItem } from '../../components/ExperienceItem/ExperienceItem'

interface ExperienceStates {
    isOpenPopupAddExperience: boolean
}
export class Experience extends React.Component<{}, ExperienceStates> {
    constructor(props) {
        super(props);
        this.state = {
            isOpenPopupAddExperience: false
        };
    }

    public componentWillMount() {
    }

    componentWillReceiveProps(newProps) {
    }


    public componentDidMount() {

    };
    private renderAddExperiencePopup() {
        return <Modal isOpen={this.state.isOpenPopupAddExperience}
            headerTitle="Thêm kinh nghiệm"
            bodyContent={
                <div>Kinh nghiệm</div>
            }
            afterCloseModal={() => this.setState({ isOpenPopupAddExperience: false })}
        >
        </Modal>
    }
    public render() {
        return <div>
            <Button type="link" className="new-experience" handleOnClick={() => this.setState({ isOpenPopupAddExperience: true })}>
                {AppIcons.svgPlus()}
                <span>Thêm kinh nghiệm</span>
            </Button>
            <ExperienceItem />
            <ExperienceItem />
            {this.renderAddExperiencePopup()}
        </div>
    }
}
