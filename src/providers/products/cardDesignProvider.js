import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCardStock, setCardColor, setInfo, setFont, fetchGoogleFonts } from '../../redux/cardDesignSlice';
import { createContext } from 'react';

export const cardDesignContext = createContext();
const CardDesignProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { cardDesign, isLoading, errMsg, fonts } = useSelector(state => state.cardDesign);
    const { cardStock, cardColor, info, font } = cardDesign;
    
    useEffect(() => {
        dispatch(fetchGoogleFonts());
    },[dispatch]);


    const handleCardStock = (value) => {
        dispatch(setCardStock(value))
    };

    const handleCardColor = (color) => {
        dispatch(setCardColor(color.hex));
    };

    const handleInfo = (info) => {
        dispatch(setInfo(info));
    };

    const handleSelectedFont = (font) => {
        dispatch(setFont(font));
    }


  return (
    <cardDesignContext.Provider value={{ 
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
        }}>
      {children}
    </cardDesignContext.Provider>
  )
};

export default CardDesignProvider;