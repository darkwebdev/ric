import React from 'react';
import { Route, Switch } from 'wouter';
import { Menu } from './Menu.jsx';
import { Header } from './Header.jsx';
import { Story } from './Story.jsx';
import { Dust } from './Dust.jsx';

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
