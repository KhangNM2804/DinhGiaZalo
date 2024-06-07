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
import Checkbox from '@/Shared/Checkbox';

const Edit = () => {
  const { tieuChi, dinhGia } = usePage().props;

  const { data, setData, errors, put, processing } = useForm({
    name: dinhGia.name || '',
    price: dinhGia.price || '',
    cumdinhgia: dinhGia.cumdinhgia || []
  });



  function handleSubmit(e) {
    e.preventDefault();
    put(route('dinhgia.update', dinhGia.id));
  }

  function destroy() {
    if (confirm('Có chắc chắn xoá định giá này?')) {
      router.delete(route('dinhgia.destroy', dinhGia.id));
    }
  }

  function restore() {
    if (confirm('Có chắc chắn xoá định giá này?')) {
      router.put(route('dinhgia.restore', dinhGia.id));
    }
  }
  const handleCheckboxChange = (event) => {
    const value = Number(event.target.value);
    const checked = event.target.checked;
    setData('cumdinhgia', checked
      ? [...data.cumdinhgia, value]
      : data.cumdinhgia.filter((item) => item !== value));
  };
  console.log(data.cumdinhgia);
  return (
    <div>
      <Helmet title={data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('dinhgia.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Định giá
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>
      {dinhGia.deleted_at && (
        <TrashedMessage onRestore={restore}>
          Định giá này đã bị xoá
        </TrashedMessage>
      )}
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
                {tieuChi.map(({ id, name }) => {
                  return (
                    <li key={id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <Checkbox
                        className="flex items-center ps-3"
                        labelClass="mt-px font-light text-gray-700 cursor-pointer"
                        label={id + '.' + name}
                        id={id}
                        name="cumdinhgia"
                        type="checkbox"
                        errors={errors.cumdinhgia}
                        value={id}
                        onChange={handleCheckboxChange}
                        checked={data.cumdinhgia.includes(id)}
                      />
                    </li>

                  )
                })}


              </ul>
              {errors.cumdinhgia && <div className="form-error">{errors.cumdinhgia}</div>}
            </div>

          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {dinhGia && (
              <DeleteButton onDelete={destroy}>
                Xoá Định giá
              </DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Cập nhật Định giá
            </LoadingButton>
          </div>
        </form>
      </div>

    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
