import React from 'react';
import Helmet from 'react-helmet';
import FlashMessages from '@/Shared/FlashMessages';
import MainMenuGuest from './MainMenuGuest';

export default function Layout({ title, children }) {
  return (
    <div>
      <Helmet titleTemplate="%s | Ping CRM" title={title} />
      <MainMenuGuest></MainMenuGuest>
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <div className="flex flex-grow overflow-hidden">
            {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
            <div className="w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-12">
              <FlashMessages />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
