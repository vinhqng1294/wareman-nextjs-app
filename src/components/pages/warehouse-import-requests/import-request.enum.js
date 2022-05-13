export const ImportRequestStatusList = {
  0: {
    key: 'Draft',
    name: 'Nháp',
    description: '',
    statusAction: {
      acceptBtnName: 'Gửi yêu cầu',
      msg: 'Bạn có muốn gửi yêu cầu nhập kho này không?',
    },
  },
  1: {
    key: 'Submitted',
    name: 'Yêu cầu đã được tạo',
    description: 'Yêu cầu nhập kho đã được tạo và đang chờ duyệt',
    statusAction: {
      acceptBtnName: 'Duyệt yêu cầu',
      msg: 'Bạn có muốn duyệt yêu cầu nhập kho này không?',
    },
  },
  2: {
    key: 'Approved',
    name: 'Đã được duyệt',
    description: '',
    statusAction: {
      acceptBtnName: 'Đã nhận hàng',
      msg: 'Yêu cầu nhập kho đã được duyệt. Nếu đã nhận được hàng, bạn có thể nhấn đã nhận hàng để xác nhận.',
    },
  },
  // 3: {
  //   key: 'InProgress',
  //   name: 'Đang xử lý',
  //   description: 'Hàng hoá đã được đặt, đang chờ giao hàng và nhập vào kho',
  //   statusAction: {
  //     acceptBtnName: 'Kết thúc',
  //     msg: 'Nếu hàng hoá đã được nhập vào kho đủ số lượng, bạn có thể nhấn kết thúc để hoàn tất yêu cầu nhập kho.',
  //   },
  // },
  3: {
    key: 'Delivered',
    name: 'Đã nhận hàng',
    description:
      'Đã nhận hàng và đang kiểm tra hàng hoá trước khi nhập vào kho',
    statusAction: {
      acceptBtnName: 'Nhập kho',
      msg: 'Nếu hàng hoá đã được kiểm tra xong, bạn có thể nhấn nhập kho để hoàn tất.',
    },
  },
  4: { key: 'Done', name: 'Đã hoàn tất', description: '' },
  5: { key: 'Rejected', name: 'Đã huỷ', description: '' },
  6: {
    key: 'Pending',
    name: 'Tạm hoãn xử lý yêu cầu nhập kho',
    description:
      'Do yêu cầu nhập kho này đang có một số vấn đề cần xem xét nên yêu cầu đã bị tạm hoãn',
    statusAction: {
      acceptBtnName: 'Tiếp tục xử lý',
      msg: 'Bạn có muốn tiếp tục xử lý yêu cầu nhập kho này không?',
    },
  },
};
