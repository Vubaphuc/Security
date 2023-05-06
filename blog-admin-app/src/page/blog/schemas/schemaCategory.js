import * as yup from "yup";

export const schemasCategory = yup.object ({
    name: yup.string().required("Tên danh mục không được để trống").max(20, "Tên không được quá 20 ký tự")
})