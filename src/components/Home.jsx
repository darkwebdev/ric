import { useState } from 'react';
import { Assistant, AssistantProvider } from './Assistant';
import { AssistantUI } from './AssistantUI';
import { Header } from './Header';
import { Menu } from './Menu';
import { Loading } from './Loading';
import { Dust } from './Dust';

export const Modes = {
  Default: 'default',
  Menu: 'menu',
  Edit: 'edit',
  Select: 'select',
};

export const Home = () => {
  const [mode, setMode] = useState(Modes.Default);
  const [isLoading, setLoading] = useState(true);

  return <AssistantProvider>
    <Assistant />
    <Header onClick={() => setMode(Modes.Default)} />
    <Menu
      opened={mode === Modes.Menu}
      onOpen={() => setMode(Modes.Menu)}
      onLoad={() => setLoading(false)}
    />
    <Loading enabled={isLoading} />
    {mode !== Modes.Menu &&
      <AssistantUI
        mode={mode}
        onSave={() => setMode(Modes.Default)}
        onCancel={() => setMode(Modes.Default)}
      />
    }
    <Dust />
  </AssistantProvider>
}
