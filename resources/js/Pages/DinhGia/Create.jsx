import React, { useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import Checkbox from '@/Shared/Checkbox';

const Create = () => {
  const { tieuchi } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    price: '',
    cumdinhgia: []
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('dinhgia.store'));
  }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    setData('cumdinhgia', checked
      ? [...data.cumdinhgia, value]
      : data.cumdinhgia.filter((item) => item !== value));
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('dinhgia.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Định giá
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Tạo
      </h1>
      <div className="max-w-7xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/3"
              label="Tên định giá"
              name="name"
              errors={errors.name}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/3"
              label="Giá"
              name="price"
              type="number"
              errors={errors.price}
              value={data.price}
              onChange={e => setData('price', e.target.value)}
            />

            <div className='w-full pb-8 pr-6 lg:w-1/3'>
              <label className="form-label">Cụm định giá</label>
              
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
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Tạo
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Organization" children={page} />;

export default Create;
