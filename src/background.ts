import { Storage } from './models';

chrome.runtime.onInstalled.addListener(async () => {
  const storage: Storage = { 'www.amazon.co.jp': { limit: 5 }, 'www.youtube.com': { limit: 5 } };
  await chrome.storage.sync.set(storage);
});
