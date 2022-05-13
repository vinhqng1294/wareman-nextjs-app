import { InputSize, InputState } from '@/components/ui/input/input.enum';
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

const MonthYearSelector = function ({ defaultValue, getReportData, ...props }) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [inputData, setInputData] = useState({
    month: undefined,
    year: undefined,
  });
  const [inputValidation, setInputValidation] = useState({
    month: true,
    year: true,
  });
  const inputFields = {
    month: {
      label: 'Chọn tháng',
      placeholder: 'Vui lòng chọn 1 tháng',
      errorText: 'Thông tin bắt buộc',
    },
    year: {
      label: 'Chọn năm',
      placeholder: 'Vui lòng chọn 1 năm',
      errorText: 'Thông tin bắt buộc',
    },
  };

  const [monthList, setMonthList] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const mapData = (data) =>
    data?.map((x) => ({
      value: x.value,
      label: x.name,
    })) ?? [];
  const findSelectListViaLabel = function (list, label) {
    return list?.find((x) => x.label === label);
  };
  const findSelectListViaValue = function (list, value) {
    return list?.find((x) => x.value === value);
  };
  const monthOnChange = function ({ selected }) {
    // console.info('selected', selected);
    if (defaultValue?.month !== selected?.value) {
      setViewSubmitBtn(true);
    } else {
      setViewSubmitBtn(false);
    }
    setInputData({ ...inputData, month: selected?.value });
    // if (selected?.value > 0 && selected?.value < 13) {
    //   setInputValidation({ ...inputValidation, month: true });
    // } else {
    //   setInputValidation({ ...inputValidation, month: false });
    // }
  };
  const yearOnChange = function ({ selected }) {
    // console.info('selected', selected);
    if (defaultValue?.year !== selected?.value) {
      setViewSubmitBtn(true);
    } else {
      setViewSubmitBtn(false);
    }
    setInputData({ ...inputData, year: selected?.value });
    if (selected?.value > 1999 && selected?.value <= new Date().getFullYear()) {
      setInputValidation({ ...inputValidation, year: true });
    } else {
      setInputValidation({ ...inputValidation, year: false });
    }
  };

  const [viewSubmitBtn, setViewSubmitBtn] = useState(true);
  const handleSubmitOnClick = function () {
    console.info('monthYearData', inputData);
    setViewSubmitBtn(false);
    if (isFunction(getReportData)) {
      getReportData({ month: inputData?.month, year: inputData?.year });
    }
  };

  useEffect(function () {
    if (!arrayIsNotEmpty(monthList)) {
      let newMonthList = [{ name: 'Không xác định', value: undefined }];
      for (let i = 1; i < 13; i++) {
        newMonthList.push({ name: `Tháng ${i}`, value: i });
      }
      setMonthList([...newMonthList]);
    }
  }, []);

  useEffect(function () {
    if (!arrayIsNotEmpty(yearList)) {
      let newYearList = [];
      for (let i = 2000; i <= new Date().getFullYear(); i++) {
        newYearList.push({ name: `${i}`, value: i });
      }
      setYearList([...newYearList]);
    }
  }, []);

  useEffect(
    function () {
      if (arrayIsNotEmpty(monthList)) {
        setMonthOptions(mapData(monthList));
      }
    },
    [monthList]
  );

  useEffect(
    function () {
      if (arrayIsNotEmpty(yearList)) {
        setYearOptions(mapData(yearList));
      }
    },
    [yearList]
  );

  useEffect(
    function () {
      if (arrayIsNotEmpty(monthOptions) && arrayIsNotEmpty(yearOptions)) {
        setComponentLoading(false);
      }
    },
    [monthOptions, yearOptions]
  );

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
                    {inputFields?.month?.label}
                  </label>
                  <InputSelect
                    searchBoxId={'select-month-search-box'}
                    size={InputSize.small}
                    inputState={
                      !inputValidation?.month
                        ? InputState.danger
                        : InputState.default
                    }
                    placeholder={inputFields?.month?.placeholder}
                    onChange={monthOnChange}
                    options={monthOptions}
                    defaultValue={findSelectListViaValue(
                      monthOptions,
                      inputData?.month
                    )}
                  />
                  {!inputValidation?.month &&
                    stringIsNotEmpty(inputFields?.month?.errorText) && (
                      <div className='flex space-x-2 items-center mt-1.5'>
                        <ReactSVG
                          src={SvgIcon['exclamation-sr']}
                          className='w-5 h-5 fill-red-500 flex-none'
                        />
                        <p className='text-red-500 text-sm'>
                          {inputFields?.month?.errorText}
                        </p>
                      </div>
                    )}
                </div>
                <div className='flex flex-col w-full'>
                  <label
                    className={'pl-2 mb-1 font-semibold text-sm text-dark'}
                  >
                    {inputFields?.year?.label}
                  </label>
                  <InputSelect
                    searchBoxId={'select-year-search-box'}
                    size={InputSize.small}
                    inputState={
                      !inputValidation?.year
                        ? InputState.danger
                        : InputState.default
                    }
                    placeholder={inputFields?.year?.placeholder}
                    onChange={yearOnChange}
                    options={yearOptions}
                    defaultValue={findSelectListViaValue(
                      yearOptions,
                      inputData?.year
                    )}
                  />
                  {!inputValidation?.year &&
                    stringIsNotEmpty(inputFields?.year?.errorText) && (
                      <div className='flex space-x-2 items-center mt-1.5'>
                        <ReactSVG
                          src={SvgIcon['exclamation-sr']}
                          className='w-5 h-5 fill-red-500 flex-none'
                        />
                        <p className='text-red-500 text-sm'>
                          {inputFields?.year?.errorText}
                        </p>
                      </div>
                    )}
                </div>
              </div>
              {viewSubmitBtn && (
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
                          // inputValidation?.month &&
                          inputValidation?.year &&
                            // inputData?.month > 0 &&
                            inputData?.year > 1999
                            ? ' cursor-pointer'
                            : ' cursor-not-allowed opacity-50'
                        )}
                      disabled={
                        !(
                          // inputValidation?.month &&
                          (
                            inputValidation?.year &&
                            // inputData?.month > 0 &&
                            inputData?.year > 1999
                          )
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
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default MonthYearSelector;
