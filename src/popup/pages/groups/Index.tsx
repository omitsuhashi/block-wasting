import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonComponent from '../../../component/Button';
import {
  addHostnameToRule,
  getGroupSettingByGroupName,
  GroupSettingType,
} from '../../../storage';
import { BASE_PATH } from '../../const';

function RuleIndex() {
  const [hostname, setHostname] = useState<string>();
  const [, setSetting] = useState<GroupSettingType>();
  const { group } = useParams();

  const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };

  const addCurrentHost = async () => {
    if (hostname) {
      if (group) {
        await addHostnameToRule(group, hostname);
      } else {
        throw new Error('must dedicate which group');
      }
    } else {
      throw new Error('this event must not raised');
    }
  };

  const init = async () => {
    const tab = await getCurrentTab();
    if (tab?.url) {
      const url = new URL(tab.url);
      setHostname(url.hostname);
      if (group) {
        const groupSetting = await getGroupSettingByGroupName(group);
        setSetting(groupSetting);
      }
      // const currentHostSetting = await getGroupSettingByHostName(url.hostname);
    }
  };

  init().then();

  return (
    <>
      <ButtonComponent onClick={addCurrentHost}>URLを追加</ButtonComponent>
      <ButtonComponent>
        <Link to={`${BASE_PATH}`}>戻る</Link>
      </ButtonComponent>
    </>
  );
}

export default RuleIndex;
