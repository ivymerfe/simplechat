import AccountView from "@/components/account/AccountView";

export default function AccountPage() {
    return (
        <div className="text-center mt-28 md:mt-48">
            <span className="text-2xl">Аккаунт</span>
            <div className="mt-20">
                <AccountView />
            </div>
        </div>
    )
}
