import React, { useState, useRef } from 'react';
import { Upload, FileIcon, X } from 'lucide-react';

const FileUpload = ({
  title = 'Select File',
  subtitle = 'or drag and drop',
  maxSize = 2, // Default 2MB
  acceptedFileTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'],
  onFileSelect,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const acceptedTypes = acceptedFileTypes.map(type => {
    if (type === 'image/svg+xml') return 'SVG';
    if (type === 'image/png') return 'PNG';
    if (type === 'image/jpeg') return 'JPG';
    if (type === 'image/gif') return 'GIF';
    return type.split('/')[1].toUpperCase();
  }).join(', ');

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const validateFile = (file) => {
    setError(null);
    
    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError(`File type not supported. Please upload ${acceptedTypes}`);
      return false;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }
    
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        onFileSelect(droppedFile);
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onFileSelect(selectedFile);
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      <div 
        className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'} 
          ${file ? 'bg-gray-50' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!file ? handleClick : undefined}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileSelect}
        />
        
        {!file ? (
          <>
            <Upload className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-lg font-medium text-gray-700">{title}</p>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            <p className="text-xs text-gray-400 mt-2">{acceptedTypes} {maxSize && `(MAX ${maxSize}MB)`}</p>
          </>
        ) : (
          <div className="flex items-center">
            <FileIcon className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              className="ml-4 p-1 rounded-full hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;