import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';

export default ({ photo, link, title, content, className, classTitle, classContent, small }) => {
  const linkRef = useRef(null); // Tạo một tham chiếu

  const displayContent = small ? (content.length > 50 ? content.substring(0, 50) + "..." : content) : content;

  return (
    <Link ref={linkRef} href={link} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img className={className} src={photo} alt={photo} />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className={classTitle}>{title}</h5>
        <p className={classContent}>{displayContent}</p>
      </div>
    </Link>
  );
};
