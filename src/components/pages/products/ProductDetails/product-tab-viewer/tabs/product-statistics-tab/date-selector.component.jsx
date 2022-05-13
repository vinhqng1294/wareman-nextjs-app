import { InputSize, InputState } from '@/components/ui/input/input.enum';
import InputDate from '@/components/ui/input/simple-input-date.component';
import InputSelect from '@/components/ui/input/simple-input-select.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import moment from 'moment';

const DateSelector = function ({ defaultValue, updateReportDate, ...props }) {
  const [componentLoading, setComponentLoading] = useState(false);

  const [inputData, setInputData] = useState({
    startDate: defaultValue?.startDate ?? '',
    endDate: defaultValue?.endDate ?? '',
  });
  const [inputValidation, setInputValidation] = useState({
    startDate: true,
    endDate: true,
  });
  const [inputFields, setInputFields] = useState({
    startDate: {
      label: 'Từ ngày',
      placeholder: 'Vui lòng chọn 1 ngày cụ thể',
      errorText: 'Thông tin bắt buộc',
    },
    endDate: {
      label: 'Đến ngày',
      placeholder: 'Vui lòng chọn 1 ngày cụ thể',
      errorText: 'Thông tin bắt buộc',
    },
  });

  const [viewSubmitBtn, setViewSubmitBtn] = useState(false);
  const handleSubmitOnClick = function () {
    // console.info('monthYearData', inputData);
    // setViewSubmitBtn(false);
    if (isFunction(updateReportDate)) {
      updateReportDate({
        startDate: inputData?.startDate,
        endDate: inputData?.endDate,
      });
    }
  };

  const monthOnChange = function ({ selected }) {
    // console.info('selected', selected);
    if (defaultValue?.month !== selected?.value) {
      setViewSubmitBtn(true);
    } else {
      setViewSubmitBtn(false);
    }
    setInputData({ ...inputData, startDate: selected?.value });
    // if (selected?.value > 0 && selected?.value < 13) {
    //   setInputValidation({ ...inputValidation, month: true });
    // } else {
    //   setInputValidation({ ...inputValidation, month: false });
    // }
  };

  const startDateOnChange = function ({ value, evt }) {
    setInputData({ ...inputData, startDate: value });

    if (stringIsNotEmpty(value)) {
      if (stringIsNotEmpty(inputData?.endDate)) {
        let currDate = new Date();
        currDate.setHours(23);
        currDate.setMinutes(59);
        currDate.setSeconds(59);
        currDate = moment(currDate).format('YYYY-MM-DD');

        let selectedStartDate = moment(value, 'DD/MM/YYYY').format(
          'YYYY-MM-DD'
        );
        let selectedEndDate = moment(inputData?.endDate, 'DD/MM/YYYY').format(
          'YYYY-MM-DD'
        );
        const isValid =
          moment(selectedStartDate).isSameOrBefore(selectedEndDate) &&
          moment(selectedStartDate).isSameOrBefore(currDate);
        setInputValidation({
          ...inputValidation,
          startDate: isValid,
          endDate: true,
        });
        if (!isValid) {
          const updatedInputFields = { ...inputFields };
          updatedInputFields.startDate.errorText = `Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc và nhỏ hơn hoặc bằng ngày hiện tại`;
          setInputFields({ ...inputFields, ...updatedInputFields });
        }
      } else {
        setInputValidation({
          ...inputValidation,
          startDate: true,
        });
      }
    } else {
      setInputValidation({
        ...inputValidation,
        startDate: false,
      });

      const updatedInputFields = { ...inputFields };
      updatedInputFields.startDate.errorText = 'Vui lòng chọn ngày bắt đầu';
      setInputFields({ ...inputFields, ...updatedInputFields });
    }
  };

  const endDateOnChange = function ({ value, evt }) {
    setInputData({ ...inputData, endDate: value });
    if (stringIsNotEmpty(value)) {
      if (stringIsNotEmpty(inputData?.startDate)) {
        let currDate = new Date();
        currDate.setHours(23);
        currDate.setMinutes(59);
        currDate.setSeconds(59);
        currDate = moment(currDate).format('YYYY-MM-DD');

        let selectedStartDate = moment(
          inputData?.startDate,
          'DD/MM/YYYY'
        ).format('YYYY-MM-DD');
        let selectedEndDate = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const isValid =
          moment(selectedEndDate).isSameOrAfter(selectedStartDate) &&
          moment(selectedEndDate).isSameOrBefore(currDate);
        setInputValidation({
          ...inputValidation,
          startDate: true,
          endDate: isValid,
        });
        if (!isValid) {
          const updatedInputFields = { ...inputFields };
          updatedInputFields.endDate.errorText = `Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu và nhỏ hơn hoặc bằng ngày hiện tại`;
          setInputFields({ ...inputFields, ...updatedInputFields });
        }
      }
    } else {
      setInputValidation({
        ...inputValidation,
        endDate: true,
      });

      const updatedInputFields = { ...inputFields };
      updatedInputFields.endDate.errorText = 'Vui lòng chọn ngày kết thúc';
      setInputFields({ ...inputFields, ...updatedInputFields });
    }
  };

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full bg-zinc-50')
          .concat(' py-2.5 px-7 mt-3')
          .concat(' border-gray-200 border-t border-b')
          .concat(' rounded-tl-xl rounded-tr-xl')
          .concat(' rounded-bl-xl rounded-br-xl')}
      >
        {componentLoading ? (
          <React.Fragment>
            <div className='flex flex-col items-center py-3 px-3'>
              <DotLoader loading={componentLoading} />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className='flex items-center justify-between'>
              <div className='flex space-x-4 w-full'>
                <div className='flex flex-col w-full'>
                  <label
                    className={'pl-2 mb-1 font-semibold text-sm text-dark'}
                  >
                    {inputFields?.startDate?.label}
                  </label>
                  <InputDate
                    inputState={
                      !inputValidation?.startDate
                        ? InputState.danger
                        : InputState.default
                    }
                    placeholder={inputFields?.updatedDate?.placeholder}
                    defaultText={inputData?.startDate}
                    onChange={startDateOnChange}
                  />
                  {!inputValidation?.startDate &&
                    stringIsNotEmpty(inputFields?.startDate?.errorText) && (
                      <div className='flex space-x-2 items-center mt-1.5'>
                        <ReactSVG
                          src={SvgIcon['exclamation-sr']}
                          className='w-5 h-5 fill-red-500 flex-none'
                        />
                        <p className='text-red-500 text-sm'>
                          {inputFields?.startDate?.errorText}
                        </p>
                      </div>
                    )}
                </div>
                <div className='flex flex-col w-full'>
                  <label
                    className={'pl-2 mb-1 font-semibold text-sm text-dark'}
                  >
                    {inputFields?.endDate?.label}
                  </label>
                  <InputDate
                    inputState={
                      !inputValidation?.endDate
                        ? InputState.danger
                        : InputState.default
                    }
                    placeholder={inputFields?.updatedDate?.placeholder}
                    defaultText={inputData?.endDate}
                    onChange={endDateOnChange}
                  />
                  {!inputValidation?.endDate &&
                    stringIsNotEmpty(inputFields?.endDate?.errorText) && (
                      <div className='flex space-x-2 items-center mt-1.5'>
                        <ReactSVG
                          src={SvgIcon['exclamation-sr']}
                          className='w-5 h-5 fill-red-500 flex-none'
                        />
                        <p className='text-red-500 text-sm'>
                          {inputFields?.endDate?.errorText}
                        </p>
                      </div>
                    )}
                </div>
              </div>
              {/* {viewSubmitBtn && ( */}
              <React.Fragment>
                <div className='flex ml-4 flex-none w-36 justify-end'>
                  <button
                    type='button'
                    className={'flex items-center justify-center'
                      .concat(' rounded-full')
                      .concat(' bg-blue-500')
                      .concat(' px-5 py-1.5')
                      .concat(' hover:shadow-md')
                      .concat(' space-x-3')
                      // .concat(' xxs:w-full md:w-2/3')
                      .concat(
                        stringIsNotEmpty(inputData?.startDate) &&
                          stringIsNotEmpty(inputData?.endDate) &&
                          inputValidation?.startDate &&
                          inputValidation?.endDate
                          ? ' cursor-pointer'
                          : ' cursor-not-allowed opacity-50'
                      )}
                    disabled={
                      !(
                        stringIsNotEmpty(inputData?.startDate) &&
                        stringIsNotEmpty(inputData?.endDate) &&
                        inputValidation?.startDate &&
                        inputValidation?.endDate
                      )
                    }
                    onClick={function (evt) {
                      evt?.preventDefault();
                      evt?.stopPropagation();
                      handleSubmitOnClick();
                    }}
                  >
                    <p className='text-white font-semibold text-sm'>
                      Lấy dữ liệu
                    </p>
                    <ReactSVG
                      src={SvgIcon['arrow-right']}
                      className={'fill-white'.concat(' w-3.5')}
                    />
                  </button>
                </div>
              </React.Fragment>
              {/* )} */}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default DateSelector;
