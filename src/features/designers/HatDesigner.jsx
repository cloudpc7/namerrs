/**
 * HatDesigner.jsx — Hat customizer with text or image on front panel.
 */

import { useEffect, useRef, useState } from 'react';
import ImageCropDialog from './businessCard/ImageCropDialog';
import HatCanvas from './hat/HatCanvas';
import { HAT_COLORS } from './hat/constants';
import {
  buildHatPreviewLabel,
  createDefaultHatDesign,
  normalizeHatDesign,
} from './hat/designModel';
import { validateColor, validateHatDesign, validateHatText, validateImageFile } from './hat/validation';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });

const HatDesigner = ({ design: rawDesign, onChange }) => {
  const design = normalizeHatDesign(rawDesign);
  const [textError, setTextError] = useState('');
  const [colorError, setColorError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [cropSource, setCropSource] = useState(null);
  const fileInputRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && (!rawDesign || !rawDesign.version)) {
      initializedRef.current = true;
      onChange(createDefaultHatDesign());
    }
  }, [rawDesign, onChange]);

  const applyDesign = (next) => onChange(next);
  const mode = design.inputMode;

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
      const dataUrl = await readFileAsDataUrl(file);
      setCropSource(dataUrl);
    } catch {
      setUploadError('Upload failed. Check your connection and try again.');
    }
  };

  const handleCropComplete = (croppedSrc) => {
    applyDesign({
      ...design,
      imageSrc: croppedSrc,
      imageFileName: 'logo',
      inputMode: 'image',
    });
    setCropSource(null);
  };

  return (
    <div className="space-y-4" aria-label="Hat designer">
      <HatCanvas design={design} previewLabel={buildHatPreviewLabel(design)} />

      <div className="flex gap-2">
        <button
          type="button"
          aria-pressed={mode === 'text'}
          onClick={() => applyDesign({ ...design, inputMode: 'text' })}
          className={`rounded-lg px-3 py-2 text-sm ${
            mode === 'text' ? 'bg-[#1d4ed8] text-white' : 'border border-[#e5e7eb] text-[#374151]'
          }`}
        >
          Company name
        </button>
        <button
          type="button"
          aria-pressed={mode === 'image'}
          onClick={() => applyDesign({ ...design, inputMode: 'image' })}
          className={`rounded-lg px-3 py-2 text-sm ${
            mode === 'image' ? 'bg-[#1d4ed8] text-white' : 'border border-[#e5e7eb] text-[#374151]'
          }`}
        >
          Logo / image
        </button>
      </div>

      {mode === 'text' ? (
        <div>
          <label htmlFor="hat-company" className="text-sm font-medium text-[#374151]">
            Short company name
          </label>
          <input
            id="hat-company"
            type="text"
            maxLength={25}
            value={design.companyName}
            onChange={(e) => {
              const error = validateHatText(e.target.value);
              setTextError(error || '');
              if (!error) applyDesign({ ...design, companyName: e.target.value });
            }}
            className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
          />
          {textError && <p className="mt-1 text-xs text-red-600">{textError}</p>}
          <label htmlFor="hat-text-color" className="mt-3 block text-sm font-medium text-[#374151]">
            Text color
          </label>
          <input
            id="hat-text-color"
            type="text"
            value={design.textColor}
            onChange={(e) => {
              const error = validateColor(e.target.value);
              setColorError(error || '');
              if (!error) applyDesign({ ...design, textColor: e.target.value });
            }}
            className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
          />
          {colorError && <p className="mt-1 text-xs text-red-600">{colorError}</p>}
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151] hover:border-[#1d4ed8]"
          >
            Upload logo
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
        <label className="text-sm font-medium text-[#374151]">Hat color</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {HAT_COLORS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-label={preset.label}
              title={preset.label}
              onClick={() => applyDesign({ ...design, hatColor: preset.hex })}
              className={`h-8 w-8 rounded-full border-2 ${
                design.hatColor === preset.hex ? 'border-[#1d4ed8]' : 'border-[#e5e7eb]'
              }`}
              style={{ backgroundColor: preset.hex }}
            />
          ))}
        </div>
      </div>

      <p className="text-xs text-[#d1d5db]">Pricing: $0.00 (pending configuration)</p>

      <ImageCropDialog
        isOpen={Boolean(cropSource)}
        imageSrc={cropSource}
        onClose={() => setCropSource(null)}
        onComplete={handleCropComplete}
      />
    </div>
  );
};

export default HatDesigner;