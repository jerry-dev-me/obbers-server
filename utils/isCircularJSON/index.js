module.exports = (data) => {
  let isCircularJSON;
  try {
    const stringyfiedData = JSON.stringify(data);
    isCircularJSON = false;
  } catch (error) {
    isCircularJSON = true;
  }
  return isCircularJSON;
}
