chrome.tabs.onActivated.addListener((activeInfo) => {
  injectVideo(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    injectVideo(tabId);
  }
});

function injectVideo(tabId: number): void {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js']
  });
}