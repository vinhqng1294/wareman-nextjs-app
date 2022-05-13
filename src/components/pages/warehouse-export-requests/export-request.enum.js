export const ExportRequestStatusList = {
  0: {
    key: 'Draft',
    name: 'Nháp',
    description: '',
    statusAction: {
      acceptBtnName: 'Gửi yêu cầu',
      msg: 'Bạn có muốn gửi yêu cầu xuất kho này không?',
    },
  },
  1: {
    key: 'Submitted',
    name: 'Yêu cầu đã được tạo',
    description: 'Yêu cầu xuất kho đã được tạo và đang chờ duyệt',
    statusAction: {
      acceptBtnName: 'Duyệt yêu cầu',
      msg: 'Bạn có muốn duyệt yêu cầu xuất kho này không?',
    },
  },
  2: {
    key: 'Approved',
    name: 'Đã được duyệt',
    description: '',
    statusAction: {
      acceptBtnName: 'Giao hàng',
      msg: 'Yêu cầu xuất kho đã được duyệt. Nếu bắt đầu gửi hàng cho khách hàng, bạn có thể nhấn giao hàng để xuất kho.',
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
    name: 'Đã gửi hàng',
    description: 'Hàng hoá đã được xuất khỏi kho và dã gửi cho khách hàng',
    statusAction: {
      acceptBtnName: 'Kết thúc',
      msg: 'Nếu hàng hoá đã được gửi cho khách hàng, bạn có thể nhấn kết thúc để hoàn tất.',
    },
  },
  4: { key: 'Done', name: 'Đã hoàn tất', description: '' },
  5: { key: 'Rejected', name: 'Đã huỷ', description: '' },
  6: {
    key: 'Pending',
    name: 'Tạm hoãn xử lý yêu cầu xuất kho',
    description:
      'Do yêu cầu xuất kho này đang có một số vấn đề cần xem xét nên yêu cầu đã bị tạm hoãn',
    statusAction: {
      acceptBtnName: 'Tiếp tục xử lý',
      msg: 'Bạn có muốn tiếp tục xử lý yêu cầu xuất kho này không?',
    },
  },
};
