import { useState, useRef } from "react";

export default function FileUpload({
    onFileSelect,
    accept = "image/*",
    maxSize = 2048,
    label = "Upload File",
    preview = null,
    className = "",
}) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const validateFile = (file) => {
        if (accept === "image/*" && !file.type.startsWith("image/")) {
            return "File harus berupa gambar (JPG, PNG, GIF)";
        }

        if (file.size > maxSize * 1024) {
            return `Ukuran file maksimal ${maxSize}KB`;
        }

        return null;
    };

    const handleFileSelect = (file) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        onFileSelect(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleInputChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${
                        isDragOver
                            ? "border-[#C4A484] bg-[#C4A484]/5"
                            : "border-gray-300 hover:border-[#C4A484] hover:bg-gray-50"
                    }
                    ${error ? "border-red-300 bg-red-50" : ""}
                `}
            >
                {preview ? (
                    <div className="space-y-3">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-lg mx-auto"
                        />
                        <div className="text-sm text-gray-600">
                            Klik atau drag & drop untuk mengganti foto
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <svg
                            className="w-12 h-12 text-gray-400 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <div className="text-sm text-gray-600">
                            <span className="font-medium text-[#C4A484]">
                                Klik untuk upload
                            </span>{" "}
                            atau drag & drop
                        </div>
                        <div className="text-xs text-gray-500">
                            PNG, JPG, GIF hingga {maxSize}KB
                        </div>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleInputChange}
                    className="hidden"
                />
            </div>

            {error && (
                <div className="text-sm text-red-600 flex items-center space-x-1">
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
