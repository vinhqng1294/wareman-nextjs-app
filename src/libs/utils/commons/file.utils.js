export const toBinaryStr = function ({ file }) {
  return new Promise(function (resolve, reject) {
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      resolve(fileReader.result);
    };
    fileReader.onerror = function (err) {
      reject(err);
    };
    fileReader.readAsArrayBuffer(file);
  });
};
