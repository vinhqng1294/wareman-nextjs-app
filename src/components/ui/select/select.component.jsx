import { isFunction } from '@/utils/commons/checkVariableType.utils';
import React from 'react';

export const Select = function({
  mutiple,
  options,
  onChange,
  ...props
}) {
  const selectOnChange = function (evt) {
    if (isFunction(onChange)) {
      onChange({ value: evt?.target?.selectedOptions, evt: evt });
    }
  };

  return (
    <React.Fragment>
      <select
        className={'leading-tight w-full bg-white border-1.5 '
          .concat('border-zinc-300 hover:border-sky-300 ')
          .concat('focus:border-sky-300 px-4 py-2 pr-8 rounded ')
          .concat('shadow outline-none focus:outline-none focus:shadow-outline text-zinc-500')
        }
        onChange={selectOnChange}
        multiple={mutiple === true}
      >
        { options.map((item, i) => {
          return <option key={i}>{item}</option>
        })}
      </select>
      { mutiple === false && (
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500'>
          <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/></svg>
        </div>
      )}
    </React.Fragment>
  )
}
