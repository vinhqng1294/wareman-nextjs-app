export const checkPermission = function ({
  permissionKey,
  userPermissionList = [],
}) {
  const foundPermission = [...userPermissionList].findIndex(function (
    permission,
    index
  ) {
    if (permissionKey === permission) {
      return index;
    }
  });
  return foundPermission !== -1 ? true : false;
};
