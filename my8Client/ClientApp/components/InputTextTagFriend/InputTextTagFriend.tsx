import * as React from 'react';
import * as Utils from '../../infrastructure/Utils';
import { PersonRepository } from '../../repositories/PersonRepository';
import * as Models from '../../Models'

import './index.css'


interface InputTextTagFriendProps {
    placeholder?: string,
    defaultValue?: string,
    onSelect: Function,
    onBlur?: Function,
    className?: string,
    isReadonly?: boolean,
    isDisplayAfterSelect?: boolean
}
export class InputTextTagFriend extends React.Component<InputTextTagFriendProps, {}>{
    constructor(props) {
        super(props);
        let search = this.props.defaultValue != null ? this.props.defaultValue:''
        this.state = {
            is_selecting: false,
            friends: [],
            search: this.props.defaultValue || '',
            selecting_index: null as number,
        }
        this.setFocus = this.setFocus.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnFocus = this.handleOnFocus.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
    }
   
    public setFocus(this) {
        this.ref_component.setFocus()

        let self = this

        setTimeout(() => {
            self.handleOnChange(this.state.search)
        }, 50)
    }
    private onGetListFriends(this) {
        return new Promise(resolve => {
            let friends = Utils.getFriends();
            if (friends == null) {
                PersonRepository.GetTopFriend().then(response => {
                    if (response.error == null) {
                        let persons = response.data as Models.IPersonAllin[]
                        let friends = persons.map(p => p.Person);
                        Utils.setFriends(persons);
                        resolve(friends);
                    }
                })
            }
            else {
                resolve(friends);
            }
        })
    }
    private handleOnChange(this, value) {
        //let value = null;
        //if (typeof e === 'string') {
        //    value = e;
        //}
        //else {
        //    if (e == null || e.target == null) {
        //        this.setState({ search: '' })
        //        return;
        //    }
        //    value = e.target.value;
        //}
        console.log(value);
        if (Utils.isNullOrEmpty(value)) {
            this.setState({ is_selecting: false, search: '' })
            return;
        }
            this.onGetListFriends()
                .then((data: Models.IShortPerson[]) => {
                    let friends = data != null && data.length > 0
                        ? data.filter(p => p.DisplayName.toLowerCase().indexOf(value.toLowerCase()) > -1)
                        : []

                    let selecting_index = this.state.selecting_index

                    if (friends.length > 0) {
                        if (selecting_index == null || selecting_index == -1) {
                            selecting_index = 0
                        }
                    } else {
                        selecting_index = -1
                    }

                    this.setState({ search: null, friends: friends, selecting_index: selecting_index, is_selecting: true })
                })
    }
    private handleOnFocus(this) {
        if (Utils.isNullOrEmpty(this.state.search)) {
            this.setState({ is_selecting: false,search:'' })
        }
        else
            this.setState({ is_selecting: true })

        let self = this

        setTimeout(() => {
            self.handleOnChange(this.state.search)
        }, 50)
    }
    private handleOnBlur(this) {
        this.setState({ search: ''});
        let friendTag = this.refs.friendTag
        friendTag.value = '';
        friendTag.defaultValue =''
    }
    private handleOnKeyDown(this, e, value: string) {
        if (e.key == 'Enter') {
            let selecting_index = this.state.selecting_index

            let selectedValue = null

            if (selecting_index > -1) {
                let friends = this.state.friends as Models.IShortPerson[]

                if (friends != null && friends.length > selecting_index) {
                    selectedValue = friends[selecting_index]
                }
            } else {
                selectedValue = value
            }

            if (selectedValue != null) {
                let self = this

                setTimeout(() => {
                    self.handleOnSelect(selectedValue)
                }, 50)
            }
        } else if (e.key == 'ArrowDown') {
            let selecting_index = this.state.selecting_index
            let friends = this.state.friends as Models.IShortPerson[]

            if (selecting_index != -1 && friends != null && friends.length > selecting_index + 1) {
                selecting_index = selecting_index + 1
            } else {
                selecting_index = -1
            }

            this.setState({ selecting_index: selecting_index })

            e.stopPropagation()
        } else if (e.key == 'ArrowUp') {
            let selecting_index = this.state.selecting_index
            let friends = this.state.friends as Models.IShortPerson[]

            if (friends != null) {
                if (selecting_index - 1 > 0) {
                    selecting_index = selecting_index - 1
                } else {
                    selecting_index = 0
                }
            } else {
                selecting_index = -1
            }

            this.setState({ selecting_index: selecting_index })

            e.stopPropagation()
        }
    }
    private handleOnSelect(this, value) {
        this.props.onSelect(value)
        this.setState({ search: '', is_selecting: false });
        let friendTag = this.refs.friendTag
        friendTag.value = '';
        friendTag.defaultValue = ''
        friendTag.focus();
    }
    private handleOnMouseOver(this, index) {
        this.setState({ selecting_index: index })
    }

    public render(this) {
        let render = null;
        let is_selecting = this.state.is_selecting
        let friends = this.state.friends as Models.IShortPerson[]
        let search = this.state.search as string
        let selecting_index = this.state.selecting_index as number
        let renderFriends = null

        if (is_selecting) {
            let canSelectIndexByKey = false

            if (search != '') {
                canSelectIndexByKey = true

                if (selecting_index >= friends.length) {
                    selecting_index = 0
                }
            }

            renderFriends = <ul className='tags-search-result'>
                {friends.map((friend: Models.IShortPerson, index: number) => {
                    return <li key={index} className={selecting_index == index ? 'tags-search-item is_selecting' : 'tags-search-item'} onClick={this.handleOnSelect.bind(this, friend)} onMouseOver={this.handleOnMouseOver.bind(this, index)}>
                        <div className="ml-5">
                            <img className="avatar" src="../../../../assets/images/avatar/avatar4.png" />
                            <div className="tag-header-info">
                                <span className="displayname">{friend.DisplayName}</span>
                                <span className="workas">{friend.WorkAs}</span>
                            </div>
                        </div>
                    </li>
                })
                }
            </ul>
        }

        render = <div className='input-text-tag' >
            <input ref="friendTag"
                defaultValue={this.state.search}
                placeholder={this.props.placeholder}
                onChange={(e) => this.handleOnChange(e.target.value)}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
                onKeyDown={this.handleOnKeyDown}
                className={this.props.className} />
            {renderFriends}
        </div>
        return render;
    }
}