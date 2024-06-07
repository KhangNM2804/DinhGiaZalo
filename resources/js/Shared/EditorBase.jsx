import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorBase = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (content) => {
    setContent(content);
  };
  return (
    <div>
      <Editor
        apiKey="w6cn2yf73ydhvp3indns4fkipggyu39mzkil416cb4i55eq5" // Bạn có thể cần một API key từ TinyMCE
        initialValue="<p>Start writing here...</p>"
        init={{
          selector: 'textarea',
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        
        onEditorChange={handleEditorChange}
      />
      <div>
        <h3>Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default EditorBase;
