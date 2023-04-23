// Lưu dữ liệu vào trong localStorage
export const setData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu từ trong localStorage
export const getData = (key) => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue) {
        return JSON.parse(localStorageValue);
    }
    return null;
}