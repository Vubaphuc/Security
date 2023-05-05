import * as yup from "yup";

export const blogsSchema = yup.object({
    title: yup.string().required("title không được để trống"),
    content: yup.string().required("content không được để trống"),
    description: yup.string().required("Mô tả không được để trống"), 
    categoryIds: yup.array().test("isCategoryIdsRequired", "Danh mục không được để trống", (value) => {
        return value && value.length > 0 || typeof value === 'undefined';
      })
})