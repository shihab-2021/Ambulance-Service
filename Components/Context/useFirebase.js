import { useEffect, useState } from "react";
import initializeFirebase from "../Firebase/firebase.init";
import swal from "sweetalert";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getIdToken,
} from "firebase/auth";
import { useRouter } from "next/router";

// initialize firebase app
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();

  const auth = getAuth();

  // Signup user with Email Password
  const createUser = (email, password, userData) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        fetch("https://rescue-reach-server.vercel.app/users-data", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              console.log("Register successfully");
              form.reset();
            }
          })
          .catch((error) => console.error(error));
        swal("Create Account Successful!", {
          icon: "success",
        });
        setIsLoading(false);
        router.replace("/");
      })
      .catch((error) => {
        setAuthError(error.message);
        swal(`${error.message}`, {
          icon: "error",
        });
        console.log(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // Login user with Email Password
  const loginUser = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        swal("Login Successful!", {
          icon: "success",
        });
        setIsLoading(false);
        router.replace("/");
      })
      .catch((error) => {
        setAuthError(error.message);
        swal(`${error.message}`, {
          icon: "error",
        });
        console.log(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // user observation
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
        console.log("Please login");
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  useEffect(() => {
    fetch(`https://rescue-reach-server.vercel.app/users-data/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, [user, user?.email, auth, router]);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
        // setLoading(false); // Stop loading if there's an error
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
    return () => {
      // Clean up the geolocation watch on component unmount
      navigator.geolocation.clearWatch(watchId);
    };
  }, [user, user?.email, userInfo]);
  useEffect(() => {
    // Function to fetch active user data from the backend
    const fetchActiveUsers = async () => {
      if (location && user?.email) {
        fetch("https://rescue-reach-server.vercel.app/activeUsers-data", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...location,
            email: user?.email,
          }),
        }).then(() => console.log("send again"));
      }
    };
    // Fetch active users initially
    fetchActiveUsers();
    // Fetch active users every 5 seconds
    const interval = setInterval(fetchActiveUsers, 8000);
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [location]);

  // For Logout
  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };
  return {
    user,
    isLoading,
    userInfo,
    authError,
    loginUser,
    logout,
    token,
    createUser,
    location,
  };
};

export default useFirebase;
