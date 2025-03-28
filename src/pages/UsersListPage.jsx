import { useState, useEffect } from "react";
import { getUsers } from "../services/users";
import { useDebounce } from "use-debounce";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import UserEditForm from "../components/UserEditForm";
import { updateUser } from "../services/users";
import { deleteUserById } from "../services/users";
import DeleteConfirmation from "../components/DeleteConfirmation";
import LogoutButton from "../components/LogoutButton";
import { logout } from "../services/auth";
import Toast from "../components/Toast";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  // Store Edited Users Due to Regres MOCK API Call(Data won't get updated on their side) Client-Side Caching Here
  const [editedUsersCache, setEditedUsersCache] = useState({});
  // Store Deleted IDs As Well
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [deletedUserIds, setDeletedUserIds] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (userId) => {
    setIsDeleting(true);
    try {
      await deleteUserById(userId);
      setDeletedUserIds((prevIDS) => [...prevIDS, userId]);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setToast({
        show: true,
        message: "User Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      setToast({
        show: true,
        message: "Failed to delete user",
        type: "error",
      });
      console.log(error);
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  const updateUserData = async (updatedData) => {
    try {
      setIsEditing(true);
      const res = await updateUser(updatedData);
      if (!res) {
        setError("Failed to update user. Try Again !");
        return;
      }
      setEditedUsersCache((prev) => ({
        ...prev,
        [updatedData.id]: updatedData,
      }));
      setToast({
        show: true,
        message: "User Updated Successfully",
        type: "success",
      });
    } catch (error) {
      setError(error.message);
      setToast({
        show: true,
        message: "Failed to update user",
        type: "error",
      });
      console.log(error);
    } finally {
      setIsEditing(false);
      setEditingUser(null);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getUsers(currentPage);
        const filteredUsers = res.data
          .filter((user) => !deletedUserIds.includes(user.id))
          .map((user) => editedUsersCache[user.id] || user);

        setUsers(filteredUsers);
        setTotalPages(res.total_pages);
      } catch (err) {
        setError(err.message);
        if (err.response?.status === 401) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, navigate, editedUsersCache, deletedUserIds]);

  const filterUsers = (users, term) => {
    if (!term.trim()) return users;
    const lowerTerm = term.toLowerCase();
    return users.filter((user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(lowerTerm)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="text-indigo-600 font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-4 border-l-4 border-red-500">
          <h3 className="text-lg font-bold text-red-600 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  const filteredUsers = filterUsers(users, debouncedSearchTerm);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <LogoutButton handleLogout={handleLogout} />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-3">
            Our Users
          </h1>
          <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
            Meet the amazing people in our community
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-indigo-500 rounded-full"></div>
          </div>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                setEditingUser={setEditingUser}
                setUserToDelete={setUserToDelete}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                {debouncedSearchTerm
                  ? "No matching users found"
                  : "No users available"}
              </p>
              {debouncedSearchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 cursor-pointer text-indigo-600 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {editingUser && (
          <UserEditForm
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSave={(updatedData) => updateUserData(updatedData)}
            isLoading={isEditing}
          />
        )}
        {userToDelete && (
          <DeleteConfirmation
            user={userToDelete}
            onConfirm={handleDelete}
            onCancel={() => setUserToDelete(null)}
            isLoading={isDeleting}
          />
        )}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          />
        )}

        <div className="mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <Footer
          users={users}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default UsersListPage;
