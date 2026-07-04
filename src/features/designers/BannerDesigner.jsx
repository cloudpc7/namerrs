/**
 * BannerDesigner.jsx — Banner canvas with dimensions, description, and artwork.
 */

import { useEffect, useRef, useState } from 'react';
import ImageCropDialog from './businessCard/ImageCropDialog';
import BannerCanvas from './banner/BannerCanvas';
import { BANNER_TYPES, PRESET_SIZES } from './banner/constants';
import {
  addImageElement,
  buildBannerPreviewLabel,
  createDefaultBannerDesign,
  getDimensions,
  getSquareFeet,
  moveElement,
  normalizeBannerDesign,
  removeElement,
} from './banner/designModel';
import {
  validateBannerImageFile,
  validateColor,
  validateDescription,
} from './banner/validation';
import { formatPrice } from '../../utils/formatPrice';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });

const BannerDesigner = ({ design: rawDesign, onChange }) => {
  const design = normalizeBannerDesign(rawDesign);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [descError, setDescError] = useState('');
  const [colorError, setColorError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [cropSource, setCropSource] = useState(null);
  const [pendingFileName, setPendingFileName] = useState('');
  const fileInputRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && (!rawDesign || !rawDesign.version)) {
      initializedRef.current = true;
      onChange(createDefaultBannerDesign());
    }
  }, [rawDesign, onChange]);

  const applyDesign = (next) => onChange(next);
  const { width, height } = getDimensions(design);
  const sqFt = getSquareFeet(design);
  const rate = BANNER_TYPES.find((t) => t.id === design.bannerType)?.ratePerSqFt || 0;

  const handleDescriptionChange = (value) => {
    setDescError(validateDescription(value) || '');
    applyDesign({ ...design, description: value });
  };

  const handleBgColorChange = (value) => {
    const error = validateColor(value);
    setColorError(error || '');
    if (!error) {
      applyDesign({ ...design, backgroundColor: value });
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    setUploadError('');
    const validationError = validateBannerImageFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setCropSource(dataUrl);
      setPendingFileName(file.name);
    } catch {
      setUploadError('Upload failed. Check your connection and try again.');
    }
  };

  const handleCropComplete = (croppedSrc) => {
    const result = addImageElement(design, { src: croppedSrc, fileName: pendingFileName });
    if (result.error) {
      setUploadError(result.error);
      return;
    }
    applyDesign(result.design);
    setPendingFileName('');
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await handleFileSelect({ target: { files: [file], value: '' } });
  };

  return (
    <div
      className="space-y-4"
      aria-label="Banner designer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <BannerCanvas
        design={design}
        selectedElementId={selectedElementId}
        previewLabel={buildBannerPreviewLabel(design)}
        onSelectElement={setSelectedElementId}
        onMoveElement={(id, x, y) => applyDesign(moveElement(design, id, x, y))}
        onRemoveElement={(id) => {
          applyDesign(removeElement(design, id));
          setSelectedElementId(null);
        }}
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151] hover:border-[#1d4ed8]"
        >
          Upload artwork
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {uploadError && (
        <p className="text-sm text-red-600" role="alert">{uploadError}</p>
      )}

      <div>
        <label htmlFor="banner-type" className="text-sm font-medium text-[#374151]">Banner type</label>
        <select
          id="banner-type"
          value={design.bannerType}
          onChange={(e) => applyDesign({ ...design, bannerType: e.target.value })}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        >
          {BANNER_TYPES.map((type) => (
            <option key={type.id} value={type.id}>{type.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="banner-size" className="text-sm font-medium text-[#374151]">Size</label>
        <select
          id="banner-size"
          value={design.sizePreset}
          onChange={(e) => applyDesign({ ...design, sizePreset: e.target.value })}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        >
          {PRESET_SIZES.map((size) => (
            <option key={size.id} value={size.id}>{size.label}</option>
          ))}
        </select>
      </div>

      {design.sizePreset === 'custom' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="banner-width" className="text-xs text-[#6b7280]">Width (ft)</label>
            <input
              id="banner-width"
              type="number"
              min={1}
              step={0.5}
              value={design.customWidth}
              onChange={(e) => applyDesign({ ...design, customWidth: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="banner-height" className="text-xs text-[#6b7280]">Height (ft)</label>
            <input
              id="banner-height"
              type="number"
              min={1}
              step={0.5}
              value={design.customHeight}
              onChange={(e) => applyDesign({ ...design, customHeight: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
            />
          </div>
        </div>
      )}

      {width > 10 && (
        <p className="text-sm text-amber-700" role="status">
          Banners over max width will be joined in sections.
        </p>
      )}

      <div>
        <label htmlFor="banner-message" className="text-sm font-medium text-[#374151]">
          Design description / brief
        </label>
        <textarea
          id="banner-message"
          rows={3}
          value={design.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        />
        {descError && <p className="mt-1 text-xs text-red-600">{descError}</p>}
      </div>

      <div>
        <label htmlFor="banner-bg" className="text-sm font-medium text-[#374151]">Background color</label>
        <input
          id="banner-bg"
          type="text"
          value={design.backgroundColor}
          onChange={(e) => handleBgColorChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        />
        {colorError && <p className="mt-1 text-xs text-red-600">{colorError}</p>}
      </div>

      <p className="text-xs text-[#d1d5db]">
        Live price: {formatPrice(0)} ({sqFt ? `${sqFt} sq ft` : '—'} × rate pending)
      </p>

      <ImageCropDialog
        isOpen={Boolean(cropSource)}
        imageSrc={cropSource}
        onClose={() => setCropSource(null)}
        onComplete={handleCropComplete}
      />
    </div>
  );
};

export default BannerDesigner;