import {
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React from 'react';
import NavItem from './nav-item.component';

const AuthorizedView = function ({ permissionList, ...props }) {
  const navConfigs = {
    // 0: {
    //   sectionTitle: '',
    //   navItems: {
    //     1: {
    //       label: 'Dashboard',
    //       mainIcon: SvgIcon['chart-histogram'],
    //       secondIcon: '',
    //       url: '/dashboard',
    //     },
    //   },
    // },
    1: {
      sectionTitle: 'Nghiệp vụ nhập kho',
      navItems: {
        1: {
          label: 'Quản lý yêu cầu mua hàng',
          mainIcon: SvgIcon['shopping-bag'],
          secondIcon: '',
          url: '/buying-requests',
        },
        2: {
          label: 'Quản lý đơn đặt hàng',
          mainIcon: SvgIcon.form,
          secondIcon: '',
          url: '/purchase-orders',
        },
        3: {
          label: 'Quản lý yêu cầu nhập kho',
          mainIcon: SvgIcon.garage,
          secondIcon: SvgIcon['arrow-small-left'],
          url: '/warehouse-import-requests',
        },
      },
    },
    2: {
      sectionTitle: 'Nghiệp vụ xuất kho',
      navItems: {
        1: {
          label: 'Quản lý đơn bán hàng',
          mainIcon: SvgIcon.receipt,
          secondIcon: '',
          url: '/sale-orders',
        },
        2: {
          label: 'Quản lý yêu cầu xuất kho',
          mainIcon: SvgIcon.garage,
          secondIcon: SvgIcon['arrow-small-right'],
          url: '/warehouse-export-requests',
        },
      },
    },
    3: {
      sectionTitle: 'Báo cáo',
      navItems: {
        // 1: {
        //   label: 'Thống kê',
        //   mainIcon: SvgIcon['chart-histogram'],
        //   secondIcon: '',
        //   url: '/dashboard',
        // },
        1: {
          label: 'Báo cáo xuất nhập tồn',
          mainIcon: SvgIcon.notebook,
          secondIcon: '',
          url: '/report/warehouse-import-export',
        },
        // 3: {
        //   label: 'Báo cáo kiểm kê kho',
        //   mainIcon: SvgIcon.notebook,
        //   secondIcon: '',
        //   url: '/report/inventory',
        // },
      },
    },
    4: {
      sectionTitle: 'Nghiệp vụ kho cơ bản',
      navItems: {
        1: {
          label: 'Quản lý sản phẩm',
          mainIcon: SvgIcon.resources,
          secondIcon: '',
          url: '/products',
        },
        2: {
          label: 'Quản lý phân khu',
          mainIcon: SvgIcon['layout-fluid'],
          secondIcon: '',
          url: '/lots',
        },
      },
    },
    5: {
      sectionTitle: 'Quản lý đối tác',
      navItems: {
        1: {
          label: 'Quản lý nhà cung cấp',
          mainIcon: SvgIcon['truck-loading'],
          secondIcon: '',
          url: '/providers',
        },
        2: {
          label: 'Quản lý khách hàng',
          mainIcon: SvgIcon.shop,
          secondIcon: '',
          url: '/customers',
        },
      },
    },
    6: {
      sectionTitle: 'Quản lý nội bộ',
      navItems: {
        1: {
          label: 'Quản lý nhân sự',
          mainIcon: SvgIcon['man-head'],
          secondIcon: SvgIcon['woman-head'],
          url: '/employees',
        },
        2: {
          label: 'Quản lý chức vụ',
          mainIcon: SvgIcon['head-side-thinking'],
          secondIcon: '',
          url: '/roles',
        },
        3: {
          label: 'Quản lý đơn vị đo',
          mainIcon: SvgIcon.protractor,
          secondIcon: '',
          url: '/uoms',
        },
      },
    },
  };

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'.concat(' w-full').concat(' py-10 space-y-8')}
      >
        {Object.keys(navConfigs).map(function (navSectionKey, index) {
          const navSectionData = navConfigs[navSectionKey];
          return (
            <React.Fragment key={index}>
              {objectIsNotEmpty(navSectionData?.navItems) && (
                <React.Fragment>
                  <div className='flex flex-col'>
                    {stringIsNotEmpty(navSectionData?.sectionTitle) && (
                      <React.Fragment>
                        <div className='flex items-center'>
                          <p className='text-dark text-2xl font-bold'>
                            {navSectionData?.sectionTitle}
                          </p>
                        </div>
                      </React.Fragment>
                    )}
                    <div
                      className={'grid xxs:px-0 xs:px-6 md-px-2'
                        .concat(
                          ' xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                        )
                        .concat(' xxs:gap-x-3 xxs:gap-y-3')
                        .concat(' xs:gap-x-4 xs:gap-y-4')
                        .concat(' md:gap-x-5 md:gap-y-5')
                        .concat(' xs:w-full py-5')}
                    >
                      {Object.keys(navSectionData?.navItems).map(function (
                        navItemKey,
                        index
                      ) {
                        const navItemData =
                          navSectionData?.navItems[navItemKey];
                        return (
                          <React.Fragment key={index}>
                            <NavItem
                              icon={navItemData?.mainIcon}
                              secondIcon={navItemData?.secondIcon}
                              label={navItemData?.label}
                              url={navItemData?.url}
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default AuthorizedView;
