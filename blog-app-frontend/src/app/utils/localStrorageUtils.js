
// lưu vào
export const setData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}
// lấy ra
export const getData = (key) => {
    // lấy dữ liệu trong localStorage ra ở dạng JSON
    const localStrorageValue = localStorage.getItem(key);
    // nếu có thì trả về dữ liệu và parse ra dữ liệu ban đầu
    if (localStrorageValue) {
        return JSON.parse(localStrorageValue);
    }
    return null;
}