import {Rule} from "./models";

let intervalId: number | undefined = undefined;

const _overlay = (_title: string) => {
  const overlayDiv = document.createElement('div')
  const titleElement = document.createElement('p');
  overlayDiv.className = 'block-wasting-overlay';
  overlayDiv.style.zIndex = '2147483647';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.backgroundColor = 'white';
  overlayDiv.style.position = 'fixed';
  overlayDiv.style.visibility = 'visible';
  overlayDiv.style.overflow = 'scroll';
  overlayDiv.style.top = '0';
  titleElement.textContent = _title;
  overlayDiv.appendChild(titleElement);
  document.body.appendChild(overlayDiv);
}

// dummy
let count = 0;

const _isBlockTarget = (rule: Rule): boolean => {
  return count >= rule.limit;
}

const intervalHandler = (rule: Rule): void => {
  const isTarget = _isBlockTarget(rule);
  if (isTarget) {
    _overlay('dummy');
    clearInterval(intervalId);
  } else {
    count += 1;
  }
}

const onLoad = async () => {
  const rule = await chrome.storage.sync.get(location.hostname);
  if (Object.keys(rule).length > 0) {
    intervalId = setInterval(intervalHandler, 5 * 1000, rule[location.hostname]);
  }
};

onLoad().then();
