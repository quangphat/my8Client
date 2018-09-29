import * as React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router';
import { Layout } from './Layout';
import * as App from '../ClientApp/App';
import * as Utils from '../ClientApp/infrastructure/Utils';
const AuthenticatedRoute = (
    { component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
        <Route {...rest} render={props =>
            document["test"] != null ?
                <Component {...props} /> : <Redirect to={{ pathname: Utils.Path.login, state: { from: props.location } }} />
        } />
    );
const AppRoute = ({ component: Component, layout: Layout, authenticated: boolean = false, ...rest }) => (
    <Router history={history}>
        <Route {...rest} render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )} />
    </Router>
)
const AppAutenticatedRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Redirect to={{ pathname: Utils.Path.login, state: { from: props.location } }} />
    )} />

)
const history = Utils.History
export const routes = <Switch>
    <AppRoute exact path={Utils.Path.jobPosting} layout={App.LayoutNoFollowingPage} component={App.JobPosting} />
    <AppRoute exact path={Utils.Path.login} layout={App.MainLayout} component={App.Login} />
    <AppRoute exact path="/" layout={App.MainLayout} component={App.Home} />
    <AppRoute path="/profile" layout={App.LayoutNoFollowingPage} component={App.Profile} />
</Switch>
