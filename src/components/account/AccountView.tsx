import { User } from "@/utils/api";
import CustomInput from "../common/CustomInput";
import Avatar from "./Avatar";

export default function AccountView() {
    // get data from swr
    // get user class
    const testUser: User = {
        name: "John",
        id: "john1234",
        email: "123@gmail.com",
        avatarUrl: "icons/user.svg"
    }
    return (
        <div className="flex flex-col md:flex-row gap-64 justify-center items-center md:items-start">
            <div className="flex-initial w-32">
                <Avatar user={testUser} size={150} />
            </div>
            <div className="flex-initial w-64">
                
            </div>
        </div>
    )
}
