export const saveDataToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
