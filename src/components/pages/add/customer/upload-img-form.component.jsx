import { getCustomerPhotoSignedUrl } from '@/apis/customer.api';
import { getProductPhotoSignedUrl } from '@/apis/product.api';
import { getProviderPhotoSignedUrl } from '@/apis/provider.api';
import { uploadPhoto } from '@/apis/upload-photo.api';
import MultiImgUploadWithPreview from '@/components/ui/img-upload/multi-img-upload-with-preview.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { toBinaryStr } from '@/utils/commons/file.utils';
import { objectIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddCustomerHeader from './add-customer-header.component';

const UploadImgForm = function ({
  formHeader,
  handleNextStep,
  submitFinalData,
  imgDataList,
  updateImgDataList,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  finalData,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(false);

  const [customerImgDataList, setCustomerImgDataList] = useState({
    ...imgDataList,
  });
  const [photoIds, setPhotoIds] = useState([]);

  const processingUploadPhotos = async function () {
    console.info('customerImgDataList', customerImgDataList);
    console.info('UploadImgForm finalData', finalData);
    const imgFileList = [...customerImgDataList?.rawDataList?.fileList];
    const imgBinaryDataList = [
      ...customerImgDataList?.rawDataList?.localImgPathList,
    ];

    for (let i = 0; i < imgFileList?.length; i++) {
      const imgFileData = imgFileList[i];
      await getCustomerPhotoSignedUrl({
        accessToken,
        reqData: { fileName: imgFileData?.name },
      })
        .then(function ({ data: resData }) {
          // console.info('getProductPhotoSignedUrl resData', resData);
          return resData?.data;
        })
        .then(async function (uploadPhotoData) {
          // console.info('uploadUrl', uploadPhotoData);
          let binaryStr = await toBinaryStr({ file: imgFileData });
          // console.info(binaryStr);
          await uploadPhoto({
            url: uploadPhotoData?.signedUrl,
            binaryData: binaryStr,
            contentType: imgFileData?.type,
          })
            .then(function ({ status }) {
              // console.info('uploadPhoto resData', status);
              if (status === 200) {
                photoIds.push(uploadPhotoData?.id);
              }
            })
            .catch(function (err) {
              console.error('err', err);
              console.error('err', err.response);
            });
          // console.info('photoIds', photoIds);
        })
        .catch(function (err) {
          console.error('err', err);
          console.error('err', err.response);
          setErrorMsg('Upload h??nh th???t b???i');
          setViewErrorPopup(!viewErrorPopup);
        });
    }
  };

  const handleSubmitData = async function () {
    if (objectIsNotEmpty(customerImgDataList)) {
      await processingUploadPhotos();
    }
    const submitData = { ...finalData };
    submitData.photoIds = [...photoIds];
    console.info('submitData', submitData);
    if (isFunction(submitFinalData)) {
      await submitFinalData({ submitData: submitData });
    }
  };
  const submitBtnOnClick = function () {
    setComponentLoading(true);
    setTimeout(async function () {
      await handleSubmitData().finally(function () {
        setComponentLoading(false);
      });
    }, 100);
  };

  const backBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateImgDataList)) {
      updateImgDataList({ ...customerImgDataList });
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
    setCustomerImgDataList({ ...newImgDataList });
  };

  return (
    <React.Fragment>
      <AddCustomerHeader
        title={formHeader?.title}
        subTitle={formHeader?.subTitle}
      />
      <div
        className={'flex flex-col w-full'
          .concat(' overflow-hidden')
          .concat(' xxs:my-4 md:my-5')}
      >
        <SimpleBarReact className='h-full w-full'>
          <div className='flex flex-col space-y-4 px-2.5 pb-3'>
            <div className='flex flex-col w-full px-2'>
              <MultiImgUploadWithPreview
                name={`product-photo-uploader`}
                uploadIconSrc={SvgIcon['camera-sr']}
                onChange={handleSelectedImg}
                imgLocalDataList={
                  customerImgDataList?.rawDataList?.localImgPathList
                }
                imgFileList={customerImgDataList?.rawDataList?.fileList}
              />
            </div>
          </div>
        </SimpleBarReact>
      </div>
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
          <p className='text-dark font-semibold text-base'>Quay l???i</p>
        </button>
        <div className={'flex flex-col'.concat(' xxs:w-full md:w-2/3')}>
          {componentLoading ? (
            <React.Fragment>
              <div className='flex items-center justify-center mx-auto'>
                <DotLoader loading={componentLoading} />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' bg-green-500')
                  .concat(' px-5 py-2')
                  .concat(' hover:shadow-md')
                  .concat(' space-x-3')
                  .concat(' w-full')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  submitBtnOnClick();
                }}
              >
                <p className='text-white font-semibold text-base'>Ho??n t???t</p>
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadImgForm;
