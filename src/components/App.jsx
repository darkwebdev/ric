import { useState } from 'react';
import { Route, Switch } from 'wouter';

import { Menu } from './Menu';
import { Header } from './Header';
import { Story } from './Story.jsx';
import { Dust } from './Dust';
import { Loading } from './Loading';
import { Assistant, AssistantUI, AssistantProvider } from './Assistant';

export const App = () => {
    const [ menuOpened, setMenuOpened ] = useState(false);
    const [ isLoading, setLoading ] = useState(true);

    return <Switch>
        <Route path="*/story/*" component={Story} />

        <Route>
            <AssistantProvider>
                <Assistant />
                <Header onClick={() => setMenuOpened(false)} />
                <Menu
                    opened={menuOpened}
                    onOpen={() => setMenuOpened(true)}
                    onLoad={() => setLoading(false)}
                />
                <Loading enabled={isLoading} />
                {!menuOpened && <AssistantUI />}
                <Dust />
            </AssistantProvider>
        </Route>
    </Switch>;
}
