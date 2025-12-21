import { Loader2 } from "lucide-react";

const Loader = ({ size = "medium", text = "Chargement..." }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px]">
      <Loader2 className={`animate-spin text-gray-900 ${sizeClasses[size]}`} />
      {text && (
        <p className="mt-4 text-gray-500 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
