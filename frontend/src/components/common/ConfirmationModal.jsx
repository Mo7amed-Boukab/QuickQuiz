import { X, AlertTriangle } from 'lucide-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/50">
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="bg-white rounded w-full max-w-md relative">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5] max-md:p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-50 rounded-full">
                                <AlertTriangle className="w-5 h-5 text-red-700" />
                            </div>
                            <h2 className="text-xl font-medium max-md:text-lg">{title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded transition-colors hover:bg-gray-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-md:p-4">
                        <p className="text-sm text-[#737373] leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 px-6 pb-6 pt-4 max-md:px-4 max-md:pb-4 max-md:pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors text-sm h-12 max-md:h-9 max-md:text-xs font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="flex-1 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors text-sm h-12 max-md:h-9 max-md:text-xs font-medium"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
