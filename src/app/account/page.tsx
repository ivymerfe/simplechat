import AccountView from "@/components/account/AccountView";

export default function Account() {
    return (
        <div className="text-center">
            <span className="text-2xl">Аккаунт</span>
            <div className="mt-20">
                <AccountView />
            </div>
        </div>
    )
}
