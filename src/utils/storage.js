/* eslint-disable no-undef */
export const getTodos = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["todos"], (result) => {
      resolve(result.todos || []);
    });
  });
};

export const saveTodos = (todos) => {
  chrome.storage.local.set({ todos });
};

export const getTheme = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["darkMode"], (result) => {
      resolve(result.darkMode || false);
    });
  });
};

export const saveTheme = (value) => {
  chrome.storage.local.set({ darkMode: value });
};
