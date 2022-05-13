import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import { mergeArrUnique } from '@/utils/commons/array.utils';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const ONE_MEGABYTE_IN_BYTES = 1048576;
const DEFAULT_MAX_FILE_SIZE_IN_MEGA_BYTES = 15;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES =
  DEFAULT_MAX_FILE_SIZE_IN_MEGA_BYTES * ONE_MEGABYTE_IN_BYTES;
const PNG_TYPE = 'image/png';
const JPG_TYPE = 'image/jpeg';

const UploadButtonComponent = function ({ ...props }) {
  const {
    componentName,
    uploadButtonWrapperFormat,
    uploadIconFormat,
    uploadIconSrc,
    fileInputOnChange,
    errorMsg,
  } = props;

  return (
    <div className='flex space-x-3'>
      <div className='block'>
        <label
          htmlFor={componentName}
          className={'relative block p-0 cursor-pointer overflow-hidden'.concat(
            uploadButtonWrapperFormat && uploadButtonWrapperFormat?.length > 0
              ? ` ${uploadButtonWrapperFormat}`
              : ` w-20 h-20 bg-white border border-gray-300 rounded-md hover:shadow`
          )}
        >
          <div className={`flex justify-center items-center w-full h-full`}>
            <ReactSVG
              className={``.concat(
                uploadIconFormat && uploadIconFormat?.length > 0
                  ? ` ${uploadIconFormat}`
                  : ` w-7 h-7 fill-gray-600`
              )}
              src={uploadIconSrc}
            />
          </div>
          <input
            className='hidden'
            id={componentName}
            type='file'
            onChange={fileInputOnChange}
            accept='.jpg,.png,.jpeg'
          />
        </label>
      </div>
      <div className='flex flex-col justify-center'>
        <p className='text-dark text-sm'>
          (tối đa {DEFAULT_MAX_FILE_SIZE_IN_MEGA_BYTES}MB cho mỗi ảnh)
        </p>
        {stringIsNotEmpty(errorMsg) && (
          <p className='text-red-500 text-sm'>
            {errorMsg}. Vui lòng chọn lại ảnh khác.
          </p>
        )}
      </div>
    </div>
  );
};

const DeleteImgButton = function ({ ...props }) {
  const { imgIndex, handleRemoveImage } = props;

  return (
    <button
      type='button'
      className={'flex items-center justify-center'
        .concat(' rounded-full')
        .concat(' bg-white')
        .concat(' w-4 h-4')
        .concat(' hover:shadow-md hover:border border-zinc-50')
        .concat(' flex-none')}
      onClick={function (evt) {
        evt?.preventDefault();
        evt?.stopPropagation();
        if (imgIndex !== undefined && handleRemoveImage !== undefined) {
          handleRemoveImage(imgIndex);
        }
      }}
    >
      <ReactSVG
        className='w-3.5 h-3.5 fill-dark'
        src={SvgIcon['cross-circle']}
      />
    </button>
  );
};

const PreviewImage = function ({ ...props }) {
  const { imgGridFormat, imgFormat, imgData, index, handleRemoveImage } = props;
  const [openImgTools, setOpenImgTools] = useState(false);

  const [imgRef, setImgRef] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  const onWindowResize = function () {
    if (imgRef?.clientWidth) {
      setImgHeight(imgRef?.clientWidth);
    }
  };

  useEffect(
    function () {
      window.addEventListener('resize', onWindowResize);
      setTimeout(function () {
        onWindowResize();
      }, 200);
      return () => {
        window.removeEventListener('resize', onWindowResize);
      };
    },
    [imgRef]
  );

  return (
    <div
      ref={setImgRef}
      className={`relative rounded shadow-md`
        .concat(stringIsNotEmpty(imgFormat) ? ` ${imgFormat}` : ` w-full`)
        .concat(' bg-zinc-50')}
      style={{ height: `${imgHeight}px` }}
    >
      <div className='absolute -top-2 -right-2 z-2'>
        <DeleteImgButton
          imgIndex={index}
          handleRemoveImage={handleRemoveImage}
        />
      </div>
      <Image
        loader={function ({ src }) {
          return src;
        }}
        src={imgData}
        alt={''}
        layout='fill'
        objectFit='contain'
        className='rounded'
      />
    </div>
  );
};

const PreviewAllImagesComponent = function ({ ...props }) {
  const { localImgPath, imgGridFormat, imgFormat, handleRemoveImage } = props;

  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-4 gap-3'>
        {localImgPath?.map(function (imgData, index) {
          return (
            <PreviewImage
              key={index}
              imgGridFormat={imgGridFormat}
              imgFormat={imgFormat}
              imgData={imgData}
              index={index}
              handleRemoveImage={handleRemoveImage}
            />
          );
        })}
      </div>
    </div>
  );
};

const MultiImgUploadWithPreview = function ({
  name,
  onChange,
  imgLocalDataList,
  imgFileList,
  uploadButtonWrapperFormat,
  uploadIconFormat,
  uploadIconSrc,
  // caption,
  // captionFormat,
  imgGridFormat,
  imgFormat,
  ...props
}) {
  const [componentName, setComponentName] = useState(
    name && name.length > 0 ? name : 'multi-pic-uploader'
  );
  const [localImgData, setLocalImgData] = useState(
    arrayIsNotEmpty(imgLocalDataList) ? imgLocalDataList : []
  );
  const [imgFiles, setImgFiles] = useState(
    arrayIsNotEmpty(imgFileList) ? imgFileList : []
  );
  const [errorMsg, setErrorMsg] = useState(null);

  const fileInputOnChange = function (evt) {
    evt?.preventDefault();
    evt?.stopPropagation();

    const currFile = evt?.target?.files[0];
    // console.info('currFile', currFile);
    if (!currFile) {
      return;
    }

    if (currFile?.type !== PNG_TYPE && currFile?.type !== JPG_TYPE) {
      setErrorMsg(
        'Vui lòng chọn file với định dạng là *.jpg, *.jpeg hay *.png'
      );
    } else if (currFile?.size > DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
      setErrorMsg(
        `Dung lượng tối đa của 1 file là ${DEFAULT_MAX_FILE_SIZE_IN_MEGA_BYTES}MB`
      );
    } else {
      setErrorMsg(null);
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        const newLocalImgDataList = mergeArrUnique(
          [...localImgData],
          [fileReader.result]
        );
        let newImgFiles = [...imgFiles];
        if (newLocalImgDataList.length === localImgData.length) {
          setErrorMsg('Xin lỗi, bạn đã chọn ảnh này trước đó');
        } else {
          newImgFiles = newImgFiles.concat([currFile]);
        }
        setLocalImgData([...newLocalImgDataList]);
        setImgFiles([...newImgFiles]);
        onChange({
          data: {
            fileList: [...newImgFiles],
            localImgPathList: [...newLocalImgDataList],
          },
        });
      };
      fileReader.readAsDataURL(currFile);
    }
    // Solve for input file selection event not firing upon selecting the same file
    document.querySelector(`#${componentName}`).value = '';
  };

  const handleRemoveImage = function (currImgIndex) {
    let localImgDataCopy = [...localImgData];
    localImgDataCopy.splice(currImgIndex, 1);
    let imgFilesCopy = [...imgFiles];
    imgFilesCopy.splice(currImgIndex, 1);
    // console.info('new localImgData', localImgDataCopy);
    setLocalImgData([...localImgDataCopy]);
    setImgFiles([...imgFilesCopy]);
    if (isFunction(onChange)) {
      onChange({
        data: {
          fileList: [...imgFilesCopy],
          localImgPathList: [...localImgDataCopy],
        },
      });
    }
  };

  // console.info('localImgPath', localImgData);

  return (
    <div className='flex flex-col w-full space-y-5'>
      <div className={'flex flex-col'}>
        <UploadButtonComponent
          componentName={componentName}
          uploadButtonWrapperFormat={uploadButtonWrapperFormat}
          uploadIconFormat={uploadIconFormat}
          uploadIconSrc={uploadIconSrc}
          fileInputOnChange={fileInputOnChange}
          errorMsg={errorMsg}
        />
      </div>
      {localImgData && localImgData?.length > 0 && (
        <PreviewAllImagesComponent
          localImgPath={localImgData}
          imgGridFormat={imgGridFormat}
          imgFormat={imgFormat}
          handleRemoveImage={handleRemoveImage}
        />
      )}
    </div>
  );
};

export default MultiImgUploadWithPreview;
