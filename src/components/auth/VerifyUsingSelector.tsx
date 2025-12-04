export default function VerifyUsingSelector({ method, setMethod }: any) {
    return (
        <div>
            <span className="text-sm font-medium text-slate-600">Verify using</span>
            <div className="mt-2 inline-flex rounded-lg bg-slate-50 border border-slate-100 p-1">
                <button
                    type="button"
                    onClick={() => setMethod("email")}
                    className={`px-3 py-2 rounded-lg text-sm ${method === "email" ? "bg-white shadow" : ""}`}
                >
                    Email
                </button>
                <button
                    type="button"
                    onClick={() => setMethod("phone")}
                    className={`px-3 py-2 rounded-lg text-sm ${method === "phone" ? "bg-white shadow" : ""}`}
                >
                    Phone
                </button>
            </div>
        </div>
    );
}
