export const getCategoryOptions = (categorys) => {
  if (!categorys) {
    return [];
  }
  return categorys.map((category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });
};

export const getStatus = () => {
  return [
    { label: "Nháp", value: false },
    { label: "Công Khai", value: true },
  ];
};
