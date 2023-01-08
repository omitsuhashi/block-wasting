import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../component/Button';
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
  const [limit] = useState<string>();
  const [start] = useState<string>();
  const [end] = useState<string>();

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
      <div className="inputForm">
        <label htmlFor="limit">
          制限時間
          <input name="limit" value={limit} />
        </label>
        <div className="scheduleForm">
          <label htmlFor="start">
            開始時間
            <input name="start" value={start} />
          </label>
          <label htmlFor="name">
            終了時間
            <input name="end" value={end} />
          </label>
        </div>
      </div>
      <Button onClick={addCurrentHost}>URLを追加</Button>
      <Link to={`${BASE_PATH}`}>
        <Button>
          戻る
        </Button>
      </Link>
    </>
  );
}

export default RuleIndex;
