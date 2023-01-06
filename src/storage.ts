// true: d1 is later
// false: d1 is same or before
// const _compareDate = (d1: Date, d2: Date) => {
//   return d1.getFullYear() > d2.getFullYear() || d1.getMonth() > d2.getMonth() || d1.getDate() > d2.getDate();
// }

type SettingType = {
  [hostname: string]: {
    limit: number
  }
}

export const hasSetting = async (hostname: string): Promise<boolean> => {
  const settings = await fetchSettings();
  const hostnames = Object.keys(settings);
  return hostname in hostnames;
}

const fetchSettings = async (): Promise<SettingType> => {
  return await chrome.storage.sync.get();
}
