import React from 'react';
import Helmet from 'react-helmet';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import Icon from '@/Shared/Icon';

const Edit = () => {
  const { tieuChi } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    name: tieuChi.name || '',
    slug: tieuChi.slug || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('tieuchi.update', tieuChi.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this tieuchi?')) {
      router.delete(route('tieuchi.destroy', tieuChi.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this tieuchi?')) {
      router.put(route('tieuchi.restore', tieuChi.id));
    }
  }

  return (
    <div>
      <Helmet title={data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('tieuchi.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Tiêu Chí
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>
      {tieuChi.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This tieuchi has been deleted.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Name"
              name="name"
              errors={errors.name}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Slug"
              name="slug"
              type="slug"
              errors={errors.slug}
              value={data.slug}
              onChange={e => setData('email', e.target.value)}
              disabled
            />

          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {tieuChi && (
              <DeleteButton onDelete={destroy}>
                Delete tiêu chí
              </DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update tiêu chí
            </LoadingButton>
          </div>
        </form>
      </div>

    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
