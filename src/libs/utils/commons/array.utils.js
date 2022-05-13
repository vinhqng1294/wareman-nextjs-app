import lodash from 'lodash';

// export const mergeArrOfObjUnique = function (arr1, arr2) {
//   if (Array.isArray(arr1) && Array.isArray(arr2)) {
//     return [...new Set([...arr1, ...arr2])];
//   } else {
//     return [];
//   }
// };

export const mergeArrUnique = function (arr1, arr2) {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    return lodash.unionWith([...arr1], [...arr2], lodash.isEqual);
  } else {
    return [];
  }
};

export const getRandomItemInArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
