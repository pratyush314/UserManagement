import { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";

  const textColor = type === "success" ? "text-green-700" : "text-red-700";

  const icon =
    type === "success" ? (
      <CheckCircle2 className="w-5 h-5" />
    ) : (
      <XCircle className="w-5 h-5" />
    );

  return (
    <div
      className={`fixed top-4 right-4 z-50 border rounded-lg shadow-lg ${bgColor} animate-[slideIn_0.3s_ease-out]`}
    >
      <div className="flex items-start p-4">
        <span className={`mr-2 ${textColor}`}>{icon}</span>
        <div className={`flex-1 ${textColor}`}>
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-gray-600"
          aria-label="Close toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
