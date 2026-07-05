/**
 * eyedropper.js — Browser EyeDropper helper with graceful fallback.
 */

export const isEyeDropperSupported = () =>
  typeof window !== 'undefined' && 'EyeDropper' in window;

export const pickColorFromScreen = async () => {
  if (!isEyeDropperSupported()) {
    return {
      color: null,
      error: 'Eyedropper is not supported in this browser. Use the color swatches instead.',
    };
  }

  try {
    const dropper = new window.EyeDropper();
    const result = await dropper.open();
    return { color: result.sRGBHex, error: null };
  } catch {
    return { color: null, error: null };
  }
};