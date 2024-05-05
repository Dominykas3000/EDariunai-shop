export const fetchItems = async () => {
  const response = await fetch("/api/item");
  const data = await response.json();
  const count = data.length;
  const sortedData = data.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return { sortedData, count };
};
