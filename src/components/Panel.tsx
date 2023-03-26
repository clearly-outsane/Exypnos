/*global chrome*/
import React, { ReactElement, useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Button from './Button';

export const SIDEBAR_WIDTH = 320;

export default function Panel({ initialEnabled, tabs }: { initialEnabled: boolean; tabs: any[] }): ReactElement {
  const [enabled, setEnabled] = useState(initialEnabled);

  useEffect(() => {
    console.log('tabList', tabs);
  }, [tabs]);

  return (
    <div
      style={{
        width: SIDEBAR_WIDTH,
        boxShadow: '0px 0px 5px #0000009e',
      }}
      className="flex flex-col ease-in-out duration-300 overflow-hidden [background:linear-gradient(to_bottom,transparent,rgb(0,0,0))_rgb(2,13,46)] relative"
    >
      <ScrollArea.Root className="w-full h-full rounded overflow-hidden">
        <ScrollArea.Viewport asChild className="[display:block!important] w-full items-start h-full relative">
          <div className="w-full h-full flex flex-col space-y-1 p-4">
            {tabs &&
              tabs.map((tab, index) => {
                return (
                  <>
                    <Button
                      onClick={async () =>
                        await window['chrome'].runtime.sendMessage({
                          api: 'tabs',
                          type: 'update',
                          active: true,
                          bringWindowToFocus: true,
                          windowId: tab.windowId,
                          id: tab.id,
                        })
                      }
                      className="bg-transparent w-full hover:bg-[rgba(255,255,255,0.1)] space-x-3"
                    >
                      {tab.favIconUrl && (
                        <img src={tab.favIconUrl} className="aspect-square h-full max-h-[22px]" alt={tab.title} />
                      )}
                      <div className=" text-ellipsis whitespace-nowrap overflow-hidden w-full text-start text-gray-200">
                        {tab.title}
                      </div>
                    </Button>
                  </>
                );
              })}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-blackA8" />
      </ScrollArea.Root>
      <div className="p-4 flex items-center">{/* Login/ User */}</div>
    </div>
  );
}
