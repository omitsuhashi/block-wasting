import React, { PropsWithChildren, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Tab = chrome.tabs.Tab;
import { addHost, hasSetting } from './storage';

// type InputProp = {
//   value: string,
//   onChange: (value: string) => void
// }
//
// const InputComponent = (props: PropsWithoutRef<InputProp>) => {
//   return (<input onChange={event => props.onChange(event.target.value)} value={props.value}/>)
// }

type ButtonProp = {
  disable?: boolean,
  onClick: () => void
};

function ButtonComponent({ onClick, disable = false, children }: PropsWithChildren<ButtonProp>) {
  return (
    <button type="submit" disabled={disable} onClick={onClick}>{children}</button>
  );
}

function Index(): JSX.Element {
  const getCurrentTab = async (): Promise<Tab> => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };

  const [hostname, setHostname] = useState<string>();
  const [clickable, setClickable] = useState<boolean>();

  useEffect(() => {
    const init = async () => {
      const tab = await getCurrentTab();
      if (tab?.url) {
        const url = new URL(tab.url);
        setHostname(url.hostname);
        const existSetting = await hasSetting(url.hostname);
        setClickable(existSetting);
      }
    };
    init().then();
  });

  const addCurrentUrl = async () => {
    if (hostname) await addHost(hostname);
  };

  return (
    <ButtonComponent onClick={addCurrentUrl} disable={clickable}>
      {hostname}
      を追加
    </ButtonComponent>
  );
}

window.onload = () => {
  const container = document.getElementById('root');
  if (container === null) {
    throw new DOMException('id "root" is not found');
  }
  const root = createRoot(container);
  root.render(<Index />);
};
