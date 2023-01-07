// true: d1 is later
// false: d1 is same or before
// const _compareDate = (d1: Date, d2: Date) => {
//   return d1.getFullYear() > d2.getFullYear() ||
//   d1.getMonth() > d2.getMonth() || d1.getDate() > d2.getDate();
// }

type SettingType = {
  [hostname: string]: {
    limit: number
  }
};

const fetchSettings = async (): Promise<SettingType> => chrome.storage.sync.get();

export const hasSetting = async (hostname: string): Promise<boolean> => {
  const settings = await fetchSettings();
  return hostname in settings;
};

export const addHost = async (hostname: string): Promise<void> => {
  await chrome.storage.sync.set({ [hostname]: { limit: 5 } });
};
