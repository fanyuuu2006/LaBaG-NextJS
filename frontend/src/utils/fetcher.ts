export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("API 錯誤");
    return res.json();
  });