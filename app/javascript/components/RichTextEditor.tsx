import * as React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const getInputEvent = (editor, name) => {
  const data = editor.getData();
  return { target: { name, value: data } };
};

const RichTextEditor = ({ name, onChange, onBlur }) => (
  <CKEditor
    editor={ClassicEditor}
    onChange={(event, editor) => { onChange(getInputEvent(editor, name)); }}
    onBlur={(event, editor) => { onBlur(getInputEvent(editor, name)); }}
  />
);
export default RichTextEditor;
