/**
 * ImageCropDialog.jsx — Crop uploaded image before placing on card.
 */

import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import Modal from '../../../ui/components/Modal';
import { getCroppedImage } from './cropImage';

const ImageCropDialog = ({ isOpen, imageSrc, onClose, onComplete, aspect = 1 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleApply = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    setIsSaving(true);
    try {
      const cropped = await getCroppedImage(imageSrc, croppedAreaPixels);
      onComplete(cropped);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crop image" ariaLabel="Crop image">
      <div className="relative h-64 w-full overflow-hidden rounded-lg bg-[#111111]">
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        )}
      </div>
      <label className="mt-4 block text-sm text-[#374151]" htmlFor="crop-zoom">
        Zoom
      </label>
      <input
        id="crop-zoom"
        type="range"
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
        className="w-full"
      />
      <button
        type="button"
        onClick={handleApply}
        disabled={isSaving}
        className="mt-4 w-full rounded-lg bg-[#1d4ed8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e40af] disabled:opacity-50"
      >
        {isSaving ? 'Applying…' : 'Apply crop'}
      </button>
    </Modal>
  );
};

export default ImageCropDialog;