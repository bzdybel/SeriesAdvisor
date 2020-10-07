import React from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { IconContext } from 'react-icons';

export const Arrow = ({ direction, onArrowClick, hideContent }) => {
    return !hideContent ? (
        <div className="home-lower-section-movie-container__arrow">
            <IconContext.Provider
                value={{
                    className: `home-lower-section-movie-container__arrow-icon home-lower-section-movie-container__arrow--${direction}`,
                }}
            >
                {direction === 'previous' ? (
                    <IoIosArrowDropleft onClick={onArrowClick} />
                ) : (
                    <IoIosArrowDropright onClick={onArrowClick} />
                )}
            </IconContext.Provider>
        </div>
    ) : null;
};
