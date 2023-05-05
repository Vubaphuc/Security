import { useForm } from "react-hook-form"
import { blogsSchema } from "../schemas/schemas"
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreateBlogMutation, useUpdateBlogByIdMutation } from "../../../app/apis/blogApi"


const useCreate = () => {
    const [addBlog] = useCreateBlogMutation();
    const [updateBlog] = useUpdateBlogByIdMutation();

    const {
        control, register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(blogsSchema),
        mode: "all"
    });


    const onCreateBlog = (data) => {
        addBlog(data)
        .unwrap()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    };

    const onUpdateBlog = (data) => {
       console.log(data)
       
       
       
    };

    return {
        control, register, handleSubmit, errors, onCreateBlog, onUpdateBlog
    }
}

export default useCreate;