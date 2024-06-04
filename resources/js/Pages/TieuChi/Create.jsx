import React, { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    slug:''
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('tieuchi.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('tieuchi.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Tiêu chí
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Tạo
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Tên tiêu chí"
              name="name"
              errors={errors.name}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />
            
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
