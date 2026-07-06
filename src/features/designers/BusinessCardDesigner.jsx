/**
 * BusinessCardDesigner.jsx — Tabbed card canvas: text on card, colors, print, and image panels.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import BusinessCardCanvas from './businessCard/BusinessCardCanvas';
import ImageCropDialog from './businessCard/ImageCropDialog';
import {
  BUSINESS_CARD_PANEL,
  BUSINESS_CARD_WIZARD_TABS,
  PAPER_OPTIONS,
  TEXT_FIELDS,
} from './businessCard/constants';
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
  resizeElement,
  updateElement,
  updateSide,
} from './businessCard/designModel';
import { ColorPickerField, DesignerTabBar, DesignerTabPanel } from '../../ui/components/primitives';
import {
  hasLowContrast,
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

const SIDES_OPTIONS = [
  { id: 'single', label: 'Single-sided' },
  { id: 'double', label: 'Double-sided' },
];

const CANVAS_PANELS = new Set([
  BUSINESS_CARD_PANEL.TEXT,
  BUSINESS_CARD_PANEL.COLOR,
  BUSINESS_CARD_PANEL.IMAGE,
]);

const mapProductChoices = (product, optionId, fallback) => {
  const option = product?.options?.find((item) => item.id === optionId);
  if (!option?.choices?.length) {
    return fallback;
  }

  return option.choices.map((choice) => ({
    id: choice.value,
    label: choice.label,
  }));
};

const getOptionLabel = (choices, value, defaultLabel) =>
  choices.find((option) => option.id === value)?.label || defaultLabel;

const BusinessCardDesigner = ({
  design: rawDesign,
  onChange,
  product,
  activePanel,
  activeTab: activeTabProp,
  onTabChange,
  tabs = BUSINESS_CARD_WIZARD_TABS,
  designErrors = [],
  quantityPanel = null,
  schedulePanel = null,
}) => {
  const activeTab = activeTabProp || activePanel || BUSINESS_CARD_PANEL.TEXT;
  const design = normalizeBusinessCardDesign(rawDesign);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const [uploadError, setUploadError] = useState('');
  const [contrastWarning, setContrastWarning] = useState('');
  const [cropSource, setCropSource] = useState(null);
  const [pendingFileName, setPendingFileName] = useState('');
  const [liveMessage, setLiveMessage] = useState('');
  const fileInputRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && !rawDesign?.version) {
      initializedRef.current = true;
      onChange({
        ...createDefaultBusinessCardDesign(),
        ...rawDesign,
      });
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

  const existingTextFields = new Set(
    sideState.elements.filter((el) => el.type === 'text').map((el) => el.fieldKey)
  );

  const paperChoices = useMemo(
    () => mapProductChoices(product, 'paperType', PAPER_OPTIONS),
    [product]
  );
  const sidesChoices = useMemo(
    () => mapProductChoices(product, 'sides', SIDES_OPTIONS),
    [product]
  );

  const showCanvas = CANVAS_PANELS.has(activeTab);
  const usesCardTabs = Boolean(onTabChange);

  return (
    <div className="card-designer" aria-label="Business card designer">
      <p className="sr-only" aria-live="polite">
        {liveMessage}
      </p>

      <div
        className={`card-designer__stage${
          usesCardTabs ? ' card-designer__stage--tabbed' : ''
        }`}
      >
        {usesCardTabs && (
          <DesignerTabBar
            tabs={tabs}
            activeTab={activeTab}
            onChange={onTabChange}
            className="designer-tab-bar--on-card"
          />
        )}

        <div className="card-designer__stage-body">
          {showCanvas && (
            <div className="card-designer__canvas">
              <BusinessCardCanvas
                design={design}
                frontState={frontState}
                backState={backState}
                selectedElementId={selectedElementId}
                previewLabel={buildCardPreviewLabel(design)}
                onFlip={handleFlip}
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

          {activeTab === BUSINESS_CARD_PANEL.TEXT && (
            <DesignerTabPanel tabId={BUSINESS_CARD_PANEL.TEXT} className="card-designer__panel">
          <p className="card-designer__callout">
            Tap a field on the card to type. Use the grip to move, corner handle to resize.
          </p>

          <div className="form-field">
            <label htmlFor="add-text-field" className="form-label">
              Add text field
            </label>
            <select
              id="add-text-field"
              defaultValue=""
              className="form-input"
              onChange={(event) => {
                if (event.target.value) {
                  applyDesign(addTextElement(design, event.target.value));
                  event.target.value = '';
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
          </div>

          {sideState.elements
            .filter((element) => element.type === 'text')
            .map((element) =>
              fieldErrors[element.id] ? (
                <p key={element.id} className="form-error">
                  {fieldErrors[element.id]}
                </p>
              ) : null
            )}

          {selectedElementId && (
            <button
              type="button"
              className="card-designer__link"
              onClick={() => {
                const element = sideState.elements.find((item) => item.id === selectedElementId);
                if (element) {
                  applyDesign(moveElement(design, selectedElementId, 8, element.y));
                }
              }}
            >
              Reset selected position
            </button>
          )}
            </DesignerTabPanel>
          )}

          {activeTab === BUSINESS_CARD_PANEL.COLOR && (
            <DesignerTabPanel tabId={BUSINESS_CARD_PANEL.COLOR} className="card-designer__panel">
          <div className="card-designer__color-grid">
            <ColorPickerField
              label="Background"
              value={sideState.backgroundColor}
              onChange={(nextColor) => handleSideColorChange('backgroundColor', nextColor)}
            />
            <ColorPickerField
              label="Text color"
              value={sideState.textColor}
              onChange={(nextColor) => handleSideColorChange('textColor', nextColor)}
            />
          </div>

          {contrastWarning && (
            <p className="card-designer__warning" role="status">
              {contrastWarning}
            </p>
          )}
            </DesignerTabPanel>
          )}

          {activeTab === BUSINESS_CARD_PANEL.PRINT && (
            <DesignerTabPanel
              tabId={BUSINESS_CARD_PANEL.PRINT}
              className="card-designer__panel card-designer__print-options"
            >
          <div className="form-field">
            <label htmlFor="paper-type" className="form-label">
              Paper
            </label>
            <select
              id="paper-type"
              className="form-input"
              value={design.paperType || paperChoices[0]?.id || ''}
              onChange={(event) => {
                const paperType = event.target.value;
                applyDesign({ ...design, paperType });
                announce(`Paper set to ${getOptionLabel(paperChoices, paperType, 'paper')}`);
              }}
            >
              {paperChoices.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="form-field card-designer__sides">
            <legend className="form-label">Sides</legend>
            <div className="card-designer__sides-choices">
              {sidesChoices.map((option) => (
                <label key={option.id} className="card-designer__sides-choice">
                  <input
                    type="radio"
                    name="card-sides"
                    value={option.id}
                    checked={(design.sides || sidesChoices[0]?.id) === option.id}
                    onChange={() => {
                      applyDesign({ ...design, sides: option.id });
                      announce(`Card set to ${option.label}`);
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
            </DesignerTabPanel>
          )}

          {activeTab === BUSINESS_CARD_PANEL.IMAGE && (
            <DesignerTabPanel tabId={BUSINESS_CARD_PANEL.IMAGE} className="card-designer__panel">
          <div className="card-designer__toolbar">
            <button type="button" className="card-designer__tool" onClick={handleFlip}>
              Flip card
            </button>
            <button
              type="button"
              className="card-designer__tool"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload image
            </button>
            <button type="button" className="card-designer__tool" onClick={handleCopyFrontToBack}>
              Copy front to back
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              className="sr-only"
              aria-label="Upload card image"
              onChange={handleFileSelect}
            />
          </div>

          <p className="card-designer__callout">
            Upload a logo or graphic, then drag and resize it on the card.
          </p>

          {uploadError && (
            <p className="card-designer__error" role="alert">
              {uploadError}
            </p>
          )}
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

export default BusinessCardDesigner;