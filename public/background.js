chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed');
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension', request);
  const { api, type, ...payload } = request;
  if (api === 'tabs' && type === 'get') {
    const tabs = chrome.tabs.query({}, (tabs) => {
      sendResponse(tabs);
    });
  }
  if (api === 'tabs' && type === 'update') {
    const { id, bringWindowToFocus, windowId, ...rest } = payload;
    chrome.tabs.update(id, rest);
    bringWindowToFocus && chrome.windows.update(windowId, { focused: true });
  }
  if (api === 'firebase' && type === 'login') {
    const { auth, GoogleAuthProvider, signInWithCredential } = payload;
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      var credential = GoogleAuthProvider.credential(null, token);
      signInWithCredential(auth, credential);
      console.log(token);
    });
  }
  return true;
});
