import React from 'react';

import Layout from '@/Shared/LayoutGuest';
import { Link, useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Shared/TextInput';
import Checkbox from '@/Shared/Checkbox';
import LoadingButton from '@/Shared/LoadingButton';
import FlashMessages from '@/Shared/FlashMessages';




const Index = () => {
  const { tieuchi } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    cumdinhgia: []
  });
  function handleSubmit(e) {
    e.preventDefault();
    post(route('dinhgia.dinhgia'));
  }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    setData('cumdinhgia', checked
      ? [...data.cumdinhgia, value]
      : data.cumdinhgia.filter((item) => item !== value));
  };
  return (
    <div className='max-w-3xl overflow-hidden bg-white rounded shadow'>
      <div className="flex items-center justify-center px-8 py-4 bg-indigo-700 border-t border-gray-200">
        <h1 className='text-xl font-medium text-white'>Định giá zalo: Vui lòng tích chọn các tiêu chí mà zalo bạn đáp ứng được. Tiêu chí không đạt thì bỏ trống</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 ">
            <div className='w-full pb-8 pr-6 lg:w-1/7'>
              <ul className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {tieuchi.map(({ id, name }) => {
                  return (
                    <li key={id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <Checkbox
                        className="flex items-center ps-3"
                        label={id + '.' + name}
                        id={id}
                        name="cumdinhgia"
                        type="checkbox"
                        errors={errors.cumdinhgia}
                        value={id}
                        onChange={handleCheckboxChange}
                      />
                    </li>

                  )
                })}


              </ul>
              {errors.cumdinhgia && <div className="form-error">{errors.cumdinhgia}</div>}
            </div>
           
          </div>
          <FlashMessages/>
          <div className="flex items-center justify-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Định giá
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Index.layout = page => <Layout title="Định giá zalo" children={page} />;

export default Index;
