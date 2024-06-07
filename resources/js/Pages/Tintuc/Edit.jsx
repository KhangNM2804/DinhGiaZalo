import React from 'react';
import Helmet from 'react-helmet';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import FileInput from '@/Shared/FileInput';
import TextArea from '@/Shared/TextArea';
import { Editor } from '@tinymce/tinymce-react';
import DeleteButton from '@/Shared/DeleteButton';

const Edit = () => {
  const { tintuc } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    title: tintuc.title || '',
    summary_content: tintuc.summary_content || '',
    photo: '',
    photo_path: tintuc.photo,
    content: tintuc.content || '',
    _method: 'PUT'
  });
  function handleEditorChange(content) {
    setData('content', content);
  }
  function handleSubmit(e) {
    e.preventDefault();
    post(route('tintuc.update', tintuc.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this tintuc?')) {
      router.delete(route('tintuc.destroy', tintuc.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this tintuc?')) {
      router.put(route('tintuc.restore', tintuc.id));
    }
  }

  return (
    <div>
      <Helmet title={data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('tintuc.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Tin tức
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.title}
      </h1>
      {tintuc.deleted_at && (
        <TrashedMessage onRestore={restore}>
          Tin tức này đã bị xoá
        </TrashedMessage>
      )}
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
              value={data.photo_path}
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
            <div className="w-full pb-8 pr-6">
              <Editor
                apiKey='w6cn2yf73ydhvp3indns4fkipggyu39mzkil416cb4i55eq5'
                initialValue={data.content}
                init={{
                  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                  tinycomments_mode: 'embedded',
                  tinycomments_author: 'Author name',
                  mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                  ],
                  ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
                onEditorChange={handleEditorChange}
              />
              {errors.content && <div className="text-red-600 mt-2">{errors.content}</div>}
            </div>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {tintuc && (
              <DeleteButton onDelete={destroy}>
                Xoá Tin tức
              </DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
             Cập nhật Tin tức
            </LoadingButton>
          </div>
        </form>
      </div>

    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
