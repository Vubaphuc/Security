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

export const getRoles = (roles) => {
  if(!roles) {
    return [];
  }
  return roles.map((role) => {
    return {
      label: role.name,
      value: role.id,
    };
  });
}
