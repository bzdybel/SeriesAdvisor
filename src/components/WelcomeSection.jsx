import React, { useEffect } from 'react';
import Typical from 'react-typical';
const pageTitle = 'Movie Advisor';

export const WelcomeSection = ({
    showButton,
    onButtonClick,
    movieContainerRef,
}) => {
    useEffect(() => {
        document.body.style.overflow = showButton ? 'scroll' : 'hidden';
    }, [showButton]);
    return (
        <div className="home_wrapper-upper-section">
            <div className="home-wrapper-upper-section__animation">
                {!showButton ? (
                    <Typical
                        steps={[
                            `Welcome on ${pageTitle} site  🤝`,
                            1000,
                            `Before we find movie for you let's choose couple of your favourite movies`,
                            10000,
                        ]}
                        loop={1}
                        wrapper="div"
                    />
                ) : (
                    <div>
                        Before we find movie for you let's choose couple of your
                        favourite movies
                    </div>
                )}
            </div>
            <div className="home-wrapper-upper-section-button__wrapper">
                {showButton ? (
                    <button
                        type="submit"
                        className="home-button"
                        onClick={() => {
                            onButtonClick(movieContainerRef);
                        }}
                    >
                        I'm ready!
                    </button>
                ) : null}
            </div>
        </div>
    );
};
