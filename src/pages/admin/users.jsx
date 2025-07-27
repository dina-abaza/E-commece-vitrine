import React from "react";
import UseVerifyAdmin from "../../hooks/useverifyadmin";
import UseFetchUsers from "../../hooks/useFetchUsers";

export default function UsersPage() {
  UseVerifyAdmin();

  const { users, loading, error } = UseFetchUsers();

  if (loading)
    return (
      <p className="p-6 text-center text-lg text-gray-700">
        جاري تحميل المستخدمين...
      </p>
    );

  if (error)
    return (
      <p className="p-6 text-center text-red-600 text-lg">
        {error}
      </p>
    );

  return (
    <div className="animate-slideInFromLeft w-full max-w-3xl px-2 sm:px-4 md:p-6 min-h-screen mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center">
        قائمة المستخدمين
      </h2>

      <div className="overflow-auto rounded shadow-sm">
        <table className="min-w-full text-sm sm:text-base border border-gray-300 table-auto text-center">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="border border-gray-300 p-2">الاسم</th>
              <th className="border border-gray-300 p-2">البريد الإلكتروني</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-4 text-center text-red-600">
                  لا يوجد مستخدمين حتى الآن.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="text-gray-800 hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{user.name || "-"}</td>
                  <td className="border border-gray-300 p-2">{user.email || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
