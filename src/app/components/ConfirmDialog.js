import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed z-50 bg-white shadow-lg md:max-w-md w-full 
        md:bottom-4 md:right-4 md:rounded-lg
        bottom-0 left-0 right-0 rounded-t-lg">
        <div className="flex justify-between items-center p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="mr-2 text-red-600" size={20} />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <p className="text-gray-600 mb-6">{message}</p>
          
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDialog;