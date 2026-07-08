import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Link2, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

interface PresetImage {
  name: string;
  url: string;
}

interface ImageUploaderProps {
  id: string;
  label: string;
  imageUrl: string;
  onUrlChange: (url: string) => void;
  onFileUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  presets?: PresetImage[];
  placeholder?: string;
}

export default function ImageUploader({
  id,
  label,
  imageUrl,
  onUrlChange,
  onFileUpload,
  isUploading,
  presets,
  placeholder = "https://images.unsplash.com/photo-1544126592-807adc21510d?auto=format&fit=crop&w=1000&q=80",
}: ImageUploaderProps) {
  // Default to URL mode if it is not a base64 string
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>(
    imageUrl && imageUrl.startsWith('data:') ? 'upload' : 'url'
  );
  const [isDragActive, setIsDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState(imageUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if imageUrl changes externally (e.g. from a preset or template reload)
  useEffect(() => {
    setUrlInput(imageUrl || '');
  }, [imageUrl]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        await onFileUpload(file);
      } else {
        alert("Please drop an image file.");
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await onFileUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setUrlInput('');
    onUrlChange('');
  };

  const handleApplyUrl = () => {
    onUrlChange(urlInput);
  };

  const handlePresetSelect = (url: string) => {
    setUrlInput(url);
    onUrlChange(url);
  };

  return (
    <div className="flex flex-col gap-3 bg-white dark:bg-[#1E1E1F] border border-gray-150 dark:border-gray-800 p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center text-left">
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">{label}</label>
        {imageUrl && (
          <button
            type="button"
            onClick={removeImage}
            className="text-[10px] font-bold text-red-500 hover:text-red-700 flex items-center gap-0.5 cursor-pointer"
          >
            <X size={12} /> Remove Image
          </button>
        )}
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex bg-gray-50 dark:bg-black/40 p-1 rounded-lg border border-gray-150 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'url'
              ? 'bg-white dark:bg-[#1C1C1E] text-[#008060] shadow-sm'
              : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Link2 size={12} /> Paste Image URL
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'upload'
              ? 'bg-white dark:bg-[#1C1C1E] text-[#008060] shadow-sm'
              : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Upload size={12} /> Upload File
        </button>
      </div>

      {/* Tab Content Panels */}
      {activeTab === 'url' ? (
        <div className="flex flex-col gap-2.5 text-left">
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-1.5">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  // Instantly update live preview when pasting or typing to keep editing immediate
                  onUrlChange(e.target.value);
                }}
                className="flex-1 border border-[#C9CCCF] dark:border-gray-800 rounded-lg p-2 text-xs outline-none bg-white dark:bg-black font-mono text-gray-700 dark:text-gray-300 focus:border-[#008060] focus:ring-1 focus:ring-[#008060]/20 transition-all"
                placeholder={placeholder}
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="bg-[#008060] hover:bg-[#006e52] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1"
              >
                Apply Link
              </button>
            </div>
            <p className="text-[10px] text-[#008060] font-bold mt-0.5 flex items-center gap-1 leading-normal select-none">
              <Sparkles size={11} className="shrink-0 animate-pulse text-amber-500" />
              <span>Image URLs load instantly and sync/save to live server in under 1 second!</span>
            </p>
          </div>

          {/* Optional Preset Image Gallery nested inside URL mode for fast beautiful previews */}
          {presets && presets.length > 0 && (
            <div className="flex flex-col gap-1.5 border-t border-gray-150 dark:border-gray-800/80 pt-2.5">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Or Select High-Res Unsplash Presets:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {presets.map((preset, i) => {
                  const isSelected = imageUrl.split('?')[0] === preset.url.split('?')[0];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handlePresetSelect(preset.url)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#008060] scale-95 shadow-md' 
                          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      title={preset.name}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#008060]/25 flex items-center justify-center">
                          <div className="bg-white rounded-full p-1 shadow">
                            <Check size={10} className="text-[#008060] stroke-[4]" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 text-left">
          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={!imageUrl ? triggerFileInput : undefined}
            className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 transition-all duration-200 cursor-pointer text-center ${
              isDragActive
                ? 'border-[#008060] bg-green-50/20 dark:bg-[#008060]/5'
                : imageUrl
                ? 'border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-black/5'
                : 'border-gray-300 dark:border-gray-700 hover:border-[#008060] hover:bg-gray-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />

            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-6 h-6 border-2 border-[#008060] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[11px] font-semibold text-[#008060] mt-2">Uploading asset...</span>
              </div>
            ) : imageUrl ? (
              <div className="w-full flex items-center gap-3">
                {/* Image Preview Thumbnail */}
                <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shrink-0 bg-gray-100 flex items-center justify-center relative group">
                  <img
                    src={imageUrl}
                    alt="Upload preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <ImageIcon size={18} className="text-gray-300 absolute group-hover:opacity-0" />
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[11px] font-bold text-gray-700 dark:text-gray-300 truncate">File Loaded Successfully</p>
                  <p className="text-[9px] text-gray-400 dark:text-gray-500 truncate">{imageUrl.slice(0, 50)}...</p>
                  <div className="flex gap-2 mt-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFileInput();
                      }}
                      className="text-[10px] font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      Replace File
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-2">
                <Upload size={22} className="text-gray-400 mb-1.5 animate-bounce" />
                <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Drag & drop or Click to upload</span>
                <span className="text-[9px] text-gray-400 mt-0.5">Supports PNG, JPG, WEBP</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Live-Linked Preview (always visible if an image exists, so the user has immediate confidence) */}
      {imageUrl && (
        <div className="flex gap-2.5 items-center p-2.5 rounded-lg bg-emerald-50/20 dark:bg-emerald-950/5 border border-emerald-500/10 dark:border-emerald-500/5 select-none">
          <div className="w-10 h-10 rounded border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
            <img
              src={imageUrl}
              alt="Active Preview"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544126592-807adc21510d?auto=format&fit=crop&w=150&q=80";
              }}
            />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider block">Currently Loaded Link</span>
            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 truncate block font-mono">
              {imageUrl.startsWith('data:') ? '📂 Base64 File Data (large)' : `🔗 ${imageUrl}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
