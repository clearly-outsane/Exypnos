/*global chrome*/
import React, { ReactElement, useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as ContextMenu from '@radix-ui/react-context-menu';
import Button from './Button';
import { ChevronRight, EllipsisVertical, FolderPlus, Search } from '../icons';

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
      className="flex flex-col items-center h-full ease-in-out duration-300 [background:linear-gradient(to_bottom,transparent,rgb(0,0,0))_rgb(2,13,46)] relative"
    >
      <div className="h-12 w-full rounded-md mt-4 px-4 mb-6 inline-flex items-center [text-rendering:geometricprecision]">
        <label className="h-full w-full relative inline-flex items-center align-middle flex-1 bg-[rgba(255,255,255,0.1)] rounded-md px-4">
          <span>
            <Search className="w-4 h-4" />
          </span>
          <input className="px-3 py-3 text-sm outline-none border-none w-full h-full appearance-none min-w-0 bg-transparent" />
        </label>
      </div>
      <ScrollArea.Root className="w-full h-full overflow-hidden">
        <ScrollArea.Viewport asChild className="[display:block!important] w-full items-center h-full relative">
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center w-full pb-4 px-4 justify-between">
              <div className="text-sm text-gray-400 font-medium ">Pinned</div>
              <div className="cursor-pointer" onClick={() => {}}>
                <FolderPlus className="text-gray-600 hover:text-gray-200" />
              </div>
            </div>

            <hr className="h-px my-2 bg-[rgba(255,255,255,0.1)] border-0 px-8 w-[calc(100%-48px)]" />

            <div className="flex items-center w-full py-4 px-4 justify-between">
              <div className="text-sm text-gray-400 font-medium ">Explore</div>
              <div className="text-gray-600 text-sm hover:text-gray-400 cursor-pointer">Clear</div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col space-y-1 px-4">
            {tabs &&
              tabs.map((tab, index) => {
                return (
                  <>
                    <ContextMenu.Root modal={false}>
                      <ContextMenu.Trigger>
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
                          className="bg-transparent w-full hover:bg-[rgba(255,255,255,0.1)] space-x-3 outline-none"
                        >
                          {tab.favIconUrl && (
                            <img src={tab.favIconUrl} className="aspect-square h-full max-h-[22px]" alt={tab.title} />
                          )}
                          <div className=" text-ellipsis whitespace-nowrap overflow-hidden w-full text-start text-gray-200">
                            {tab.title}
                          </div>
                        </Button>
                      </ContextMenu.Trigger>

                      <ContextMenu.Content
                        className="bg-slate-800 rounded-md min-w-[42px] overflow-hidden p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                        sideOffset={5}
                        align="end"
                      >
                        <ContextMenu.Sub>
                          <ContextMenu.SubTrigger className="group text-sm leading-none text-gray-200 rounded-md capitalize flex items-center h-8 px-2 relative pl-6 select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 hover:bg-[rgba(255,255,255,0.1)] data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1">
                            Add to
                            <div className="ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                              <ChevronRight />
                            </div>
                          </ContextMenu.SubTrigger>

                          <ContextMenu.SubContent
                            className=" bg-slate-800 min-w-[42px] rounded-md overflow-hidden p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                            sideOffset={2}
                            alignOffset={-5}
                          >
                            <ContextMenu.Item className="group text-sm leading-none text-gray-200 rounded-md flex items-center h-8 px-2 relative pl-6 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 hover:bg-[rgba(255,255,255,0.1)]">
                              New Folder
                              <div className="ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                                +
                              </div>
                            </ContextMenu.Item>
                          </ContextMenu.SubContent>
                        </ContextMenu.Sub>
                      </ContextMenu.Content>
                    </ContextMenu.Root>
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
      <div className="p-4 flex items-center justify-between w-full">
        <Button size="sm" className="px-0">
          Log in
        </Button>
        <Button className="p-0">
          <EllipsisVertical />
        </Button>
      </div>
    </div>
  );
}
