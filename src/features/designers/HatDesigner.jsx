/**
 * HatDesigner.jsx — Tabbed hat canvas: text, image, and color panels.
 */

import { useEffect, useRef, useState } from 'react';
import { ColorPickerField, DesignerTabBar, DesignerTabPanel } from '../../ui/components/primitives';
import ImageCropDialog from './businessCard/ImageCropDialog';
import HatCanvas from './hat/HatCanvas';
import { HAT_COLORS, HAT_PANEL, HAT_WIZARD_TABS } from './hat/constants';
import {
  buildHatPreviewLabel,
  createDefaultHatDesign,
  normalizeHatDesign,
} from './hat/designModel';
import { validateColor, validateHatText, validateImageFile } from './hat/validation';
import { formatPrice } from '../../utils/formatPrice';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });

const CANVAS_PANELS = new Set([HAT_PANEL.TEXT, HAT_PANEL.IMAGE, HAT_PANEL.COLOR]);

const HatDesigner = ({
  design: rawDesign,
  onChange,
  activePanel,
  activeTab: activeTabProp,
  onTabChange,
  tabs = HAT_WIZARD_TABS,
  designErrors = [],
  quantityPanel = null,
  schedulePanel = null,
}) => {
  const activeTab = activeTabProp || activePanel || HAT_PANEL.TEXT;
  const design = normalizeHatDesign(rawDesign);
  const [textError, setTextError] = useState('');
  const [colorError, setColorError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [cropSource, setCropSource] = useState(null);
  const fileInputRef = useRef(null);
  const initializedRef = useRef(false);
  const designRef = useRef(design);

  useEffect(() => {
    if (!initializedRef.current && (!rawDesign || !rawDesign.version)) {
      initializedRef.current = true;
      onChange(createDefaultHatDesign());
    }
  }, [rawDesign, onChange]);

  useEffect(() => {
    designRef.current = design;
  }, [design]);

  useEffect(() => {
    setUploadError('');
  }, [activeTab]);

  const applyDesign = (next) => onChange(next);
  const showCanvas = CANVAS_PANELS.has(activeTab);
  const usesHatTabs = Boolean(onTabChange);

  useEffect(() => {
    if (!usesHatTabs) {
      return;
    }

    const current = designRef.current;

    if (activeTab === HAT_PANEL.TEXT && current.inputMode !== 'text') {
      onChange({ ...current, inputMode: 'text' });
      return;
    }

    if (activeTab === HAT_PANEL.IMAGE && current.inputMode !== 'image') {
      onChange({ ...current, inputMode: 'image' });
    }
  }, [activeTab, usesHatTabs, onChange]);

  const handleCompanyNameChange = (value) => {
    setTextError(validateHatText(value) || '');
    applyDesign({ ...design, companyName: value, inputMode: 'text' });
  };

  const handleTextColorChange = (value) => {
    const error = validateColor(value);
    setColorError(error || '');
    if (!error) {
      applyDesign({ ...design, textColor: value });
    }
  };

  const handleHatColorChange = (value) => {
    const error = validateColor(value);
    setColorError(error || '');
    if (!error) {
      applyDesign({ ...design, hatColor: value });
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
    <div className="card-designer hat-designer" aria-label="Hat designer">
      <div
        className={`card-designer__stage${
          usesHatTabs ? ' card-designer__stage--tabbed' : ''
        }`}
      >
        {usesHatTabs && (
          <DesignerTabBar
            tabs={tabs}
            activeTab={activeTab}
            onChange={onTabChange}
            className="designer-tab-bar--on-card"
          />
        )}

        <div className="card-designer__stage-body">
          {showCanvas && (
            <div className="card-designer__canvas card-designer__canvas--hat">
              <HatCanvas design={design} previewLabel={buildHatPreviewLabel(design)} />
            </div>
          )}

          {activeTab === HAT_PANEL.TEXT && (
            <DesignerTabPanel tabId={HAT_PANEL.TEXT} className="card-designer__panel">
              <p className="card-designer__callout">
                Enter a short company or team name to embroider on the front panel.
              </p>

              <div className="form-field">
                <label htmlFor="hat-company" className="form-label">
                  Short company name
                </label>
                <input
                  id="hat-company"
                  type="text"
                  maxLength={25}
                  value={design.companyName}
                  onChange={(event) => handleCompanyNameChange(event.target.value)}
                  className="form-input"
                />
                {textError && (
                  <p className="form-error" role="alert">
                    {textError}
                  </p>
                )}
                <p className="form-hint">Up to 25 characters · letters, numbers, and basic punctuation</p>
              </div>

              <ColorPickerField
                label="Text color"
                value={design.textColor}
                onChange={handleTextColorChange}
                error={colorError}
              />
            </DesignerTabPanel>
          )}

          {activeTab === HAT_PANEL.IMAGE && (
            <DesignerTabPanel tabId={HAT_PANEL.IMAGE} className="card-designer__panel">
              <div className="card-designer__toolbar">
                <button
                  type="button"
                  className="card-designer__tool"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload logo
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
                Upload a logo or graphic for the front panel. Crop it square before placing on the hat.
              </p>

              {uploadError && (
                <p className="card-designer__error" role="alert">
                  {uploadError}
                </p>
              )}
            </DesignerTabPanel>
          )}

          {activeTab === HAT_PANEL.COLOR && (
            <DesignerTabPanel tabId={HAT_PANEL.COLOR} className="card-designer__panel">
              <div>
                <p className="form-label">Hat color</p>
                <div className="hat-designer__swatches">
                  {HAT_COLORS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      aria-label={preset.label}
                      title={preset.label}
                      onClick={() => handleHatColorChange(preset.hex)}
                      className={`hat-designer__swatch${
                        design.hatColor === preset.hex ? ' hat-designer__swatch--active' : ''
                      }`}
                      style={{ backgroundColor: preset.hex }}
                    />
                  ))}
                </div>
              </div>

              <ColorPickerField
                label="Hat color"
                value={design.hatColor}
                onChange={handleHatColorChange}
                error={colorError}
              />

              <p className="form-hint hat-designer__price">
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
        onClose={() => setCropSource(null)}
        onComplete={handleCropComplete}
      />
    </div>
  );
};

export default HatDesigner;