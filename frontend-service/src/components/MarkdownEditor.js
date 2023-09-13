import React, { useEffect, useState, useCallback } from 'react';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function MarkdownEditor(props) {
  const [value, setValue] = useState("Initial value");

  useEffect(() => {
    const getDescription = () => {
      setValue(props.description);
    };
    getDescription();
  }, []);

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  return <SimpleMde value={value} onChange={onChange}  />;
}

export default MarkdownEditor;