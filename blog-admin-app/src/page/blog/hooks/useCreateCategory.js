import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemasCategory } from "../schemas/schemaCategory";
import { useCreateCategoryMutation } from "../../../app/apis/categoryApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const useCreateCategory = () => {

    const [addCategory] = useCreateCategoryMutation();
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemasCategory),
        mode: "all"
    })

    const onCreateCategory = (data) => {
        addCategory(data)
            .unwrap()
            .then(() => {
                toast.success("Đăng ký thành công")
                navigate("/admin/categories")
            })
            .catch((err) => alert(err.data.message))
    }

    return {
        register, handleSubmit, errors, onCreateCategory
    }

}

export default useCreateCategory;