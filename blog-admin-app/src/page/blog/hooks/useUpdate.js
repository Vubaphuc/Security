import { useForm } from "react-hook-form";
import { useUpdateBlogByIdMutation } from "../../../app/apis/blogApi"
import { yupResolver } from "@hookform/resolvers/yup";
import { blogsSchema } from "../schemas/schemas";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function useUpdate(blogId) {

    const id = blogId;
    const navigate = useNavigate();


    const [updateBlog] = useUpdateBlogByIdMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(blogsSchema),
        mode: "all"
    });

    const onUpdate = (data) => {
        const newData = {...data, id: id};
        updateBlog({id,...newData})
        .unwrap()
        .then(() => {
            toast.success("Cập nhật thành công")
            navigate("/admin/blogs/own-blogs")
        })
        .catch(err => alert(err.data.message))
    };




    return {
        control, register, handleSubmit, errors, onUpdate
    }
}

export default useUpdate;