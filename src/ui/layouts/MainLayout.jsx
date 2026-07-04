/**
 * MainLayout.jsx — Shared page shell with header, footer, and content bootstrap.
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HttpErrorBanner from '../components/HttpErrorBanner';
import OffcanvasHost from '../components/OffcanvasHost';
import { fetchContent, selectContentError, selectContentStatus } from '../../redux/slices/content.slice';
import { openCart } from '../../redux/slices/design.slice';
import { setHttpError, setProductSearch } from '../../redux/slices/ui.slice';
import { CONTENT_STATUS } from '../../redux/constants/content.constants';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectContentStatus);
  const contentError = useSelector(selectContentError);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    if (status === CONTENT_STATUS.FAILED && contentError) {
      dispatch(
        setHttpError({
          httpStatus: null,
          errorMessage: contentError,
          code: 'CONTENT_LOAD_FAILED',
          retryable: true,
        })
      );
    }
  }, [status, contentError, dispatch]);

  const handleSearch = (query) => {
    dispatch(setProductSearch(query));
  };

  return (
    <div className="site-shell">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:ring-[var(--color-focus-ring)]"
      >
        Skip to main content
      </a>
      <HttpErrorBanner />
      <Header onCartClick={() => dispatch(openCart())} onSearch={handleSearch} />
      <div id="main-content" className="site-shell__main">
        {children}
      </div>
      <Footer />
      <OffcanvasHost />
    </div>
  );
};

export default MainLayout;