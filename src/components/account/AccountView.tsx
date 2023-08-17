import { User } from "@/utils/api";
import CustomInput from "../common/CustomInput";
import Avatar from "./Avatar";
import EmailEdit from "./EmailEdit";
import IdentifierEdit from "./IdentifierEdit";
import InfoEdit from "./InfoEdit";
import PasswordEdit from "./PasswordEdit";

export default function AccountView() {
    // get data from swr
    // get user class
    const testUser: User = {
        name: "John",
        id: "john1234",
        email: "123@gmail.com",
        avatarUrl: null
    }
    return (
        <div className="mb-16 flex flex-col md:flex-row gap-32 justify-center items-center md:items-start">
            <div className="flex-initial mx-16">
                <InfoEdit user={testUser} avatarSize={150} />
            </div>
            <div className="flex-initial mx-8 flex flex-col gap-y-6 md:gap-y-12 text-center md:text-left text-lg">
                <div>
                    <label className="inline-block mx-auto w-64 align-top">Идентификатор: </label>
                    <IdentifierEdit user={testUser} />
                </div>
                <div className="mt-4">
                    <label className="inline-block mx-auto w-64 align-top">Почта: </label>
                    <EmailEdit user={testUser} />
                </div>
                <div className="mt-4">
                    <label className="inline-block mx-auto w-64 align-top">Пароль: </label>
                    <PasswordEdit user={testUser} />
                </div>
            </div>
        </div>
    )
}
