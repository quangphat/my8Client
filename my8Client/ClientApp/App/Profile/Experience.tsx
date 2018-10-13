import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { HubConnection } from '@aspnet/signalr';
import { PersonRepository } from '../../repositories/PersonRepository';
import { ExperienceRepository } from '../../repositories/ExperienceRepository';
import './index.css';
import * as Utils from '../../infrastructure/Utils';
import * as OptionList from '../../OptionList'
import * as AppIcons from '../../AppIcon'
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { InputCheckbox } from '../../components/InputCheckbox';
import { Combobox } from '../../components/Combobox/Combobox'
import { ScrollBottom } from '../../components/ScrollBottom/ScrollBottom'
import { ExperienceItem } from '../../components/ExperienceItem/ExperienceItem'
import * as Models from '../../Models'

interface ExperienceProps {
    person: Models.IShortPerson
}

interface ExperienceStates {
    isOpenPopupAddExperience: boolean,
    model: Models.IExperience,
    isLockButton: boolean,
    experiences: Models.IExperience[],
    paging: Models.IPaging,
    isHasMore: boolean
}
export class Experience extends React.Component<ExperienceProps, ExperienceStates> {
    constructor(props) {
        super(props);
        this.state = {
            isOpenPopupAddExperience: false,
            model: null,
            isLockButton: false,
            experiences: [],
            paging: {
                skip: 0,
                limit:10
            },
            isHasMore: false
        };
    }

    public componentWillMount() {
    }

    componentWillReceiveProps(newProps) {
    }


    public componentDidMount() {
        this.getExperiences(this.state.paging)
    };
    private getExperiences(paging: Models.IPaging) {
        ExperienceRepository.GetExperiencesByPerson(this.props.person.Id, paging.skip, paging.limit).then(response => {
            let data = response.data.Datas
            let exs = this.state.experiences
            if (exs == null) exs = []
            exs = exs.concat(data)
            let totalRecord = response.data.TotalRecord
            let isHasmore = false
            if ((paging.skip + 1) * paging.limit < totalRecord)
                isHasmore = true
            this.setState({ experiences: exs, isHasMore: isHasmore, paging: paging })
        })
    }
    private onEditModel(e, type: string) {
        if (e == null) return
        let model = this.state.model
        if (model == null) model = new Object as Models.IExperience
        if (type == 'Title' || type == 'CompanyName' || type == 'WorkAs' || type =='Description')
            model[type] = e.target.value
        else if (type == 'isworkinghere')
            model.isCurrentlyWorkHere = e

        this.setState({ model: model })
    }
    private onChangeMonth(e, type: string) {
        if (e == null) return
        let model = this.state.model
        if (model == null) model = new Object as Models.IExperience
        let value = Number(e)
        if (type = 'from')
            model.FromMonth = value
        else {
            model.ToMonth = value
        }
        this.setState({ model: model })
    }
    private onChangeYear(e, type: string) {
        if (e == null) return
        let model = this.state.model
        if (model == null) model = new Object as Models.IExperience
        let value = Number(e)
        if (type = 'from')
            model.FromYear = value
        else {
            model.ToYear = value
        }
        this.setState({ model: model })
    }
    private onClickSaveExperience() {
        let model = this.state.model
        if (model == null) return
        this.setState({ isLockButton: true })
        model.FromDate = new Date(model.FromYear, model.FromMonth, 1)
        if (model.isCurrentlyWorkHere) {
            model.ToDate = null
        }
        else {
            model.ToDate = new Date(model.ToYear, model.ToMonth, 1)
        }
        ExperienceRepository.CreateExperience(model).then(response => {
            if (response.error == null && response.data != null) {
                model.Id = response.data as string
                this.setState({ model: model, isLockButton: false, isOpenPopupAddExperience: false })
            }
            else {
                this.setState({ isLockButton: false })
            }
        })
    }
    private onScrollBottom() {
        if (this.state.isHasMore) {
            let paging = this.state.paging
            paging.skip += 1;
            this.getExperiences(paging);
        }
    }
    private renderAddExperiencePopup() {
        let thisYear = new Date().getFullYear()
        return <Modal isOpen={this.state.isOpenPopupAddExperience}
            headerTitle="Thêm kinh nghiệm"
            isBtnClose={false}
            footerDisabledCloseModal={true}
            size="lg"
            bodyContent={
                <div className="job-posting-container">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <label >Job title</label>
                                <input type="text" className="form-control" onChange={(e)=>this.onEditModel(e,'Title')} placeholder="Tiêu đề việc làm" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <label >Company name</label>
                                <input type="text" className="form-control" onChange={(e) => this.onEditModel(e, 'CompanyName')} placeholder="Tên công ty" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <label>Location</label>
                                <input type="text" className="form-control" id="" placeholder="Địa điểm" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12 col-md-6" id="job-post-form">
                            <label>Từ</label>
                            <Combobox
                                data={ListMonth}
                                defaultValue={ListMonth[0].value.toString()}
                                isBlueScreen={false}
                                onChange={(e)=>this.onChangeMonth(e,'from')}
                                className="" />
                            <Combobox
                                data={Utils.getListYear()}
                                defaultValue={thisYear.toString()}
                                isBlueScreen={false}
                                onChange={(e) => this.onChangeYear(e,'from')}
                                className="" />
                        </div>
                        <div className="col-xs-12 col-md-6" id="job-post-form">
                            <label>Đến</label>
                            <Combobox
                                data={ListMonth}
                                defaultValue={ListMonth[0].value.toString()}
                                isBlueScreen={false}
                                onChange={(e) => this.onChangeMonth(e, 'to')}
                                className="" />
                            <Combobox
                                data={Utils.getListYear()}
                                defaultValue={thisYear.toString()}
                                isBlueScreen={false}
                                onChange={(e) => this.onChangeYear(e, 'to')}
                                className="" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <InputCheckbox content="Tôi vẫn đang làm ở đây" isChecked={false}
                            handleOnChange={(e)=>this.onEditModel(e,'isworkinghere')}
                            nameInput='currentlyworkhere' />
                    </div>
                    <div className="form-group row">
                        <div className="col-xs-12 col-md-12">
                            <label >Work As</label>
                            <input type="text" className="form-control" onChange={(e) => this.onEditModel(e, 'WorkAs')} placeholder="Nghề nghiệp" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-xs-12 col-md-12">
                            <label >Mô tả</label>
                            <input type="text" className="form-control" multiple={true}
                                onChange={(e) => this.onEditModel(e, 'Description')} placeholder="Thêm mô tả về việc bạn làm" />
                        </div>
                    </div>
                </div>
            }
            afterCloseModal={() => this.setState({ isOpenPopupAddExperience: false })}
            footerContent={<Button type="primary" isDisabled={this.state.isLockButton} handleOnClick={() => this.onClickSaveExperience()} >
                <span>Lưu</span>
            </Button>}
        >
        </Modal>
    }
    private renderExperienceItem(experiences: Models.IExperience[]) {
        if (Utils.isArrNullOrHaveNoItem(experiences)) return
        return experiences.map(e => {
            return <ExperienceItem key={e.Id} experience={e} />
        })
    }
    public render() {
        return <div>
            <Button type="link" className="new-experience" handleOnClick={() => this.setState({ isOpenPopupAddExperience: true })}>
                {AppIcons.svgPlus()}
                <span>Thêm kinh nghiệm</span>
            </Button>
            {this.renderExperienceItem(this.state.experiences)}
            {this.renderAddExperiencePopup()}
            <ScrollBottom onBottom={()=>this.onScrollBottom()} />
        </div>
    }
}
export const ListMonth = [
    { value: 0, display: 'Chọn Tháng' },
    { value: 1, display: 'Tháng 1' },
    { value: 2, display: 'Tháng 2' },
    { value: 3, display: 'Tháng 3' },
    { value: 4, display: 'Tháng 4' },
    { value: 5, display: 'Tháng 5' },
    { value: 6, display: 'Tháng 6' },
    { value: 7, display: 'Tháng 7' },
    { value: 8, display: 'Tháng 8' },
    { value: 9, display: 'Tháng 9' },
    { value: 10, display: 'Tháng 10' },
    { value: 11, display: 'Tháng 11' },
    { value: 12, display: 'Tháng 12' }
]