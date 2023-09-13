import React, { useEffect, useState, useCallback } from 'react';

import SimpleMde from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

function MarkdownEditor(props) {
  const [value, setValue] = useState(props.description);

  useEffect(() => {
      setValue(props.description);
  }, [props.description]);

  const onChange = useCallback((value) => {
    setValue(value);
    props.onSave(value);
  }, []);

  return <SimpleMde value={value} onChange={onChange}  />;
}

export default MarkdownEditor;