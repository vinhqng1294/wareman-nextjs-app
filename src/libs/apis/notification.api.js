import { getAxios } from '@/apis/axios/setupAxios';

export const getNotifications = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/user/current/notifications', {
    params: {
      ...reqData,
    },
  });
};

export const getSampleNotifications = () => {
  return [
    {
      id: '',
      options: {
        title: 'Notification 1',
        body: 'Notification body 1',
        data: {},
        icon: '',
        image: '',
      },
      isRead: false,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
    {
      id: '',
      options: {
        title: 'Notification 2',
        body: 'Notification body 2',
        data: 'Notification data 2',
        icon: '',
        image: '',
      },
      isRead: true,
      addedDate: '8 tháng trước'
    },
  ]
}

export const addFcmToken = async function ({ accessToken, reqData }) {
  return await getAxios({ accessToken }).post('/user/current/fcm/token', reqData);
};
