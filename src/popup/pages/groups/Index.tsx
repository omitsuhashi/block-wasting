import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../component/Button';
import {
  addHostnameToRule,
  getGroupSettingByGroupName,
  GroupSettingType,
} from '../../../storage';
import { BASE_PATH } from '../../const';
import { HourSchema } from '../../validation';
import Input, { useInput } from '../../component/Input';

function RuleIndex() {
  const [hostname, setHostname] = useState<string>();
  const [, setSetting] = useState<GroupSettingType>();
  const { group } = useParams();

  const {
    value: limit, onBlur: onBlurLimit, onInput: onInputLimit, errorMessages: limitErrors,
  } = useInput(HourSchema);
  const {
    value: start, onBlur: onBlurStart, onInput: onInputStart, errorMessages: startErrors,
  } = useInput(HourSchema);
  const {
    value: end, onBlur: onBlurEnd, onInput: onInputEnd, errorMessages: endErrors,
  } = useInput(HourSchema);

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
        <Input name="limit" value={limit} onInput={onInputLimit} onBlur={onBlurLimit}>
          制限時間
        </Input>
        <p>{limitErrors}</p>
        <div className="scheduleForm">
          <Input name="start" value={start} onInput={onInputStart} onBlur={onBlurStart} errorMessages={startErrors}>
            開始時間
          </Input>
          <Input name="start" value={end} onInput={onInputEnd} onBlur={onBlurEnd} errorMessages={endErrors}>
            終了時間
          </Input>
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
