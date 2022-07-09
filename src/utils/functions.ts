export const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
}


export const getFromLocalStorage = (key: string) => {
    const res = localStorage.getItem(key);
    return res ? JSON.parse(res) : null;
}