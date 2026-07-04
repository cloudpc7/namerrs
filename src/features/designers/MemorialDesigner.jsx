/**
 * MemorialDesigner.jsx — Memorial print/sticker customizer.
 */

import { useEffect, useRef, useState } from 'react';
import ImageCropDialog from './businessCard/ImageCropDialog';
import MemorialCanvas from './memorial/MemorialCanvas';
import { PRODUCT_TYPES, SIZES_BY_TYPE } from './memorial/constants';
import {
  buildMemorialPreviewLabel,
  createDefaultMemorialDesign,
  normalizeMemorialDesign,
} from './memorial/designModel';
import {
  validateColor,
  validateImageFile,
  validateMemorialMessage,
  validateMemorialName,
} from './memorial/validation';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });

const MemorialDesigner = ({ design: rawDesign, onChange }) => {
  const design = normalizeMemorialDesign(rawDesign);
  const [nameError, setNameError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [cropSource, setCropSource] = useState(null);
  const fileInputRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && (!rawDesign || !rawDesign.version)) {
      initializedRef.current = true;
      onChange(createDefaultMemorialDesign());
    }
  }, [rawDesign, onChange]);

  const applyDesign = (next) => onChange(next);
  const mode = design.inputMode;
  const sizeOptions = SIZES_BY_TYPE[design.productType] || SIZES_BY_TYPE.print;

  const handleProductTypeChange = (productType) => {
    const firstSize = SIZES_BY_TYPE[productType][0].id;
    applyDesign({ ...design, productType, sizeId: firstSize });
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    setUploadError('');
    const validationError = validateImageFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }
    try {
      setCropSource(await readFileAsDataUrl(file));
    } catch {
      setUploadError('Upload failed. Check your connection and try again.');
    }
  };

  return (
    <div className="space-y-4" aria-label="Memorial designer">
      <MemorialCanvas design={design} previewLabel={buildMemorialPreviewLabel(design)} />

      <div>
        <label htmlFor="memorial-type" className="text-sm font-medium text-[#374151]">
          Product type
        </label>
        <select
          id="memorial-type"
          value={design.productType}
          onChange={(e) => handleProductTypeChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        >
          {PRODUCT_TYPES.map((type) => (
            <option key={type.id} value={type.id}>{type.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="memorial-size" className="text-sm font-medium text-[#374151]">Size</label>
        <select
          id="memorial-size"
          value={design.sizeId}
          onChange={(e) => applyDesign({ ...design, sizeId: e.target.value })}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        >
          {sizeOptions.map((size) => (
            <option key={size.id} value={size.id}>{size.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          aria-pressed={mode === 'text'}
          onClick={() => applyDesign({ ...design, inputMode: 'text' })}
          className={`rounded-lg px-3 py-2 text-sm ${
            mode === 'text' ? 'bg-[#1d4ed8] text-white' : 'border border-[#e5e7eb] text-[#374151]'
          }`}
        >
          Name & message
        </button>
        <button
          type="button"
          aria-pressed={mode === 'image'}
          onClick={() => applyDesign({ ...design, inputMode: 'image' })}
          className={`rounded-lg px-3 py-2 text-sm ${
            mode === 'image' ? 'bg-[#1d4ed8] text-white' : 'border border-[#e5e7eb] text-[#374151]'
          }`}
        >
          Photo
        </button>
      </div>

      {mode === 'text' ? (
        <>
          <div>
            <label htmlFor="memorial-name" className="text-sm font-medium text-[#374151]">Name</label>
            <input
              id="memorial-name"
              type="text"
              value={design.name}
              onChange={(e) => {
                const error = validateMemorialName(e.target.value);
                setNameError(error || '');
                if (!error) applyDesign({ ...design, name: e.target.value });
              }}
              className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
            />
            {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
          </div>
          <div>
            <label htmlFor="memorial-dates" className="text-sm font-medium text-[#374151]">
              Dates / short message
            </label>
            <textarea
              id="memorial-dates"
              rows={2}
              value={design.datesMessage}
              onChange={(e) => {
                const error = validateMemorialMessage(e.target.value);
                setMessageError(error || '');
                if (!error) applyDesign({ ...design, datesMessage: e.target.value });
              }}
              className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
            />
            {messageError && <p className="mt-1 text-xs text-red-600">{messageError}</p>}
          </div>
          <div>
            <label htmlFor="memorial-text-color" className="text-sm font-medium text-[#374151]">
              Text color
            </label>
            <input
              id="memorial-text-color"
              type="text"
              value={design.textColor}
              onChange={(e) => {
                if (!validateColor(e.target.value)) {
                  applyDesign({ ...design, textColor: e.target.value });
                }
              }}
              className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
            />
          </div>
        </>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151] hover:border-[#1d4ed8]"
          >
            Upload photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileSelect}
          />
          {uploadError && <p className="mt-2 text-sm text-red-600" role="alert">{uploadError}</p>}
        </div>
      )}

      <div>
        <label htmlFor="memorial-bg" className="text-sm font-medium text-[#374151]">
          Background color
        </label>
        <input
          id="memorial-bg"
          type="text"
          value={design.backgroundColor}
          onChange={(e) => {
            if (!validateColor(e.target.value)) {
              applyDesign({ ...design, backgroundColor: e.target.value });
            }
          }}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        />
      </div>

      <p className="text-xs text-[#9ca3af]">Memorial design saved respectfully for production review.</p>
      <p className="text-xs text-[#d1d5db]">Pricing: $0.00 (pending configuration)</p>

      <ImageCropDialog
        isOpen={Boolean(cropSource)}
        imageSrc={cropSource}
        onClose={() => setCropSource(null)}
        onComplete={(cropped) => {
          applyDesign({ ...design, imageSrc: cropped, imageFileName: 'memorial', inputMode: 'image' });
          setCropSource(null);
        }}
      />
    </div>
  );
};

export default MemorialDesigner;