import { useForm } from "react-hook-form";
import { useUpdateBlogByIdMutation } from "../../../app/apis/blogApi"
import { yupResolver } from "@hookform/resolvers/yup";
import { blogsSchema } from "../schemas/schemas";


function useUpdate(blogId) {

    const id = blogId;


    const [updateBlog] = useUpdateBlogByIdMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(blogsSchema),
        mode: "all"
    });

    const onUpdate = (data) => {
        const newData = {...data, id: id};
        updateBlog({id,...newData})
        .unwrap()
        .then(() => alert("Cập nhật thành công"))
        .catch(err => alert(err.data.message))
    };




    return {
        control, register, handleSubmit, errors, onUpdate
    }
}

export default useUpdate;