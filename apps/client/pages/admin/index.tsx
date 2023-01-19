import dynamic from 'next/dynamic';

const AddUserForm = dynamic(() => import('../../components/admin/addUserForm'));

export default function AdminPanel() {
    return (
        <div className="flex">
            <div className="flex h-screen flex-col justify-between border-r bg-white w-1/5">
                <div className="px-4">
                    <div className="mt-6 flex flex-col space-y-1">
                        <a
                            href="#"
                            className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                />
                            </svg>

                            <span className="ml-3 text-sm font-medium">
                                Nuevo estudiante
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-4/5 h-screen">
                <AddUserForm />
            </div>
        </div>
    );
}
