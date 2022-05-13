import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FormScreenLayout from '@/layouts/FormScreen.layout';
import BasicRackInfoForm from './basic-rack-info-form.component';
import { useState } from 'react';
import UploadRackImgForm from './upload-rack-img-form.component';
import { getLotInfoById } from '@/apis/lot.api';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import {
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import { useRouter } from 'next/router';
import { addRack } from '@/apis/rack.api';
import { DotLoader } from '@/components/ui/loader/loader.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const AddRackMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [pageLoading, setPageLoading] = useState(true);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  const [lotId, setLotId] = useState('');
  const [lotInfo, setLotInfo] = useState({});

  const addRackSteps = {
    1: {
      title: '',
      subTitle: '',
    },
    2: {
      title: 'Hình ảnh của kệ',
      subTitle: 'Vui lòng tải lên các hình ảnh của kệ',
    },
  };
  const [currStep, setCurrStep] = useState(1);
  const handleNextStep = function ({ isPrev = false }) {
    if (isPrev) {
      setCurrStep(currStep - 1);
    } else {
      setCurrStep(currStep + 1);
    }
  };

  const [finalData, setFinalData] = useState({
    name: '',
    description: '',
  });
  const updateFinalData = function ({ data, ...props }) {
    setFinalData({ ...finalData, ...data });
  };

  const submitFinalData = async function ({ ...props }) {
    addRack({
      accessToken: auth?.accessToken,
      lotId: lotId,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        redirectTo('/lots/'.concat(lotId));
      })
      .catch(function (err) {
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      });
  };

  const [finalImgDataList, setFinalImgDataList] = useState({});

  useEffect(
    function () {
      if (!stringIsNotEmpty(auth?.accessToken)) {
        redirectTo('/login');
      }
    },
    [auth?.accessToken]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(router?.query)) {
        setLotId(router?.query?.lotId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(lotId)) {
        setPageLoading(true);
        getLotInfoById({ accessToken: auth?.accessToken, lotId })
          .then(function ({ data: resData }) {
            console.info('getLotInfoById resData', resData);
            setLotInfo({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setPageLoading(false);
          });
      }
    },
    [lotId]
  );

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <ErrorModal
        open={viewErrorPopup}
        errorMsg={errorMsg}
        onClose={errorPopupOnClose}
      />
      <FormScreenLayout
        layoutBgColor={'bg-white'}
        bodyPaddingY={'xxs:py-4 md:py-5'}
      >
        <div
          className={
            'flex flex-col'.concat(' w-full h-full').concat(' items-center')
            // .concat(' overflow-hidden')
          }
        >
          <div
            className={'flex flex-col'
              .concat(' w-full h-full md:max-w-2xl')
              .concat(' xxs:px-4 md:px-0')
              .concat(' overflow-hidden')}
          >
            {pageLoading ? (
              <React.Fragment>
                <div className='flex items-center justify-center mx-auto my-auto'>
                  <DotLoader loading={pageLoading} />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {currStep === 1 && (
                  <BasicRackInfoForm
                    formHeader={addRackSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    defaultValue={{
                      name: finalData?.name,
                      description: finalData?.description,
                    }}
                    lotInfo={lotInfo}
                  />
                )}
                {currStep === 2 && (
                  <UploadRackImgForm
                    formHeader={addRackSteps[currStep]}
                    handleNextStep={handleNextStep}
                    submitFinalData={submitFinalData}
                    imgDataList={{ ...finalImgDataList }}
                    updateImgDataList={setFinalImgDataList}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    finalData={{ ...finalData }}
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </FormScreenLayout>
    </React.Fragment>
  );
};

export default AddRackMain;
