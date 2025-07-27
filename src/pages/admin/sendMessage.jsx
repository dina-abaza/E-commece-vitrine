import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/customerStore/authStore";
import UseVerifyAdmin from "../../hooks/useverifyadmin";

export default function Sendmessages() {
UseVerifyAdmin()

  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [selectUser, setSelectUser] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");

  const token= useAuthStore((state)=>state.token)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("https://e-commece-vitrine-api.vercel.app/api/users");
        setUsers(res.data.ALL_Users || []);
      } catch (err) {
        console.error("فشل في تحميل البيانات", err);
      }
    }
    fetchUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

 const payload = {
  title,
  content,
  forUser: selectUser === "all" ? null : selectUser,
  forAll: selectUser === "all"
};


    try {
      console.log("🚀 Sending Payload:", payload);
      console.log(token)
     await axios.post("https://e-commece-vitrine-api.vercel.app/api/messages", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
  },
});
      setTitle("");
      setcontent("");
      setSelectUser("all");
      alert("تم إرسال الرسالة بنجاح");
    } catch (err) {
       const errorMsg =
       err.response?.data?.message || "حدث خطأ أثناء إرسال الرسالة";
       setErrorMessage(errorMsg);
       console.log(errorMessage)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-20 flex flex-col w-full max-w-3xl h-auto bg-white shadow-2xl justify-center gap-y-5 p-10 mx-auto"
    >
      <input
        type="text"
        value={title}
        placeholder="اضف عنوان"
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-2 outline-none border border-blue-100 rounded text-right"
      />

      <textarea
        placeholder="اضف المحتوي"
        value={content}
        onChange={(e) => setcontent(e.target.value)}
        required
        className="outline-none border rounded border-blue-100  text-right p-2 resize-none"
      ></textarea>

      <select
        value={selectUser}
        onChange={(e) => setSelectUser(e.target.value)}
        className="outline-none border p-2 rounded border-blue-100 text-right "
      >
        <option value="all">📢 ارسال للكل</option>
        {users.length > 0 ? (
          users.map((user) => (
            <option key={user._id} value={user._id}>
              👤 {user.name}
            </option>
          ))
        ) : (
          <option disabled>لا يوجد مستخدمين</option>
        )}
      </select>

      <button
        type="submit"
        className="bg-blue-300 text-white shadow-md px-5 py-2 rounded w-1/3 mx-auto hover:bg-blue-400 transition duration-300 font-bold "
      >
        🚀 إرسال الرسالة
      </button>
    </form>
  );
}
