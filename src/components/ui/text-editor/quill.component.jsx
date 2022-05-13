import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

const TextEditorQuill = function ({
  onChange: userDefined_OnChange,
  defaultText: userDefined_DefaultText,
  placeholder: userDefined_Placeholder,
  ...props
}) {
  const modules = {
    toolbar: [
      // [{ font: [] }],
      [{ size: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };
  const [inputVal, setInputVal] = useState(``);

  const inputOnChange = function (html) {
    console.info('html', html);

    setInputVal(html);
    if (isFunction(userDefined_OnChange)) {
      userDefined_OnChange({ value: html });
    }
  };

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_DefaultText)) {
        setInputVal(userDefined_DefaultText);
      } else {
        setInputVal('');
      }
    },
    [userDefined_DefaultText]
  );

  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <ReactQuill
          theme={'snow'}
          // className='h-40'
          modules={modules}
          placeholder={
            stringIsNotEmpty(userDefined_Placeholder)
              ? userDefined_Placeholder
              : ''
          }
          value={inputVal}
          onChange={inputOnChange}
        />
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: inputVal }}></div> */}
    </React.Fragment>
  );
};

export default TextEditorQuill;
