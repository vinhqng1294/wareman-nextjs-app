export const PurchaseOrderStatusList = {
  0: {
    key: 'Draft',
    name: 'Nháp',
    description: '',
    statusAction: {
      acceptBtnName: 'Gửi đơn',
      msg: 'Bạn có muốn gửi đơn đặt hàng này không?',
    },
  },
  1: {
    key: 'Submitted',
    name: 'Yêu cầu đã được tạo',
    description: 'Đơn đặt hàng đã được tạo và đang chờ duyệt',
    statusAction: {
      acceptBtnName: 'Duyệt đơn',
      msg: 'Bạn có muốn duyệt đơn đặt hàng này không?',
    },
  },
  2: {
    key: 'Approved',
    name: 'Đã được duyệt',
    description: '',
    statusAction: {
      acceptBtnName: 'Đặt hàng',
      msg: 'Đơn đặt hàng đã được duyệt. Bạn có muốn đặt hàng ngay không?',
    },
  },
  3: {
    key: 'InProgress',
    name: 'Đang xử lý',
    description: 'Hàng hoá đã được đặt, đang chờ giao hàng và nhập vào kho',
    statusAction: {
      acceptBtnName: 'Kết thúc',
      msg: 'Nếu hàng hoá đã được nhập vào kho đủ số lượng, bạn có thể nhấn kết thúc để hoàn tất đơn đặt hàng.',
    },
  },
  // 4: {
  //   key: 'Delivered',
  //   name: 'Đã giao hàng',
  //   description:
  //     'Đã giao hàng và đang kiểm tra hàng hoá trước khi kết thúc đơn đặt hàng',
  //   statusAction: {
  //     acceptBtnName: 'Kết thúc',
  //     msg: 'Nếu hàng hoá đã được kiểm tra xong, bạn có thể nhấn kết thúc để hoàn tất.',
  //   },
  // },
  4: { key: 'Done', name: 'Đã hoàn tất', description: '' },
  5: { key: 'Rejected', name: 'Đã huỷ', description: '' },
  6: {
    key: 'Pending',
    name: 'Tạm hoãn xử lý đơn đặt hàng',
    description:
      'Do đơn đặt hàng này đang có một số vấn đề cần xem xét nên yêu cầu đã bị tạm hoãn',
    statusAction: {
      acceptBtnName: 'Tiếp tục xử lý',
      msg: 'Bạn có muốn tiếp tục xử lý đơn đặt hàng này không?',
    },
  },
};
