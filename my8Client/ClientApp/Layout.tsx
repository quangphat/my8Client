import * as React from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    constructor() {
        super();

        this.state = {
            email: '',
            message: '',
            messages: [],
            hubConnection: null,
        };
        this.sendMessage = this.sendMessage.bind(this)
    }
    public sendMessage(this) {
        this.state.hubConnection
            .invoke('SendToAll', this.state.email, this.state.message)
            .catch(err => console.error(err));

        this.setState({ message: '' });
    };
    public componentDidMount(this) {
        if (document['account'] != null) {
            let email = document['account'].Email
            let hubConnection = new HubConnectionBuilder().withUrl('http://localhost:16000/chat').build();
            hubConnection.start().then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('))
            hubConnection.on("SendToAll", (nick, message) => {
                let text = `${email}: ${message}`;
                let messages = this.state.messages.concat([text]);
                this.setState({ messages: messages });
            })
            this.setState({ hubConnection: hubConnection, email: email })
        }
    }

    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-12 feed'>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}
