/**
 * MagnetDesigner.jsx — Vehicle magnet customizer (12" × 24").
 */

import { useEffect, useRef, useState } from 'react';
import ImageCropDialog from './businessCard/ImageCropDialog';
import { HAT_COLORS } from './hat/constants';
import { validateColor, validateHatText, validateImageFile } from './hat/validation';
import MagnetCanvas from './magnet/MagnetCanvas';
import {
  buildMagnetPreviewLabel,
  createDefaultMagnetDesign,
  normalizeMagnetDesign,
} from './magnet/designModel';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });

const MagnetDesigner = ({ design: rawDesign, onChange }) => {
  const design = normalizeMagnetDesign(rawDesign);
  const [textError, setTextError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [cropSource, setCropSource] = useState(null);
  const fileInputRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && (!rawDesign || !rawDesign.version)) {
      initializedRef.current = true;
      onChange(createDefaultMagnetDesign());
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
      setCropSource(await readFileAsDataUrl(file));
    } catch {
      setUploadError('Upload failed. Check your connection and try again.');
    }
  };

  return (
    <div className="space-y-4" aria-label="Magnet designer">
      <MagnetCanvas design={design} previewLabel={buildMagnetPreviewLabel(design)} />

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
          <label htmlFor="magnet-company" className="text-sm font-medium text-[#374151]">
            Short company name
          </label>
          <input
            id="magnet-company"
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
          <label htmlFor="magnet-text-color" className="mt-3 block text-sm font-medium text-[#374151]">
            Text color
          </label>
          <input
            id="magnet-text-color"
            type="text"
            value={design.textColor}
            onChange={(e) => {
              const error = validateColor(e.target.value);
              if (!error) applyDesign({ ...design, textColor: e.target.value });
            }}
            className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
          />
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151] hover:border-[#1d4ed8]"
          >
            Upload graphic
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
        <label className="text-sm font-medium text-[#374151]">Background</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {HAT_COLORS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-label={preset.label}
              onClick={() => applyDesign({ ...design, hatColor: preset.hex })}
              className={`h-8 w-8 rounded-full border-2 ${
                design.hatColor === preset.hex ? 'border-[#1d4ed8]' : 'border-[#e5e7eb]'
              }`}
              style={{ backgroundColor: preset.hex }}
            />
          ))}
        </div>
      </div>

      <p className="text-xs text-[#d1d5db]">Pricing: $0.00 (1=$40, 2=$75, 3=$100 — pending)</p>

      <ImageCropDialog
        isOpen={Boolean(cropSource)}
        imageSrc={cropSource}
        onClose={() => setCropSource(null)}
        onComplete={(cropped) => {
          applyDesign({ ...design, imageSrc: cropped, imageFileName: 'magnet', inputMode: 'image' });
          setCropSource(null);
        }}
      />
    </div>
  );
};

export default MagnetDesigner;