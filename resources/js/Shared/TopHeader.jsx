import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Logo from '@/Shared/Logo';
import MainMenu from '@/Shared/MainMenu';

export default () => {
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-indigo-900 md:flex-shrink-0 md:w-56 md:justify-center">
      <Link className="mt-1" href="/">
        <Logo className="text-white fill-current" width="120" height="28" />
      </Link>
      
    </div>
  );
};
