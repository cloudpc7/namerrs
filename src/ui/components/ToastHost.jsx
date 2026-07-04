/**
 * ToastHost.jsx — Global toast notifications driven by Redux ui slice.
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast, selectToast } from '../../redux/slices/ui.slice';
import { TOAST_TYPE } from '../../redux/constants/ui.constants';

const TOAST_CLASSES = {
  [TOAST_TYPE.SUCCESS]: 'toast toast--success',
  [TOAST_TYPE.ERROR]: 'toast toast--error',
  [TOAST_TYPE.INFO]: 'toast toast--info',
};

const ToastHost = () => {
  const dispatch = useDispatch();
  const toast = useSelector(selectToast);

  useEffect(() => {
    if (!toast.message) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      dispatch(clearToast());
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [toast.id, toast.message, dispatch]);

  if (!toast.message) {
    return null;
  }

  return (
    <div role="status" aria-live="polite" className="toast-host">
      <div className={TOAST_CLASSES[toast.type] || TOAST_CLASSES[TOAST_TYPE.INFO]}>
        {toast.message}
      </div>
    </div>
  );
};

export default ToastHost;