const overlay = (_title: string) => {
  const overlayDiv = document.createElement('div')
  const titleElement = document.createElement('p');
  overlayDiv.className = 'block-wasting-overlay';
  overlayDiv.style.zIndex = '2147483647';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.backgroundColor = 'white';
  overlayDiv.style.position = 'fixed';
  overlayDiv.style.visibility = 'visible';
  overlayDiv.style.top = '0';
  titleElement.textContent = _title;
  overlayDiv.appendChild(titleElement);
  document.body.appendChild(overlayDiv);
}

chrome.action.onClicked.addListener(async (tab) => {
  console.info(tab);
  const isChromePage = tab.url?.includes('chrome://');
  if (tab.id && !isChromePage) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: overlay,
      args: ['ブロック']
    });
  }
});
