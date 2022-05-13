import MultiImgUploadWithPreview from '@/components/ui/img-upload/multi-img-upload-with-preview.component';
import { InputState } from '@/components/ui/input/input.enum';
import InputText from '@/components/ui/input/simple-input-text.component';
import InputTextArea from '@/components/ui/input/simple-input-textarea.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddRoleHeader from './add-role-header.component';

const UploadRoleImgForm = function ({
  formHeader,
  submitFinalData,
  handleNextStep,
  ...props
}) {
  const [roleImgDataList, setRoleImgDataList] = useState([]);

  const submitBtnOnClick = async function () {
    if (isFunction(submitFinalData)) {
      await submitFinalData();
    }
  };

  const backBtnOnClick = function () {
    if (isFunction(handleNextStep)) {
      handleNextStep({ isPrev: true });
    }
  };

  const handleSelectedImg = function ({ data: imgDataList }) {
    // console.info('data', imgDataList);
    const formData = new FormData();
    (imgDataList?.fileList).forEach((imgFile) => {
      formData.append('files', imgFile);
    });
    const newImgDataList = {
      rawDataList: imgDataList,
      formData: formData,
    };
    setRoleImgDataList({ ...newImgDataList });
  };

  return (
    <React.Fragment>
      <AddRoleHeader
        title={formHeader?.title}
        subTitle={formHeader?.subTitle}
      />
      {/* <div
        className={'flex flex-col w-full'
          .concat(' overflow-hidden')
          .concat(' xxs:my-4 md:my-5')}
      >
        <SimpleBarReact className='h-full w-full'>
          <div className='flex flex-col space-y-4 px-2.5 pb-3'>
            <div className='flex flex-col w-full'>
              <MultiImgUploadWithPreview
                name={`role-photo-uploader`}
                uploadIconSrc={SvgIcon['camera-sr']}
                onChange={handleSelectedImg}
                imgLocalDataList={
                  roleImgDataList?.rawDataList?.localImgPathList
                }
                imgFileList={roleImgDataList?.rawDataList?.fileList}
              />
            </div>
          </div>
        </SimpleBarReact>
      </div> */}
      <div
        className={'flex space-x-4'
          .concat(' justify-between items-center')
          .concat(' xxs:mt-auto md:mt-5')
          .concat(' py-1 px-2.5')}
      >
        <button
          type='button'
          className={
            'flex items-center justify-center'
              .concat(' rounded-full')
              .concat(' bg-white')
              .concat(' border border-zinc-200')
              .concat(' px-6 py-2')
              .concat(' hover:shadow-md')
              .concat(' space-x-3')
            // .concat(' xxs:w-full md:w-1/3')
          }
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            backBtnOnClick();
          }}
        >
          <ReactSVG
            src={SvgIcon['arrow-left']}
            className={'fill-dark'.concat(' w-4')}
          />
          <p className='text-dark font-semibold text-base'>Quay lại</p>
        </button>
        <button
          type='button'
          className={'flex items-center justify-center'
            .concat(' rounded-full')
            .concat(' bg-green-500')
            .concat(' px-5 py-2')
            .concat(' hover:shadow-md')
            .concat(' space-x-3')
            .concat(' xxs:w-full md:w-2/3')}
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            submitBtnOnClick();
          }}
        >
          <p className='text-white font-semibold text-base'>Hoàn tất</p>
          {/* <ReactSVG
            src={SvgIcon['arrow-right']}
            className={'fill-white'.concat(' w-4')}
          /> */}
        </button>
      </div>
    </React.Fragment>
  );
};

export default UploadRoleImgForm;
