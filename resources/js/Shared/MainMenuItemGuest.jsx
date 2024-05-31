import React from 'react';
import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import Icon from '@/Shared/Icon';

export default ({ link, text }) => {
  const isActive = route().current(link + '*');

  return (
    <div>
      <Link href={route(link)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
        <div>{text}</div>
      </Link>
    </div>
  );
};
