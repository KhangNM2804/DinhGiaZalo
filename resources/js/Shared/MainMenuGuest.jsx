import React from 'react';

import MainMenuItemGuest from './MainMenuItemGuest';
import Logo from './Logo';
import { Link } from '@inertiajs/react';

export default () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link className="mt-1" href="/">
          <Logo className="text-black fill-current" width="120" height="28" />
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <MainMenuItemGuest text="Định giá" link="dinhgia" />
            </li>
            <li>
              <MainMenuItemGuest text="Việc làm zalo" link="vieclamzalo" />
            </li>
            <li>
              <MainMenuItemGuest text="Liên hệ" link="lienhe" />
            </li>
            <li>
              <MainMenuItemGuest text="Đăng nhập" link="login" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
