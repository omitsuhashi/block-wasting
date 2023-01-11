import React, {
  useEffect, useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../component/Button';
import {
  addHostnameToRule,
  getGroupSettingByGroupName,
  GroupSettingType,
} from '../../../storage';
import { BASE_PATH } from '../../const';
import { HourSchema } from '../../validation';
import Input from '../../component/Input';

const FormSchema = z.object({
  hostnames: z.array(z.string()),
  limit: HourSchema,
  start: HourSchema,
  end: HourSchema,
  // add event redirect to new group param
  group: z.string(),
});
type FormSchemaType = z.infer<typeof FormSchema>;

function RuleIndex() {
  const [hostname, setHostname] = useState<string>();
  const [setting, setSetting] = useState<GroupSettingType>();
  const { group } = useParams();

  const { register, formState: { errors, isValid }, reset } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

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

  useEffect(() => {
    init().then();
  }, []);

  useEffect(() => {
    if (setting) {
      reset({
        limit: setting.rule.limit,
        start: setting.rule.schedule?.start,
        end: setting.rule.schedule?.end,
        hostnames: setting.hostnames,
        group,
      });
    }
  }, [setting]);

  return (
    <>
      <div className="inputForm">
        <Input name="limit" reg={register('limit')} errorMessage={errors?.limit?.message}>制限時間</Input>
        <div className="scheduleForm">
          <Input name="start" reg={register('start')} errorMessage={errors?.start?.message}>開始時間</Input>
          <Input name="end" reg={register('end')} errorMessage={errors?.end?.message}>終了時間</Input>
        </div>
        <Button disable={!isValid}>保存</Button>
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
