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

const hostname = (): string => location.hostname;

// dummy
let count = 0;

const _isBlockTarget = (): boolean => {
  return count !== 0;
}

const intervalHandler = (): void => {
  console.info('doing');
  const blocking = _isBlockTarget();
  console.info(blocking)
  if (blocking) {
    _overlay('dummy');
  } else {
    count += 1;
  }
}

(() => {
  if (hostname() === 'www.amazon.co.jp') {
    setInterval(intervalHandler, 5 * 1000)
    intervalHandler();
  }
})()
