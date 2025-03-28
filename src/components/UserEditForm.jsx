import { X, User as UserIcon, Mail, Edit2 } from "lucide-react";
import { useState } from "react";
import Loader from "./Loader";

const UserEditForm = ({ user, onClose, onSave, isLoading }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    setUpdatedUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.first_name !== updatedUser.first_name ||
      user.last_name !== updatedUser.last_name ||
      user.email !== updatedUser.email
    ) {
      onSave(updatedUser);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Light blur overlay (click to close) */}
      <div
        className="absolute inset-0 bg-white/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container with subtle scale animation */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-100 transform transition-all duration-200 animate-[scaleIn_0.2s_ease-out]"
      >
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-4 flex justify-between items-center border-b border-indigo-100">
          <div className="flex items-center space-x-3">
            <Edit2 className="text-indigo-600" size={20} />
            <h2 className="text-xl font-semibold text-indigo-800">Edit User</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-indigo-400 hover:text-indigo-600 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-20 h-20 rounded-full object-cover border-4 border-indigo-50"
              />
              <div className="absolute bottom-0 right-0 bg-indigo-100 text-indigo-600 p-1.5 rounded-full">
                <UserIcon size={14} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="first_name"
                value={updatedUser.first_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-gray-700"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                value={updatedUser.last_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-gray-700"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={16} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 flex justify-end space-x-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium"
          >
            {isLoading ? <Loader text="Editing ..." /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;
