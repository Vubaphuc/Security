import * as yup from "yup";

export const UpdateUserSchema = yup.object({
    name: yup.string().required("Tên không được để trống"),
    email: yup
        .string()
        .required("Email không được để trống")
        .matches(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Email không hợp lệ"
        ),
    roleIds: yup.array().test("isRoleIdsRequired", "Roles không được để trống", (value) => {
        return value && value.length > 0 || typeof value === 'undefined';
      })
})