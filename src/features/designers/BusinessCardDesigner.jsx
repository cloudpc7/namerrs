/**
 * BusinessCardDesigner.jsx — Interactive 3.5 × 2 in canvas with drag-drop, crop, and flip.
 */

import { useEffect, useRef, useState } from 'react';
import BusinessCardCanvas from './businessCard/BusinessCardCanvas';
import ImageCropDialog from './businessCard/ImageCropDialog';
import { PAPER_OPTIONS, TEXT_FIELDS } from './businessCard/constants';
import {
  addImageElement,
  addTextElement,
  buildCardPreviewLabel,
  copyFrontToBack,
  createDefaultBusinessCardDesign,
  getSideState,
  moveElement,
  normalizeBusinessCardDesign,
  removeElement,
  updateElement,
  updateSide,
} from './businessCard/designModel';
import {
  hasLowContrast,
  validateColor,
  validateImageFile,
  validateTextValue,
} from './businessCard/validation';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });

const BusinessCardDesigner = ({ design: rawDesign, onChange }) => {
  const design = normalizeBusinessCardDesign(rawDesign);
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
      onChange(createDefaultBusinessCardDesign());
    }
  }, [rawDesign, onChange]);

  const side = design.activeSide || 'front';
  const sideState = getSideState(design, side);
  const frontState = getSideState(design, 'front');
  const backState = getSideState(design, 'back');

  useEffect(() => {
    if (hasLowContrast(sideState.backgroundColor, sideState.textColor)) {
      setContrastWarning('Text contrast may be too low for readability.');
    } else {
      setContrastWarning('');
    }
  }, [sideState.backgroundColor, sideState.textColor]);

  const announce = (message) => setLiveMessage(message);

  const applyDesign = (nextDesign) => onChange(nextDesign);

  const handleFlip = () => {
    const nextSide = side === 'front' ? 'back' : 'front';
    applyDesign({ ...design, activeSide: nextSide });
    setSelectedElementId(null);
    announce(nextSide === 'back' ? 'Showing back of card' : 'Showing front of card');
  };

  const handleCopyFrontToBack = () => {
    applyDesign(copyFrontToBack(design));
    announce('Front layout copied to back');
  };

  const handleSideColorChange = (key, value) => {
    const error = validateColor(value);
    setColorErrors((current) => ({ ...current, [key]: error }));
    if (error) {
      return;
    }

    applyDesign(
      updateSide(design, side, (current) => ({
        ...current,
        [key]: value,
      }))
    );
  };

  const handleContentChange = (elementId, value) => {
    const element = sideState.elements.find((item) => item.id === elementId);
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
    announce('Image added to card');
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

  const existingTextFields = new Set(
    sideState.elements.filter((el) => el.type === 'text').map((el) => el.fieldKey)
  );

  return (
    <div
      className="space-y-4"
      aria-label="Business card designer"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="sr-only" aria-live="polite">
        {liveMessage}
      </p>

      <BusinessCardCanvas
        design={design}
        frontState={frontState}
        backState={backState}
        selectedElementId={selectedElementId}
        previewLabel={buildCardPreviewLabel(design)}
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
          onClick={handleFlip}
          className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151] hover:border-[#1d4ed8]"
        >
          Flip card
        </button>
        <button
          type="button"
          onClick={handleCopyFrontToBack}
          className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151] hover:border-[#1d4ed8]"
        >
          Copy front to back
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151] hover:border-[#1d4ed8]"
        >
          Upload image
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

      <div>
        <label htmlFor="paper-type" className="text-sm font-medium text-[#374151]">
          Card type / paper
        </label>
        <select
          id="paper-type"
          value={design.paperType}
          onChange={(event) => applyDesign({ ...design, paperType: event.target.value })}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        >
          {PAPER_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="bg-color" className="text-sm font-medium text-[#374151]">
            Background
          </label>
          <input
            id="bg-color"
            type="text"
            value={sideState.backgroundColor}
            onChange={(event) => handleSideColorChange('backgroundColor', event.target.value)}
            className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
          />
          {colorErrors.backgroundColor && (
            <p className="mt-1 text-xs text-red-600">{colorErrors.backgroundColor}</p>
          )}
        </div>
        <div>
          <label htmlFor="text-color" className="text-sm font-medium text-[#374151]">
            Text color
          </label>
          <input
            id="text-color"
            type="text"
            value={sideState.textColor}
            onChange={(event) => handleSideColorChange('textColor', event.target.value)}
            className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
          />
          {colorErrors.textColor && (
            <p className="mt-1 text-xs text-red-600">{colorErrors.textColor}</p>
          )}
        </div>
      </div>

      {contrastWarning && (
        <p className="text-sm text-amber-700" role="status">
          {contrastWarning}
        </p>
      )}

      <div>
        <label htmlFor="add-text-field" className="text-sm font-medium text-[#374151]">
          Add text field
        </label>
        <select
          id="add-text-field"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) {
              applyDesign(addTextElement(design, event.target.value));
              event.target.value = '';
            }
          }}
          className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
        >
          <option value="">Select field…</option>
          {TEXT_FIELDS.filter((field) => !existingTextFields.has(field.key)).map((field) => (
            <option key={field.key} value={field.key}>
              {field.label}
            </option>
          ))}
        </select>
      </div>

      {sideState.elements
        .filter((element) => element.type === 'text')
        .map((element) =>
          fieldErrors[element.id] ? (
            <p key={element.id} className="text-xs text-red-600">
              {fieldErrors[element.id]}
            </p>
          ) : null
        )}

      {selectedElementId && (
        <button
          type="button"
          onClick={() => {
            const element = sideState.elements.find((item) => item.id === selectedElementId);
            if (element) {
              applyDesign(moveElement(design, selectedElementId, 8, element.y));
            }
          }}
          className="text-sm text-[#1d4ed8] hover:underline"
        >
          Reset position
        </button>
      )}

      <ImageCropDialog
        isOpen={Boolean(cropSource)}
        imageSrc={cropSource}
        onClose={() => setCropSource(null)}
        onComplete={handleCropComplete}
      />
    </div>
  );
};

export default BusinessCardDesigner;