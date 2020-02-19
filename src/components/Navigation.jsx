import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { set } from 'mongoose';
import { handleNotification } from './Notifications';

export const Navigation = props => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div
            className="navigation-wrapper"
            style={{ minHeight: isExpanded ? '4rem' : '8rem' }}
        >
            <div
                className="navigation-logo"
                style={{ minHeight: isExpanded ? '4rem' : '8rem' }}
            >
                <span role="img" aria-label="movie">
                    🎥
                </span>
            </div>

            <ul
                className="navigation-list"
                style={{ minHeight: isExpanded ? '4rem' : '8rem' }}
            >
                <li
                    style={{ display: isExpanded ? 'none' : 'block' }}
                    className="navigation-list__item"
                    onClick={() =>
                        handleNotification(
                            'This functionality is not implemented yet!',
                            'danger'
                        )
                    }
                >
                    Random Movie
                </li>
                <li
                    style={{ display: isExpanded ? 'none' : 'block' }}
                    className="navigation-list__item"
                    onClick={() =>
                        handleNotification(
                            'This functionality is not implemented yet!',
                            'danger'
                        )
                    }
                >
                    Top Rating
                </li>
                <li
                    style={{ display: isExpanded ? 'none' : 'block' }}
                    className="navigation-list__item"
                    onClick={() =>
                        handleNotification(
                            'This functionality is not implemented yet!',
                            'danger'
                        )
                    }
                >
                    Profile
                </li>
                <li
                    style={{ display: isExpanded ? 'none' : 'block' }}
                    className="navigation-list__item"
                    onClick={() =>
                        handleNotification(
                            'This functionality is not implemented yet!',
                            'danger'
                        )
                    }
                >
                    Log out
                </li>
                <IconContext.Provider
                    value={{
                        className: isExpanded
                            ? `navigation-list__item navigation-list__item--hamburger  navigation-list__item-hamburger--wrapped`
                            : `navigation-list__item   navigation-list__item--hamburger`,
                    }}
                >
                    <IoIosMenu onClick={() => setIsExpanded(!isExpanded)} />
                </IconContext.Provider>
            </ul>
        </div>
    );
};
