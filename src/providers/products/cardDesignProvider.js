import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCardStock, setCardColor, setInfo, setFont, fetchGoogleFonts, setError } from '../../redux/cardDesignSlice';
import { createContext } from 'react';

export const CardDesignContext = createContext();

const CardDesignProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { cardDesign, isLoading, errMsg, fonts } = useSelector((state) => state.cardDesign);
  const { cardStock, cardColor, info, font } = cardDesign;

  useEffect(() => {
    try {
      dispatch(fetchGoogleFonts());
    } catch (error) {
      dispatch(setError('Failed to initialize font loading'));
    }
  }, [dispatch]);

  const handleCardStock = (value) => {
    try {
      if (!['default', 'gloss', 'matte'].includes(value)) {
        throw new Error('Invalid card stock value');
      }
      dispatch(setCardStock(value));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleCardColor = (color) => {
    try {
      if (!color || !color.hex) {
        throw new Error('Invalid color value');
      }
      dispatch(setCardColor(color.hex));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleInfo = (field, value) => {
    try {
      dispatch(setInfo({ [field]: value }));
    } catch (error) {
      dispatch(setError('Failed to update form info'));
    }
  };

  const handleSelectedFont = (font) => {
    try {
      if (!font || typeof font !== 'string') {
        throw new Error('Invalid font value');
      }
      dispatch(setFont(font));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <CardDesignContext.Provider
      value={{
        cardStock,
        cardColor,
        info,
        font,
        handleCardStock,
        handleCardColor,
        handleInfo,
        handleSelectedFont,
        isLoading,
        errMsg,
        fonts,
      }}
    >
      {children}
    </CardDesignContext.Provider>
  );
};

export default CardDesignProvider;