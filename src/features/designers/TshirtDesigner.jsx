/**
 * TshirtDesigner.jsx — Interactive shirt canvas with drag-drop, crop, fit, and colors.
 */

import { useEffect, useRef, useState } from 'react';
import ImageCropDialog from './businessCard/ImageCropDialog';
import SizeChart from './tshirt/SizeChart';
import TshirtCanvas from './tshirt/TshirtCanvas';
import {
  FIT_OPTIONS,
  PRINT_COLOR_OPTIONS,
  PRINT_PLACEMENT_OPTIONS,
  SHIRT_COLOR_PRESETS,
  SIZES_BY_FIT,
} from './tshirt/constants';
import {
  addImageElement,
  buildTshirtPreviewLabel,
  createDefaultTshirtDesign,
  moveElement,
  normalizeTshirtDesign,
  removeElement,
  toggleSize,
  updateElement,
  updateFit,
} from './tshirt/designModel';
import {
  hasLowContrast,
  validateColor,
  validateImageFile,
  validateTextValue,
} from './tshirt/validation';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });

const TshirtDesigner = ({ design: rawDesign, onChange }) => {
  const design = normalizeTshirtDesign(rawDesign);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [colorErrors, setColorErrors] = useState({});
  const [uploadError, setUploadError] = useState('');
  const [contrastWarning, setContrastWarning] = useState('');
  const [cropSource, setCropSource] = useState(null);
  const [pendingFileName, setPendingFileName] = useState('');
  const [liveMessage, setLiveMessage] = useState('');
  const fileInputRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && (!rawDesign || !rawDesign.version)) {
      initializedRef.current = true;
      onChange(createDefaultTshirtDesign());
    }
  }, [rawDesign, onChange]);

  useEffect(() => {
    if (hasLowContrast(design.shirtColor, design.textColor)) {
      setContrastWarning('Text contrast may be too low for readability on this shirt color.');
    } else {
      setContrastWarning('');
    }
  }, [design.shirtColor, design.textColor]);

  const announce = (message) => setLiveMessage(message);
  const applyDesign = (nextDesign) => onChange(nextDesign);
  const availableSizes = SIZES_BY_FIT[design.fit] || SIZES_BY_FIT.male;

  const handleFitChange = (fit) => {
    applyDesign(updateFit(design, fit));
    announce(`Fit changed to ${FIT_OPTIONS.find((item) => item.id === fit)?.label || fit}`);
  };

  const handleShirtColorChange = (value) => {
    const error = validateColor(value);
    setColorErrors((current) => ({ ...current, shirtColor: error }));
    if (error) {
      return;
    }
    applyDesign({ ...design, shirtColor: value });
  };

  const handleTextColorChange = (value) => {
    const error = validateColor(value);
    setColorErrors((current) => ({ ...current, textColor: error }));
    if (error) {
      return;
    }
    applyDesign({ ...design, textColor: value });
  };

  const handleContentChange = (elementId, value) => {
    const element = design.elements.find((item) => item.id === elementId);
    if (!element || element.type !== 'text') {
      return;
    }

    const error = validateTextValue(element.fieldKey, value);
    setFieldErrors((current) => ({ ...current, [elementId]: error }));
    if (error) {
      return;
    }

    applyDesign(updateElement(design, elementId, { content: value }));
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
      const dataUrl = await readFileAsDataUrl(file);
      setCropSource(dataUrl);
      setPendingFileName(file.name);
    } catch {
      setUploadError('Upload failed. Check your connection and try again.');
    }
  };

  const handleCropComplete = (croppedSrc) => {
    const result = addImageElement(design, {
      src: croppedSrc,
      fileName: pendingFileName,
    });

    if (result.error) {
      setUploadError(result.error);
      return;
    }

    applyDesign(result.design);
    setPendingFileName('');
    announce('Image added to shirt');
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) {
      return;
    }

    const syntheticEvent = { target: { files: [file], value: '' } };
    await handleFileSelect(syntheticEvent);
  };

  return (
    <div
      className="space-y-4"
      aria-label="T-shirt designer"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="sr-only" aria-live="polite">
        {liveMessage}
      </p>

      <TshirtCanvas
        design={design}
        selectedElementId={selectedElementId}
        previewLabel={buildTshirtPreviewLabel(design)}
        onSelectElement={setSelectedElementId}
        onMoveElement={(elementId, x, y) => applyDesign(moveElement(design, elementId, x, y))}
        onContentChange={handleContentChange}
        onRemoveElement={(elementId) => {
          applyDesign(removeElement(design, elementId));
          setSelectedElementId(null);
        }}
      />

      <div className="flex flex-wrap gap-2">
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
      </div>

      {uploadError && (
        <p className="text-sm text-red-600" role="alert">
          {uploadError}
        </p>
      )}

      <fieldset>
        <legend className="text-sm font-medium text-[#374151]">Fit</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {FIT_OPTIONS.map((option) => (
            <label key={option.id} className="flex items-center gap-2 text-sm text-[#374151]">
              <input
                type="radio"
                name="tshirt-fit"
                value={option.id}
                checked={design.fit === option.id}
                onChange={() => handleFitChange(option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-[#374151]">Sizes</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {availableSizes.map((size) => (
            <label
              key={size}
              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm ${
                design.selectedSizes.includes(size)
                  ? 'border-[#1d4ed8] bg-[#eff6ff] text-[#1d4ed8]'
                  : 'border-[#e5e7eb] text-[#374151]'
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={design.selectedSizes.includes(size)}
                onChange={() => applyDesign(toggleSize(design, size))}
              />
              {size}
            </label>
          ))}
        </div>
        <p className="mt-1 text-xs text-[#9ca3af]">
          Per-size quantities are set on the next step.
        </p>
        <div className="mt-3">
          <SizeChart fit={design.fit} />
        </div>
      </fieldset>

      <div>
        <label className="text-sm font-medium text-[#374151]">Shirt color</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SHIRT_COLOR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-label={preset.label}
              title={preset.label}
              onClick={() => handleShirtColorChange(preset.hex)}
              className={`h-8 w-8 rounded-full border-2 ${
                design.shirtColor === preset.hex ? 'border-[#1d4ed8]' : 'border-[#e5e7eb]'
              }`}
              style={{ backgroundColor: preset.hex }}
            />
          ))}
        </div>
        <label htmlFor="shirt-color-custom" className="mt-2 block text-xs text-[#6b7280]">
          Custom color (hex, HSL, or RGBA)
        </label>
        <input
          id="shirt-color-custom"
          type="text"
          value={design.shirtColor}
          onChange={(event) => handleShirtColorChange(event.target.value)}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        />
        {colorErrors.shirtColor && (
          <p className="mt-1 text-xs text-red-600">{colorErrors.shirtColor}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="print-placement" className="text-sm font-medium text-[#374151]">
            Print placement
          </label>
          <select
            id="print-placement"
            value={design.printPlacement}
            onChange={(event) => applyDesign({ ...design, printPlacement: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
          >
            {PRINT_PLACEMENT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="print-colors" className="text-sm font-medium text-[#374151]">
            Print colors
          </label>
          <select
            id="print-colors"
            value={design.printColors}
            onChange={(event) => applyDesign({ ...design, printColors: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
          >
            {PRINT_COLOR_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="text-color" className="text-sm font-medium text-[#374151]">
          Text / graphic color
        </label>
        <input
          id="text-color"
          type="text"
          value={design.textColor}
          onChange={(event) => handleTextColorChange(event.target.value)}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        />
        {colorErrors.textColor && (
          <p className="mt-1 text-xs text-red-600">{colorErrors.textColor}</p>
        )}
      </div>

      {contrastWarning && (
        <p className="text-sm text-amber-700" role="status">
          {contrastWarning}
        </p>
      )}

      {design.elements
        .filter((element) => element.type === 'text')
        .map((element) =>
          fieldErrors[element.id] ? (
            <p key={element.id} className="text-xs text-red-600">
              {fieldErrors[element.id]}
            </p>
          ) : null
        )}

      <p className="text-xs text-[#9ca3af]">
        Pricing: <span className="text-[#d1d5db]">$0.00</span> (tiers configured later)
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

export default TshirtDesigner;