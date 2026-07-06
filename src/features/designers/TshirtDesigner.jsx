/**
 * TshirtDesigner.jsx — Tabbed shirt canvas: text, colors, print, image, and sizes panels.
 */

import { useEffect, useRef, useState } from 'react';
import SizeChart from './tshirt/SizeChart';
import TshirtCanvas from './tshirt/TshirtCanvas';
import {
  BACK_PRINT_PLACEMENT_OPTIONS,
  CENTERED_TEXT_LAYOUT,
  FIT_OPTIONS,
  FRONT_PRINT_PLACEMENT_OPTIONS,
  PRINT_COLOR_OPTIONS,
  SHIRT_COLOR_PRESETS,
  SIZES_BY_FIT,
  TEXT_FIELDS,
  TSHIRT_PANEL,
  TSHIRT_WIZARD_TABS,
} from './tshirt/constants';
import {
  addImageElement,
  addTextElement,
  buildTshirtPreviewLabel,
  createDefaultTshirtDesign,
  getViewElements,
  moveElement,
  normalizeTshirtDesign,
  removeElement,
  resizeElement,
  selectSize,
  updateElement,
  updateFit,
} from './tshirt/designModel';
import { ColorPickerField, DesignerTabBar, DesignerTabPanel } from '../../ui/components/primitives';
import { isEyeDropperSupported, pickColorFromScreen } from './tshirt/eyedropper';
import {
  hasLowContrast,
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

const CANVAS_PANELS = new Set([
  TSHIRT_PANEL.TEXT,
  TSHIRT_PANEL.COLOR,
  TSHIRT_PANEL.PRINT,
  TSHIRT_PANEL.IMAGE,
]);

const TshirtDesigner = ({
  design: rawDesign,
  onChange,
  activePanel,
  activeTab: activeTabProp,
  onTabChange,
  tabs = TSHIRT_WIZARD_TABS,
  designErrors = [],
  quantityPanel = null,
  schedulePanel = null,
}) => {
  const activeTab = activeTabProp || activePanel || TSHIRT_PANEL.TEXT;
  const design = normalizeTshirtDesign(rawDesign);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [uploadError, setUploadError] = useState('');
  const [colorPickError, setColorPickError] = useState('');
  const [contrastWarning, setContrastWarning] = useState('');
  const [liveMessage, setLiveMessage] = useState('');
  const fileInputRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && !rawDesign?.version) {
      initializedRef.current = true;
      onChange({
        ...createDefaultTshirtDesign(),
        ...rawDesign,
      });
    }
  }, [rawDesign, onChange]);

  const activeView = design.activeView || 'front';
  const viewElements = getViewElements(design, activeView);

  useEffect(() => {
    setSelectedElementId(null);
    setUploadError('');
    setColorPickError('');
  }, [activeTab]);

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
  const showCanvas = CANVAS_PANELS.has(activeTab);
  const usesShirtTabs = Boolean(onTabChange);
  const existingTextFields = new Set(
    viewElements.filter((element) => element.type === 'text').map((element) => element.fieldKey)
  );

  const handleFlip = () => {
    const nextView = activeView === 'front' ? 'back' : 'front';
    applyDesign({ ...design, activeView: nextView });
    setSelectedElementId(null);
    announce(nextView === 'back' ? 'Showing back of shirt' : 'Showing front of shirt');
  };

  const handleShirtColorChange = (value) => {
    applyDesign({ ...design, shirtColor: value });
  };

  const handleTextColorChange = (value) => {
    applyDesign({ ...design, textColor: value });
  };

  const handleFitChange = (fit) => {
    applyDesign(updateFit(design, fit));
    announce(`Fit changed to ${FIT_OPTIONS.find((item) => item.id === fit)?.label || fit}`);
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

  const handleEyedropper = async (target = 'shirt') => {
    setColorPickError('');
    const { color, error } = await pickColorFromScreen();

    if (error) {
      setColorPickError(error);
      return;
    }

    if (!color) {
      return;
    }

    if (target === 'text') {
      handleTextColorChange(color);
      announce('Text color updated from eyedropper');
      return;
    }

    handleShirtColorChange(color);
    announce('Shirt color updated from eyedropper');
  };

  const placeImageFile = async (file) => {
    if (activeTab !== TSHIRT_PANEL.IMAGE) {
      return;
    }

    setUploadError('');

    const validationError = validateImageFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const result = addImageElement(design, {
        src: dataUrl,
        fileName: file.name,
      });

      if (result.error) {
        setUploadError(result.error);
        return;
      }

      applyDesign(result.design);
      if (result.elementId) {
        setSelectedElementId(result.elementId);
      }
      announce(`Image placed on ${activeView} of shirt — drag to move, corner handle to resize`);
    } catch {
      setUploadError('Upload failed. Check your connection and try again.');
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) {
      await placeImageFile(file);
    }
  };

  return (
    <div className="card-designer tshirt-designer" aria-label="T-shirt designer">
      <p className="sr-only" aria-live="polite">
        {liveMessage}
      </p>

      <div
        className={`card-designer__stage${
          usesShirtTabs ? ' card-designer__stage--tabbed' : ''
        }`}
      >
        {usesShirtTabs && (
          <DesignerTabBar
            tabs={tabs}
            activeTab={activeTab}
            onChange={onTabChange}
            className="designer-tab-bar--on-card"
          />
        )}

        <div className="card-designer__stage-body">
          {showCanvas && (
            <div className="card-designer__canvas card-designer__canvas--shirt">
              <TshirtCanvas
                design={design}
                activeTab={activeTab}
                selectedElementId={selectedElementId}
                previewLabel={buildTshirtPreviewLabel(design)}
                onFlip={handleFlip}
                onDropFile={activeTab === TSHIRT_PANEL.IMAGE ? placeImageFile : undefined}
                onShirtEyedropper={() => handleEyedropper('shirt')}
                onSelectElement={setSelectedElementId}
                onMoveElement={(elementId, x, y) =>
                  applyDesign(moveElement(design, elementId, x, y))
                }
                onResizeElement={(elementId, width, height) =>
                  applyDesign(resizeElement(design, elementId, width, height))
                }
                onContentChange={handleContentChange}
                onRemoveElement={(elementId) => {
                  applyDesign(removeElement(design, elementId));
                  setSelectedElementId(null);
                }}
              />
            </div>
          )}

          {activeTab === TSHIRT_PANEL.TEXT && (
            <DesignerTabPanel tabId={TSHIRT_PANEL.TEXT} className="card-designer__panel">
              <div className="form-field">
                <label htmlFor="add-tshirt-text-field" className="form-label">
                  Add text field
                </label>
                <select
                  id="add-tshirt-text-field"
                  className="form-input"
                  defaultValue=""
                  onChange={(event) => {
                    if (event.target.value) {
                      applyDesign(addTextElement(design, event.target.value, activeView));
                      event.target.value = '';
                      announce(`Text field added to ${activeView} of shirt`);
                    }
                  }}
                >
                  <option value="">Select field…</option>
                  {TEXT_FIELDS.filter((field) => !existingTextFields.has(field.key)).map((field) => (
                    <option key={field.key} value={field.key}>
                      {field.label}
                    </option>
                  ))}
                </select>
                {existingTextFields.size === TEXT_FIELDS.length && (
                  <p className="form-hint">All text fields are on this side of the shirt.</p>
                )}
              </div>

              {viewElements
                .filter((element) => element.type === 'text')
                .map((element) =>
                  fieldErrors[element.id] ? (
                    <p key={element.id} className="form-error">
                      {fieldErrors[element.id]}
                    </p>
                  ) : null
                )}

              {selectedElementId &&
                viewElements.find((item) => item.id === selectedElementId)?.type === 'text' && (
                <button
                  type="button"
                  className="card-designer__link"
                  onClick={() => {
                    const element = viewElements.find((item) => item.id === selectedElementId);
                    if (element) {
                      applyDesign(
                        moveElement(
                          design,
                          selectedElementId,
                          CENTERED_TEXT_LAYOUT.x,
                          CENTERED_TEXT_LAYOUT.y
                        )
                      );
                    }
                  }}
                >
                  Reset selected position
                </button>
              )}
            </DesignerTabPanel>
          )}

          {activeTab === TSHIRT_PANEL.COLOR && (
            <DesignerTabPanel tabId={TSHIRT_PANEL.COLOR} className="card-designer__panel">
              <div className="card-designer__toolbar">
                <button
                  type="button"
                  className="card-designer__tool"
                  onClick={() => handleEyedropper('shirt')}
                >
                  Eyedropper — shirt
                </button>
                <button
                  type="button"
                  className="card-designer__tool"
                  onClick={() => handleEyedropper('text')}
                >
                  Eyedropper — text
                </button>
              </div>

              {!isEyeDropperSupported() && (
                <p className="form-hint">
                  Eyedropper works best in Chrome or Edge. Use swatches on other browsers.
                </p>
              )}

              {colorPickError && (
                <p className="card-designer__error" role="alert">
                  {colorPickError}
                </p>
              )}

              <div>
                <p className="form-label">Shirt color</p>
                <div className="tshirt-designer__swatches">
                  {SHIRT_COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      aria-label={preset.label}
                      title={preset.label}
                      onClick={() => handleShirtColorChange(preset.hex)}
                      className={`tshirt-designer__swatch${
                        design.shirtColor === preset.hex ? ' tshirt-designer__swatch--active' : ''
                      }`}
                      style={{ backgroundColor: preset.hex }}
                    />
                  ))}
                </div>
              </div>

              <div className="card-designer__color-grid">
                <ColorPickerField
                  label="Shirt color"
                  value={design.shirtColor}
                  onChange={handleShirtColorChange}
                />
                <ColorPickerField
                  label="Text / graphic color"
                  value={design.textColor}
                  onChange={handleTextColorChange}
                />
              </div>

              {contrastWarning && (
                <p className="card-designer__warning" role="status">
                  {contrastWarning}
                </p>
              )}
            </DesignerTabPanel>
          )}

          {activeTab === TSHIRT_PANEL.PRINT && (
            <DesignerTabPanel
              tabId={TSHIRT_PANEL.PRINT}
              className="card-designer__panel card-designer__print-options"
            >
              <div className="form-field">
                <label htmlFor="front-print-placement" className="form-label">
                  Front print placement
                </label>
                <select
                  id="front-print-placement"
                  className="form-input"
                  value={design.frontPrintPlacement}
                  onChange={(event) => {
                    const frontPrintPlacement = event.target.value;
                    applyDesign({ ...design, activeView: 'front', frontPrintPlacement });
                    announce('Front print placement updated');
                  }}
                >
                  {FRONT_PRINT_PLACEMENT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="back-print-placement" className="form-label">
                  Back print placement
                </label>
                <select
                  id="back-print-placement"
                  className="form-input"
                  value={design.backPrintPlacement}
                  onChange={(event) => {
                    const backPrintPlacement = event.target.value;
                    applyDesign({ ...design, activeView: 'back', backPrintPlacement });
                    announce('Back print placement updated');
                  }}
                >
                  {BACK_PRINT_PLACEMENT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="print-colors" className="form-label">
                  Print colors
                </label>
                <select
                  id="print-colors"
                  className="form-input"
                  value={design.printColors}
                  onChange={(event) =>
                    applyDesign({ ...design, printColors: event.target.value })
                  }
                >
                  {PRINT_COLOR_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </DesignerTabPanel>
          )}

          {activeTab === TSHIRT_PANEL.IMAGE && (
            <DesignerTabPanel tabId={TSHIRT_PANEL.IMAGE} className="card-designer__panel">
              <div className="card-designer__toolbar">
                <button type="button" className="card-designer__tool" onClick={handleFlip}>
                  Flip shirt
                </button>
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
                  aria-label="Upload t-shirt graphic"
                  onChange={handleFileSelect}
                />
              </div>

              {selectedElementId &&
                viewElements.find((item) => item.id === selectedElementId)?.type === 'image' && (
                  <button
                    type="button"
                    className="card-designer__tool"
                    onClick={() => {
                      applyDesign(removeElement(design, selectedElementId));
                      setSelectedElementId(null);
                    }}
                  >
                    Remove selected graphic
                  </button>
                )}

              {uploadError && (
                <p className="card-designer__error" role="alert">
                  {uploadError}
                </p>
              )}
            </DesignerTabPanel>
          )}

          {activeTab === TSHIRT_PANEL.SIZES && (
            <DesignerTabPanel tabId={TSHIRT_PANEL.SIZES} className="card-designer__panel">
              <fieldset className="form-field card-designer__sides">
                <legend className="form-label">Fit</legend>
                <div className="card-designer__sides-choices">
                  {FIT_OPTIONS.map((option) => (
                    <label key={option.id} className="card-designer__sides-choice">
                      <input
                        type="radio"
                        name="tshirt-fit"
                        value={option.id}
                        checked={design.fit === option.id}
                        onChange={() => handleFitChange(option.id)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="form-field">
                <legend className="form-label">Sizes</legend>
                <div className="tshirt-designer__size-chips">
                  {availableSizes.map((size) => (
                    <label
                      key={size}
                      className={`tshirt-designer__size-chip${
                        design.selectedSizes[0] === size ? ' tshirt-designer__size-chip--active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="tshirt-size"
                        className="sr-only"
                        checked={design.selectedSizes[0] === size}
                        onChange={() => applyDesign(selectSize(design, size))}
                      />
                      {size}
                    </label>
                  ))}
                </div>
                <p className="form-hint">Per-size quantities are set on the Qty tab.</p>
              </fieldset>

              <SizeChart fit={design.fit} />
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

    </div>
  );
};

export default TshirtDesigner;