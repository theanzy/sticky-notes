import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const editorModules = {
  toolbar: [
    [{ font: [] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const editorformats = [
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'indent',
  'link',
];
/*
 * Simple editor component that takes placeholder text as a prop
 */
const Editor = ({ placeholder = '', htmlContent = '', onContentChange }) => {
  const [content, setContent] = useState(htmlContent);
  return (
    <div className='editor-container cyan'>
      <ReactQuill
        theme='snow'
        onChange={(html) => {
          setContent(html);
          onContentChange(html);
        }}
        value={content}
        modules={editorModules}
        formats={editorformats}
        bounds={'.app'}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Editor;
