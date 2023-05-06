import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../schemas/schemaUser";
import { useCreateUserMutation } from "../../../app/apis/userApi";


const useCreateUser = () => {
    
    const navigate = useNavigate();

    const [addUser] = useCreateUserMutation();

    const {
        control, register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
        mode: "all"
    });


    const onCreateUser = (data) => {
        addUser(data)
            .unwrap()
            .then(() => {
                toast.success("Đăng ký thành công")
                navigate("/admin/users")
            })
            .catch((err) => alert(err.data.message))
    };

    return {
        control, register, handleSubmit, errors, onCreateUser
    }
}

export default useCreateUser;