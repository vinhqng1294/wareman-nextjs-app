export const BuyingRequestStatusList = {
  0: {
    key: 'Draft',
    name: 'Nháp',
    description: '',
    statusAction: {
      acceptBtnName: 'Gửi yêu cầu',
      msg: 'Bạn có muốn gửi đơn yêu cầu mua hàng này không?',
    },
  },
  1: {
    key: 'Submitted',
    name: 'Yêu cầu đã được tạo',
    description: 'Yêu cầu đã được tạo và đang chờ duyệt',
    statusAction: {
      acceptBtnName: 'Duyệt yêu cầu',
      msg: 'Bạn có muốn duyệt yêu cầu mua hàng này không?',
    },
  },
  2: {
    key: 'Approved',
    name: 'Đã được duyệt',
    description: '',
    statusAction: {
      acceptBtnName: 'Bắt đầu xử lý',
      msg: 'Yêu cầu đã được duyệt. Bạn có muốn xử lý ngay không?',
    },
  },
  3: {
    key: 'InProgress',
    name: 'Đang xử lý đơn mua hàng',
    description: '',
    statusAction: {
      acceptBtnName: 'Đóng yêu cầu',
      msg: 'Nếu yêu cầu đã được xử lý xong, bạn có thể đóng yêu cầu.',
    },
  },
  4: { key: 'Done', name: 'Đã hoàn tất', description: '' },
  5: { key: 'Rejected', name: 'Đã huỷ', description: '' },
  6: {
    key: 'Pending',
    name: 'Tạm hoãn xử lý yêu cầu mua hàng',
    description:
      'Do yêu cầu mua hàng này đang có một số vấn đề nên yêu cầu đã bị tạm hoãn để xem xét',
    statusAction: {
      acceptBtnName: 'Tiếp tục xử lý',
      msg: 'Bạn có muốn tiếp tục xử lý yêu cầu mua hàng này không?',
    },
  },
};
