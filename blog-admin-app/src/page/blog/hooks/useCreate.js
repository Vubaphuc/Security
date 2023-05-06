import { useForm } from "react-hook-form"
import { blogsSchema } from "../schemas/schemas"
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreateBlogMutation } from "../../../app/apis/blogApi"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const useCreate = () => {
    const [addBlog] = useCreateBlogMutation();
    const navigate = useNavigate();

    const {
        control, register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(blogsSchema),
        mode: "all"
    });


    const onCreateBlog = (data) => {
        addBlog(data)
        .unwrap()
        .then(() => {
            navigate("/admin/blogs/own-blogs")
            toast.success("tạo mới thành công")
        })
        .catch((err) => console.log(err))
    };

    return {
        control, register, handleSubmit, errors, onCreateBlog
    }
}

export default useCreate;