import { Trash2, X } from "lucide-react";
import Loader from "./Loader";

const DeleteConfirmation = ({
  user,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal container */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-[scaleIn_0.2s_ease-out]">
        {/* Header */}
        <div className="bg-red-50 px-6 py-4 flex items-center border-b border-red-100">
          <div className="p-2 bg-red-100 rounded-lg mr-3">
            <Trash2 className="text-red-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-red-800">Delete User</h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete this user?
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium text-gray-900">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-red-600 mt-3">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(user.id)}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? <Loader text="Deleting ..." /> : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
