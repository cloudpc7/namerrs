/**
 * BannerDesigner.jsx — Tabbed banner canvas: image, size, brief, and color panels.
 */

import { useEffect, useRef, useState } from 'react';
import { ColorPickerField, DesignerTabBar } from '../../ui/components/primitives';
import ImageCropDialog from './businessCard/ImageCropDialog';
import BannerCanvas from './banner/BannerCanvas';
import {
  BANNER_PANEL,
  BANNER_TYPES,
  BANNER_WIZARD_TABS,
  PRESET_SIZES,
} from './banner/constants';
import {
  addImageElement,
  buildBannerPreviewLabel,
  createDefaultBannerDesign,
  fillBannerImage,
  getDimensions,
  getSquareFeet,
  moveElement,
  normalizeBannerDesign,
  removeElement,
  resizeElement,
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

const CANVAS_PANELS = new Set([
  BANNER_PANEL.IMAGE,
  BANNER_PANEL.SIZE,
  BANNER_PANEL.COLOR,
]);

const BannerDesigner = ({
  design: rawDesign,
  onChange,
  activePanel,
  activeTab: activeTabProp,
  onTabChange,
  tabs = BANNER_WIZARD_TABS,
  designErrors = [],
  quantityPanel = null,
  schedulePanel = null,
}) => {
  const activeTab = activeTabProp || activePanel || BANNER_PANEL.IMAGE;
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

  useEffect(() => {
    setSelectedElementId(null);
    setUploadError('');
  }, [activeTab]);

  const applyDesign = (next) => onChange(next);
  const { width, height } = getDimensions(design);
  const sqFt = getSquareFeet(design);
  const showCanvas = CANVAS_PANELS.has(activeTab);
  const usesBannerTabs = Boolean(onTabChange);

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
    if (result.elementId) {
      setSelectedElementId(result.elementId);
    }
    setPendingFileName('');
  };

  const handleDrop = async (event) => {
    if (activeTab !== BANNER_PANEL.IMAGE) {
      return;
    }

    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await handleFileSelect({ target: { files: [file], value: '' } });
  };

  return (
    <div
      className="card-designer banner-designer"
      aria-label="Banner designer"
      onDragOver={(event) => {
        if (activeTab === BANNER_PANEL.IMAGE) {
          event.preventDefault();
        }
      }}
      onDrop={handleDrop}
    >
      <div
        className={`card-designer__stage${
          usesBannerTabs ? ' card-designer__stage--tabbed' : ''
        }`}
      >
        {usesBannerTabs && (
          <DesignerTabBar
            tabs={tabs}
            activeTab={activeTab}
            onChange={onTabChange}
            className="designer-tab-bar--on-card"
          />
        )}

        <div className="card-designer__stage-body">
          {showCanvas && (
            <div className="card-designer__canvas card-designer__canvas--banner">
              <BannerCanvas
                design={design}
                selectedElementId={selectedElementId}
                previewLabel={buildBannerPreviewLabel(design)}
                onSelectElement={setSelectedElementId}
                onMoveElement={(id, x, y) => applyDesign(moveElement(design, id, x, y))}
                onResizeElement={(id, width, height) =>
                  applyDesign(resizeElement(design, id, width, height))
                }
                onRemoveElement={(id) => {
                  applyDesign(removeElement(design, id));
                  setSelectedElementId(null);
                }}
              />
            </div>
          )}

          {activeTab === BANNER_PANEL.IMAGE && (
            <div className="card-designer__panel">
              <div className="card-designer__toolbar">
                <button
                  type="button"
                  className="card-designer__tool"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload artwork
                </button>
                {selectedElementId && (
                  <>
                    <button
                      type="button"
                      className="card-designer__tool"
                      onClick={() =>
                        applyDesign(fillBannerImage(design, selectedElementId))
                      }
                    >
                      Fill banner
                    </button>
                    <button
                      type="button"
                      className="card-designer__tool"
                      onClick={() => {
                        applyDesign(removeElement(design, selectedElementId));
                        setSelectedElementId(null);
                      }}
                    >
                      Remove selected
                    </button>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={handleFileSelect}
                />
              </div>

              <p className="card-designer__callout">
                Upload artwork or drag a file onto the banner preview. Drag to move, use the corner
                handle to resize, or tap Fill banner to cover the preview.
              </p>

              {uploadError && (
                <p className="card-designer__error" role="alert">
                  {uploadError}
                </p>
              )}
            </div>
          )}

          {activeTab === BANNER_PANEL.SIZE && (
            <div className="card-designer__panel">
              <div className="form-field">
                <label htmlFor="banner-type" className="form-label">
                  Banner type
                </label>
                <select
                  id="banner-type"
                  value={design.bannerType}
                  onChange={(event) => applyDesign({ ...design, bannerType: event.target.value })}
                  className="form-input"
                >
                  {BANNER_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="banner-size" className="form-label">
                  Size
                </label>
                <select
                  id="banner-size"
                  value={design.sizePreset}
                  onChange={(event) => applyDesign({ ...design, sizePreset: event.target.value })}
                  className="form-input"
                >
                  {PRESET_SIZES.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              {design.sizePreset === 'custom' && (
                <div className="banner-designer__dimensions">
                  <div className="form-field">
                    <label htmlFor="banner-width" className="form-label">
                      Width (ft)
                    </label>
                    <input
                      id="banner-width"
                      type="number"
                      min={1}
                      step={0.5}
                      value={design.customWidth}
                      onChange={(event) =>
                        applyDesign({ ...design, customWidth: event.target.value })
                      }
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="banner-height" className="form-label">
                      Height (ft)
                    </label>
                    <input
                      id="banner-height"
                      type="number"
                      min={1}
                      step={0.5}
                      value={design.customHeight}
                      onChange={(event) =>
                        applyDesign({ ...design, customHeight: event.target.value })
                      }
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {width > 10 && (
                <p className="card-designer__warning" role="status">
                  Banners over max width will be joined in sections.
                </p>
              )}

              <p className="form-hint banner-designer__price">
                Live price: <span className="designer-quantity__muted">{formatPrice(0)}</span>
                {' '}
                ({sqFt ? `${sqFt} sq ft` : '—'} × rate pending)
              </p>
            </div>
          )}

          {activeTab === BANNER_PANEL.BRIEF && (
            <div className="card-designer__panel">
              <div className="form-field">
                <label htmlFor="banner-message" className="form-label">
                  Design description / brief
                </label>
                <textarea
                  id="banner-message"
                  rows={4}
                  value={design.description}
                  onChange={(event) => handleDescriptionChange(event.target.value)}
                  className="form-input form-input--textarea"
                />
                {descError && (
                  <p className="form-error" role="alert">
                    {descError}
                  </p>
                )}
                <p className="form-hint">
                  Describe text, colors, and layout so we can produce your banner.
                </p>
              </div>
            </div>
          )}

          {activeTab === BANNER_PANEL.COLOR && (
            <div className="card-designer__panel">
              <ColorPickerField
                label="Background color"
                value={design.backgroundColor}
                onChange={handleBgColorChange}
                error={colorError}
              />
            </div>
          )}

          {activeTab === 'quantity' && quantityPanel}
          {activeTab === 'schedule' && schedulePanel}
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

export default BannerDesigner;