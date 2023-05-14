import 'react-app-polyfill/ie11';

import React from 'react';
import { createRoot } from 'react-dom/client';
import Panel, { SIDEBAR_WIDTH } from './components/Panel';

async function loadChromeStorage() {
  let initialEnabled = true;
  try {
    // Loading chrome local setting, can be replace with sync
    // for more information, see: https://developer.chrome.com/docs/extensions/reference/storage/
    const result = await window['chrome'].storage.local.get(['enabled']);
    initialEnabled = !!result.enabled;
  } catch (e) {
    // for dev
    initialEnabled = true;
  }

  return initialEnabled;
}

async function getInitialTabs() {
  let tabs = [];
  try {
    tabs = await window['chrome'].runtime.sendMessage({ api: 'tabs', type: 'get' });
    console.log('tabs', tabs);
  } catch (e) {
    //since it won't work in dev
    console.log("Can't get tabs");
  }
  return tabs;
}

async function init() {
  const initialEnabled = await loadChromeStorage();
  const tabs = await getInitialTabs();
  let isMouseOverSidebar = false;
  // Create html tag wrapper
  const htmlWrapper = document.querySelectorAll('html')[0];
  // htmlWrapper.id = 'original-html-wrapper';
  // htmlWrapper.style['margin-left'] = `${initialEnabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH}px`;
  htmlWrapper.classList.add('ease-in-out');
  htmlWrapper.classList.add('duration-300');

  // Create div wrapper
  const body = document.body;
  // const bodyWrapper = document.createElement('div');
  // bodyWrapper.id = 'original-body-wrapper';
  // bodyWrapper.className = 'h-full w-full overflow-auto relative ease-in-out duration-300';

  // // Move the body's children into this wrapper
  // while (body.firstChild) {
  //   bodyWrapper.appendChild(body.firstChild);
  // }

  // bodyWrapper.style.overflow = 'auto';
  // bodyWrapper.style.height = '100vh';

  // // Append the wrapper to the body
  // body.style.overflow = 'hidden';
  // body.style.margin = '0';
  // body.appendChild(bodyWrapper);

  // create react app
  const app = document.createElement('div');
  app.id = 'exypnos-app';

  app.style.setProperty('left', `${-SIDEBAR_WIDTH}px`, 'important'); //hide it initially
  app.style.setProperty('position', 'fixed');
  app.style.setProperty('top', '0px');
  app.style.setProperty('bottom', '0px');
  app.style.setProperty('height', '100vh');
  app.style.setProperty('transition-timing-function', 'ease-in-out');
  app.style.setProperty('transition-duration', '300ms');
  app.style.setProperty('display', 'flex');
  app.style.setProperty('flex', '1');
  app.style.setProperty('overflow', 'hidden');
  app.style.setProperty('z-index', '2147483647');
  app.style.setProperty('font-size', '16px');
  app.style.setProperty(
    'font-family',
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  );
  app.style.setProperty('padding', '0px');
  app.style.setProperty('margin', '0px');

  // app.style['max-width'] = `${initialEnabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH}px`;
  // app.style['width'] = `${initialEnabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH}px`;

  //We do it like this because it should be activated when mouse is over the activation area but if the sidebar is already open it should stay open until mouse is out of the sidebar
  app.addEventListener('mouseenter', () => {
    isMouseOverSidebar = true;
  });
  app.addEventListener('mouseleave', () => {
    isMouseOverSidebar = false;
  });

  const activationAreaWidth = 24;
  window.addEventListener('mousemove', (event) => {
    if (event.pageX < activationAreaWidth) {
      app.style.setProperty('left', '0px', 'important');
    } else if (!isMouseOverSidebar) {
      app.style.setProperty('left', `${-SIDEBAR_WIDTH}px`, 'important');
    }
  });

  // body.appendChild(app);
  htmlWrapper.appendChild(app);
  const root = createRoot(app!);

  root.render(<Panel initialEnabled={initialEnabled} tabs={tabs} />);
}

init();
