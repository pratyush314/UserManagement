import { Edit, Trash2, User, ChevronRight } from "lucide-react";

const UserCard = ({ user, setEditingUser, setUserToDelete }) => {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
    >
      <div className="flex items-center p-6">
        <div className="relative">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
          />
          <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-full">
            <User size={14} />
          </div>
        </div>

        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-lg text-gray-800">
            {user.first_name} {user.last_name}
          </h3>
        </div>

        <ChevronRight
          size={20}
          className={`text-gray-400 transition-transform hover:translate-x-1`}
        />
      </div>

      <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 flex justify-end space-x-3">
        <button
          className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-colors cursor-pointer"
          aria-label="Edit user"
          onClick={() => setEditingUser(user)}
        >
          <Edit size={18} />
        </button>

        <button
          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
          aria-label="Delete user"
          onClick={() => setUserToDelete(user)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
