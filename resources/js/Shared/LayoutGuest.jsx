import React from 'react';
import Helmet from 'react-helmet';

import MainMenuGuest from './MainMenuGuest';
import Footer from './Footer';

export default function Layout({ title, children }) {
  return (
    <div>
      <Helmet titleTemplate="%s | Ping CRM" title={title} />
      <MainMenuGuest></MainMenuGuest>

      {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
      <div className="w-full px-2  overflow-hidden md:p-2 flex items-center justify-center">
        {children}
      </div>
      <Footer></Footer>
    </div>


  );
}
