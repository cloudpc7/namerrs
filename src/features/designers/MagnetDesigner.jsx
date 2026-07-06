/**
 * MagnetDesigner.jsx — Tabbed vehicle magnet canvas: text, image, and color panels.
 */

import { useEffect, useRef, useState } from 'react';
import { ColorPickerField, DesignerTabBar, DesignerTabPanel } from '../../ui/components/primitives';
import ImageCropDialog from './businessCard/ImageCropDialog';
import MagnetCanvas from './magnet/MagnetCanvas';
import { MAGNET_COLORS, MAGNET_PANEL, MAGNET_WIZARD_TABS } from './magnet/constants';
import {
  buildMagnetPreviewLabel,
  createDefaultMagnetDesign,
  normalizeMagnetDesign,
} from './magnet/designModel';
import { validateColor, validateHatText, validateImageFile } from './hat/validation';
import { formatPrice } from '../../utils/formatPrice';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });

const CANVAS_PANELS = new Set([MAGNET_PANEL.TEXT, MAGNET_PANEL.IMAGE, MAGNET_PANEL.COLOR]);

const MagnetDesigner = ({
  design: rawDesign,
  onChange,
  activePanel,
  activeTab: activeTabProp,
  onTabChange,
  tabs = MAGNET_WIZARD_TABS,
  designErrors = [],
  quantityPanel = null,
  schedulePanel = null,
}) => {
  const activeTab = activeTabProp || activePanel || MAGNET_PANEL.TEXT;
  const design = normalizeMagnetDesign(rawDesign);
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
      onChange(createDefaultMagnetDesign());
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
  const usesMagnetTabs = Boolean(onTabChange);

  useEffect(() => {
    if (!usesMagnetTabs) {
      return;
    }

    const current = designRef.current;

    if (activeTab === MAGNET_PANEL.TEXT && current.inputMode !== 'text') {
      onChange({ ...current, inputMode: 'text' });
      return;
    }

    if (activeTab === MAGNET_PANEL.IMAGE && current.inputMode !== 'image') {
      onChange({ ...current, inputMode: 'image' });
    }
  }, [activeTab, usesMagnetTabs, onChange]);

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

  const handleBackgroundChange = (value) => {
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
      setCropSource(await readFileAsDataUrl(file));
    } catch {
      setUploadError('Upload failed. Check your connection and try again.');
    }
  };

  const handleCropComplete = (croppedSrc) => {
    applyDesign({
      ...design,
      imageSrc: croppedSrc,
      imageFileName: 'magnet',
      inputMode: 'image',
    });
    setCropSource(null);
  };

  return (
    <div className="card-designer magnet-designer" aria-label="Magnet designer">
      <div
        className={`card-designer__stage${
          usesMagnetTabs ? ' card-designer__stage--tabbed' : ''
        }`}
      >
        {usesMagnetTabs && (
          <DesignerTabBar
            tabs={tabs}
            activeTab={activeTab}
            onChange={onTabChange}
            className="designer-tab-bar--on-card"
          />
        )}

        <div className="card-designer__stage-body">
          {showCanvas && (
            <div className="card-designer__canvas card-designer__canvas--magnet">
              <MagnetCanvas design={design} previewLabel={buildMagnetPreviewLabel(design)} />
            </div>
          )}

          {activeTab === MAGNET_PANEL.TEXT && (
            <DesignerTabPanel tabId={MAGNET_PANEL.TEXT} className="card-designer__panel">
              <p className="card-designer__callout">
                Enter a short company or team name to print on your vehicle magnet.
              </p>

              <div className="form-field">
                <label htmlFor="magnet-company" className="form-label">
                  Short company name
                </label>
                <input
                  id="magnet-company"
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

          {activeTab === MAGNET_PANEL.IMAGE && (
            <DesignerTabPanel tabId={MAGNET_PANEL.IMAGE} className="card-designer__panel">
              <div className="card-designer__toolbar">
                <button
                  type="button"
                  className="card-designer__tool"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload graphic
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
                Upload a logo or graphic for your magnet. Crop it to a 2:1 landscape ratio before placing.
              </p>

              {uploadError && (
                <p className="card-designer__error" role="alert">
                  {uploadError}
                </p>
              )}
            </DesignerTabPanel>
          )}

          {activeTab === MAGNET_PANEL.COLOR && (
            <DesignerTabPanel tabId={MAGNET_PANEL.COLOR} className="card-designer__panel">
              <div>
                <p className="form-label">Background color</p>
                <div className="magnet-designer__swatches">
                  {MAGNET_COLORS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      aria-label={preset.label}
                      title={preset.label}
                      onClick={() => handleBackgroundChange(preset.hex)}
                      className={`magnet-designer__swatch${
                        design.hatColor === preset.hex ? ' magnet-designer__swatch--active' : ''
                      }`}
                      style={{ backgroundColor: preset.hex }}
                    />
                  ))}
                </div>
              </div>

              <ColorPickerField
                label="Background color"
                value={design.hatColor}
                onChange={handleBackgroundChange}
                error={colorError}
              />

              <p className="form-hint magnet-designer__price">
                Pricing: <span className="designer-quantity__muted">{formatPrice(40)}</span> (1),{' '}
                <span className="designer-quantity__muted">{formatPrice(75)}</span> (2),{' '}
                <span className="designer-quantity__muted">{formatPrice(100)}</span> (3) — pending
                configuration
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
        aspect={2}
        onClose={() => setCropSource(null)}
        onComplete={handleCropComplete}
      />
    </div>
  );
};

export default MagnetDesigner;