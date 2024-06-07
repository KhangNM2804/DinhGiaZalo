import React, { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import FileInput from '@/Shared/FileInput';
import TextArea from '@/Shared/TextArea';
import EditorBase from '@/Shared/EditorBase';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    title: '',
    photo:'',
    summary_content:'',
    content:'',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('tintuc.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('tintuc.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Tin tức
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Tạo
      </h1>
      <div className="max-w-7xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Tiêu đề"
              name="title"
              errors={errors.title}
              value={data.title}
              onChange={e => setData('title', e.target.value)}
            />
            <FileInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Ảnh đại diện"
              name="photo"
              accept="image/*"
              errors={errors.photo}
              value={data.photo}
              onChange={photo => setData('photo', photo)}
            />
            <TextArea
              className="w-full pb-8 pr-6 lg:w-1/7"
              label="Tóm tắt nội dung"
              name="summary_content"
              errors={errors.summary_content}
              value={data.summary_content}
              onChange={e => setData('summary_content', e.target.value)}
            />
            <EditorBase></EditorBase>
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

Create.layout = page => <Layout title="Tạo tin tức" children={page} />;

export default Create;
