import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../../app/apis/userApi";
import { UpdateUserSchema } from "../schemas/schemaUpdateUser";


function useUpdateUser(userId) {

    const [addUser] = useUpdateUserMutation();

    const navigate = useNavigate();

    const id = userId;

    

    const { control ,register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(UpdateUserSchema),
        mode: "all"
    });

    const onUpdateUser = (data) => {

        const newData = {...data, id: id};
        addUser({id,...data})
            .unwrap()
            .then(() => {
                toast.success("Cập nhật thành công")
                navigate("/admin/users")
            })
            .catch((err) => alert(err.data.message))
    }

    return {
        control, register, handleSubmit, errors, onUpdateUser
    }

}

export default useUpdateUser;