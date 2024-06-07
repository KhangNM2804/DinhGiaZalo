import React from 'react';

import Layout from '@/Shared/LayoutGuest';
import { Link, useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Shared/TextInput';
import Checkbox from '@/Shared/Checkbox';
import LoadingButton from '@/Shared/LoadingButton';
import FlashMessages from '@/Shared/FlashMessages';
import Card from '@/Shared/Card';

const Show = () => {

  const { tintuc, tinmoi } = usePage().props;


  return (
    <div className='max-w-7xl overflow-hidden bg-white rounded shadow grid grid-cols-10 gap-4'>
      <div className="col-span-7 m-2" style={{ lineHeight: '2.0rem' }} dangerouslySetInnerHTML={{ __html: tintuc.content }}></div>

      <div className="col-span-3 m-2">

        <ul className="w-100 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-100 text-3xl px-4 py-2 border-b border-gray-200 dark:border-gray-600 bg-indigo-700 text-white">Tin tức mới nhất</li>
          {tinmoi.map(({ id, title, summary_content, photo }) => {
            return (
              <li key={id} className="w-100 px-4 py-2 border-b border-gray-200 dark:border-gray-600"><Card className="object-cover w-24 h-24 md:rounded-none md:rounded-s-lg" classTitle="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white" classContent="mb-3 text-xs text-gray-700 dark:text-gray-400" photo={photo} title={title} content={summary_content} small={true}></Card></li>

            );
          })}
          {tinmoi.length === 0 && (
            <li className="w-100 px-4 py-2 border-b border-gray-200 dark:border-gray-600">Không tim thấy tin tức nào.</li>
          )}
        </ul>

      </div>

    </div>
  );
};

Show.layout = page => <Layout title="Tin tức" children={page} />;

export default Show;
