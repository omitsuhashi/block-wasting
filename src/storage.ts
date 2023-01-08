// true: d1 is later
// false: d1 is same or before
// const _compareDate = (d1: Date, d2: Date) => {
//   return d1.getFullYear() > d2.getFullYear() ||
//   d1.getMonth() > d2.getMonth() || d1.getDate() > d2.getDate();
// }

type GroupsType = {
  [groupName: string]: GroupSettingType
};

export type GroupSettingType = {
  hostnames: Array<string>;
  rule: RuleType;
};

type RuleType = {
  limit?: number;
  schedule?: {
    start: number;
    end: number;
  }
};

export const fetchSettings = async (): Promise<GroupsType> => chrome.storage.sync.get();

export const getGroupSettingByHostName = async (
  hostname: string,
): Promise<GroupSettingType | undefined> => {
  const settings = await fetchSettings();
  return Object.values(settings).find((setting) => hostname in setting.hostnames);
};

export const getGroupSettingByGroupName = async (
  groupName: string,
): Promise<GroupSettingType | undefined> => {
  const settings = await fetchSettings();
  return settings[groupName];
};

export const addGroup = async (
  groupName: string,
  args?: { hostname?: string, rule?: RuleType },
) => {
  const groupSetting: GroupSettingType = {
    hostnames: args?.hostname ? [args.hostname] : [],
    rule: args?.rule ?? {},
  };
  await chrome.storage.sync.set({ [groupName]: groupSetting });
};

export const addHostnameToRule = async (targetGroupName: string, hostname: string) => {
  const settings = await fetchSettings();
  const setting = settings[targetGroupName];
  setting.hostnames.push(hostname);
};
