import React from 'react';
import { Route, Switch } from 'wouter';
import { Menu } from './Menu';
import { Header } from './Header';
import { Story } from './Story.jsx';
import { Dust } from './Dust';

export const App = () => {
    return <Switch>
        <Route path="/story/*" component={Story} />

        <Route>
            <Header />
            <Menu />
            <Dust />
        </Route>
    </Switch>;
}
