import React, { useState, useRef } from 'react';
import { filesize } from '@/utils';

const Button = ({ text, onClick }) => (
  <button
    type="button"
    className="px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700"
    onClick={onClick}
  >
    {text}
  </button>
);

export default ({ className, name,value, label, accept, errors = [], onChange }) => {
  const fileInput = useRef();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(value);

  function browse() {
    fileInput.current.click();
  }

  function remove() {
    setFile(null);
    setFileUrl(null);
    onChange(null);
    fileInput.current.value = null;
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFile(file);
    setFileUrl(URL.createObjectURL(file));
    onChange(file);
  }
  

  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <div className={`form-input p-0 ${errors.length && 'error'}`}>
        <input
          id={name}
          ref={fileInput}
          accept={accept}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {!file && (
          <div className="p-2">
            <Button text="Browse" onClick={browse} />
          </div>
        )}
        {value && (
          <div className="flex items-center justify-between p-2">
            <div className="flex-1 pr-1">
              <img src={fileUrl} alt="Selected" className="w-24 h-24 object-cover" />
              <span className="ml-1 text-xs text-gray-600">
                {file&&filesize(file.size)}
              </span>
            </div>
            {file && <Button text="Remove" onClick={remove} />}
          </div>
        )}
      </div>
      {errors.length > 0 && <div className="form-error">{errors}</div>}
    </div>
  );
};
