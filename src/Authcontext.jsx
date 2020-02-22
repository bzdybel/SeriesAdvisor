import React from 'react';
import * as Async from 'react-async';
import { fetchProfile } from './api';
import ReactLoading from 'react-loading';
const Authcontext = React.createContext(null);
export const useProfile = () => {
    return React.useContext(Authcontext);
};

export const Authprovider = props => {
    const [userProfile, setUserProfile] = React.useState(null);
    const profileState = Async.useAsync({
        promiseFn: fetchProfile,
        onResolve: data => {
            setUserProfile(data);
        },
    });
    if (profileState.isPending) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ReactLoading
                    type={'spinningBubbles'}
                    height={'10%'}
                    width={'10%'}
                    color={'rgba(0, 0, 0, 0.9'}
                />
            </div>
        );
    }

    return <Authcontext.Provider {...props} value={userProfile} />;
};
