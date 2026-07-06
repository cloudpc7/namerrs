/**
 * MemorialDesigner.jsx — Tabbed memorial print/sticker canvas.
 */

import { useEffect, useRef, useState } from 'react';
import { ColorPickerField, DesignerTabBar, DesignerTabPanel } from '../../ui/components/primitives';
import ImageCropDialog from './businessCard/ImageCropDialog';
import MemorialCanvas from './memorial/MemorialCanvas';
import {
  MEMORIAL_COLORS,
  MEMORIAL_PANEL,
  MEMORIAL_WIZARD_TABS,
  PRODUCT_TYPES,
  SIZES_BY_TYPE,
} from './memorial/constants';
import {
  buildMemorialPreviewLabel,
  createDefaultMemorialDesign,
  getSelectedSize,
  normalizeMemorialDesign,
} from './memorial/designModel';
import {
  validateColor,
  validateImageFile,
  validateMemorialMessage,
  validateMemorialName,
} from './memorial/validation';
import { formatPrice } from '../../utils/formatPrice';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });

const CANVAS_PANELS = new Set([
  MEMORIAL_PANEL.TEXT,
  MEMORIAL_PANEL.PHOTO,
  MEMORIAL_PANEL.SIZE,
  MEMORIAL_PANEL.COLOR,
]);

const MemorialDesigner = ({
  design: rawDesign,
  onChange,
  activePanel,
  activeTab: activeTabProp,
  onTabChange,
  tabs = MEMORIAL_WIZARD_TABS,
  designErrors = [],
  quantityPanel = null,
  schedulePanel = null,
}) => {
  const activeTab = activeTabProp || activePanel || MEMORIAL_PANEL.TEXT;
  const design = normalizeMemorialDesign(rawDesign);
  const [nameError, setNameError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [colorError, setColorError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [liveMessage, setLiveMessage] = useState('');
  const [cropSource, setCropSource] = useState(null);
  const fileInputRef = useRef(null);
  const initializedRef = useRef(false);
  const designRef = useRef(design);

  useEffect(() => {
    if (!initializedRef.current && (!rawDesign || !rawDesign.version)) {
      initializedRef.current = true;
      onChange(createDefaultMemorialDesign());
    }
  }, [rawDesign, onChange]);

  useEffect(() => {
    designRef.current = design;
  }, [design]);

  useEffect(() => {
    setUploadError('');
  }, [activeTab]);

  const announce = (message) => setLiveMessage(message);
  const applyDesign = (next) => onChange(next);
  const showCanvas = CANVAS_PANELS.has(activeTab);
  const usesMemorialTabs = Boolean(onTabChange);
  const sizeOptions = SIZES_BY_TYPE[design.productType] || SIZES_BY_TYPE.print;
  const cropAspect = getSelectedSize(design).aspect;

  useEffect(() => {
    if (!usesMemorialTabs) {
      return;
    }

    const current = designRef.current;

    if (activeTab === MEMORIAL_PANEL.TEXT && current.inputMode !== 'text') {
      onChange({ ...current, inputMode: 'text' });
      announce('Text layout selected');
      return;
    }

    if (activeTab === MEMORIAL_PANEL.PHOTO && current.inputMode !== 'image') {
      onChange({ ...current, inputMode: 'image' });
      announce('Photo layout selected');
    }
  }, [activeTab, usesMemorialTabs, onChange]);

  const handleProductTypeChange = (productType) => {
    const firstSize = SIZES_BY_TYPE[productType][0].id;
    const typeLabel = PRODUCT_TYPES.find((item) => item.id === productType)?.label || productType;
    applyDesign({ ...design, productType, sizeId: firstSize });
    announce(`Product type set to ${typeLabel}`);
  };

  const handleNameChange = (value) => {
    setNameError(validateMemorialName(value) || '');
    applyDesign({ ...design, name: value, inputMode: 'text' });
  };

  const handleMessageChange = (value) => {
    setMessageError(validateMemorialMessage(value) || '');
    applyDesign({ ...design, datesMessage: value, inputMode: 'text' });
  };

  const handleTextColorChange = (value) => {
    const error = validateColor(value);
    setColorError(error || '');
    if (!error) {
      applyDesign({ ...design, textColor: value });
    }
  };

  const handleBackgroundChange = (value) => {
    const error = validateColor(value);
    setColorError(error || '');
    if (!error) {
      applyDesign({ ...design, backgroundColor: value });
      const preset = MEMORIAL_COLORS.find((item) => item.hex === value);
      announce(preset ? `Background set to ${preset.label}` : 'Background color updated');
    }
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

  const handleCropComplete = (croppedSrc) => {
    applyDesign({
      ...design,
      imageSrc: croppedSrc,
      imageFileName: 'memorial',
      inputMode: 'image',
    });
    setCropSource(null);
    announce('Photo placed on memorial preview');
  };

  return (
    <div className="card-designer memorial-designer" aria-label="Memorial designer">
      <p className="sr-only" aria-live="polite">
        {liveMessage}
      </p>
      <div
        className={`card-designer__stage${
          usesMemorialTabs ? ' card-designer__stage--tabbed' : ''
        }`}
      >
        {usesMemorialTabs && (
          <DesignerTabBar
            tabs={tabs}
            activeTab={activeTab}
            onChange={onTabChange}
            className="designer-tab-bar--on-card"
          />
        )}

        <div className="card-designer__stage-body">
          {showCanvas && (
            <div className="card-designer__canvas card-designer__canvas--memorial">
              <MemorialCanvas design={design} previewLabel={buildMemorialPreviewLabel(design)} />
            </div>
          )}

          {activeTab === MEMORIAL_PANEL.TEXT && (
            <DesignerTabPanel tabId={MEMORIAL_PANEL.TEXT} className="card-designer__panel">
              <p className="card-designer__callout">
                Add a name and optional dates or short message for a respectful memorial layout.
              </p>

              <div className="form-field">
                <label htmlFor="memorial-name" className="form-label">
                  Name
                </label>
                <input
                  id="memorial-name"
                  type="text"
                  maxLength={40}
                  value={design.name}
                  onChange={(event) => handleNameChange(event.target.value)}
                  className="form-input"
                />
                {nameError && (
                  <p className="form-error" role="alert">
                    {nameError}
                  </p>
                )}
                <p className="form-hint">Up to 40 characters · letters, numbers, and basic punctuation</p>
              </div>

              <div className="form-field">
                <label htmlFor="memorial-dates" className="form-label">
                  Dates / short message
                </label>
                <textarea
                  id="memorial-dates"
                  rows={2}
                  maxLength={60}
                  value={design.datesMessage}
                  onChange={(event) => handleMessageChange(event.target.value)}
                  className="form-input"
                />
                {messageError && (
                  <p className="form-error" role="alert">
                    {messageError}
                  </p>
                )}
                <p className="form-hint">Optional · up to 60 characters</p>
              </div>

              <ColorPickerField
                label="Text color"
                value={design.textColor}
                onChange={handleTextColorChange}
                error={colorError}
              />
            </DesignerTabPanel>
          )}

          {activeTab === MEMORIAL_PANEL.PHOTO && (
            <DesignerTabPanel tabId={MEMORIAL_PANEL.PHOTO} className="card-designer__panel">
              <div className="card-designer__toolbar">
                <button
                  type="button"
                  className="card-designer__tool"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={handleFileSelect}
                />
              </div>

              <p className="card-designer__callout">
                Upload a photo for the memorial. Crop it to match your selected print or sticker size.
              </p>

              {uploadError && (
                <p className="card-designer__error" role="alert">
                  {uploadError}
                </p>
              )}
            </DesignerTabPanel>
          )}

          {activeTab === MEMORIAL_PANEL.SIZE && (
            <DesignerTabPanel tabId={MEMORIAL_PANEL.SIZE} className="card-designer__panel">
              <div className="form-field">
                <label htmlFor="memorial-type" className="form-label">
                  Product type
                </label>
                <select
                  id="memorial-type"
                  value={design.productType}
                  onChange={(event) => handleProductTypeChange(event.target.value)}
                  className="form-input"
                >
                  {PRODUCT_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="memorial-size" className="form-label">
                  Size
                </label>
                <select
                  id="memorial-size"
                  value={design.sizeId}
                  onChange={(event) => {
                    const sizeId = event.target.value;
                    const sizeLabel = sizeOptions.find((item) => item.id === sizeId)?.label || sizeId;
                    applyDesign({ ...design, sizeId });
                    announce(`Size set to ${sizeLabel}`);
                  }}
                  className="form-input"
                >
                  {sizeOptions.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.label}
                    </option>
                  ))}
                </select>
                <p className="form-hint">Preview updates to match the selected dimensions.</p>
              </div>
            </DesignerTabPanel>
          )}

          {activeTab === MEMORIAL_PANEL.COLOR && (
            <DesignerTabPanel tabId={MEMORIAL_PANEL.COLOR} className="card-designer__panel">
              <div>
                <p className="form-label">Background color</p>
                <div className="memorial-designer__swatches">
                  {MEMORIAL_COLORS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      aria-label={preset.label}
                      title={preset.label}
                      onClick={() => handleBackgroundChange(preset.hex)}
                      className={`memorial-designer__swatch${
                        design.backgroundColor === preset.hex ? ' memorial-designer__swatch--active' : ''
                      }`}
                      style={{ backgroundColor: preset.hex }}
                    />
                  ))}
                </div>
              </div>

              <ColorPickerField
                label="Background color"
                value={design.backgroundColor}
                onChange={handleBackgroundChange}
                error={colorError}
              />

              <p className="form-hint memorial-designer__note">
                Memorial designs are saved respectfully for production review.
              </p>
              <p className="form-hint memorial-designer__price">
                Pricing: <span className="designer-quantity__muted">{formatPrice(0)}</span> (pending
                configuration)
              </p>
            </DesignerTabPanel>
          )}

          {activeTab === 'quantity' && (
            <DesignerTabPanel tabId="quantity">{quantityPanel}</DesignerTabPanel>
          )}
          {activeTab === 'schedule' && (
            <DesignerTabPanel tabId="schedule">{schedulePanel}</DesignerTabPanel>
          )}
        </div>
      </div>

      {designErrors.length > 0 && (
        <div className="alert alert--error" role="alert">
          <ul className="design-errors-list">
            {designErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <ImageCropDialog
        isOpen={Boolean(cropSource)}
        imageSrc={cropSource}
        aspect={cropAspect}
        onClose={() => setCropSource(null)}
        onComplete={handleCropComplete}
      />
    </div>
  );
};

export default MemorialDesigner;