import { SplashScreen, router, useNavigation, useRootNavigation, useRootNavigationState, useSegments } from 'expo-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectLoggedIn, selectProfile, setProfile } from '../../redux/slices/userSlice';

const AuthContext = React.createContext(null);
SplashScreen.preventAutoHideAsync()

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user,loggedIn, rootNavigation, navigation) {
  const segments = useSegments();


  
  React.useEffect(() => {
    // hacky fix ...
    if (rootNavigation?.key){
      console.warn(segments)
      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
         !loggedIn
      ) {
        // Redirect to the sign-in page.
        router.replace('/landing');
      } else if (user && loggedIn) {
        // Redirect away from the sign-in page.
        router.replace('/home');
      }else{
        router.replace('/landing');
      }
    }

    const timer = setTimeout(() => {
      SplashScreen.hideAsync()
    }, 1500)

  }, [user, segments, rootNavigation, loggedIn]);
}

export function Provider(props) {
  const profile = useSelector(selectProfile)
  const loggedIn = useSelector(selectLoggedIn)
  const dispatch = useDispatch()
  const rootNavigationState = useRootNavigationState();
  const navigation = useNavigation()

  
  


  useProtectedRoute(profile,loggedIn, rootNavigationState, navigation);

  return (
    <AuthContext.Provider>
      {props.children}
    </AuthContext.Provider>
  );
}
