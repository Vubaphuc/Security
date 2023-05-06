import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemasCategory } from "../schemas/schemaCategory";
import { useUpdateCategoryMutation } from "../../../app/apis/categoryApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function useUpdateCategory(categoryId) {

    

    const navigate = useNavigate();

    const id = categoryId;

    const [updateCategory] = useUpdateCategoryMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemasCategory),
        mode: "all"
    });

    const onUpdateCategory = (data) => {
        const newData = {...data, id: id};
        updateCategory({id,...data})
            .unwrap()
            .then(() => {
                toast.success("Cập nhật thành công")
                navigate("/admin/categories")
            })
            .catch((err) => alert(err.data.message))
    }

    return {
        register, handleSubmit, errors, onUpdateCategory
    }

}

export default useUpdateCategory;