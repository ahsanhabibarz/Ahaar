export const loginUser = (userData, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user;
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((profile) => {
        user = {
          uid: profile.user.uid,
        };

        localStorage.setItem("uid", profile.user.uid);

        dispatch({
          type: "SET_PROFILE",
          payload: user,
        });

        history.push("/");
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then((profileData) => {
            console.log(profileData.data());
            localStorage.setItem("udata", JSON.stringify(profileData.data()));
            dispatch({
              type: "SET_DATA",
              payload: profileData.data(),
            });
          });
      })
      .catch((err) => {
        console.log(err);

        dispatch({
          type: "SET_PROFILE",
          payload: null,
        });
      });
  };
};

export const signupUser = (userData, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(userData);

    let user;

    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((profile) => {
        if (profile) {
          user = {
            uid: profile.user.uid,
          };

          firestore
            .collection("users")
            .doc(profile.user.uid)
            .set({
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              budget: userData.budget,
              calorie: userData.calorie,
              address: userData.address,
              consumed: 0,
              spent: 0,
              uid: profile.user.uid,
              updated: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
              localStorage.setItem("uid", profile.user.uid);
              dispatch({
                type: "SET_PROFILE",
                payload: user,
              });

              history.push("/");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then((profileData) => {
            localStorage.setItem("udata", JSON.stringify(profileData.data()));
            dispatch({
              type: "SET_DATA",
              payload: profileData.data(),
            });
          });
      })
      .catch((err) => {
        dispatch({
          type: "SET_PROFILE",
          payload: null,
        });
      });
  };
};

export const logoutUser = (history) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("uid");
        localStorage.removeItem("udata");
        dispatch({
          type: "SET_PROFILE",
          payload: null,
        });
        dispatch({
          type: "SET_DATA",
          payload: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateUserData = (userData, udata) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(userData)
      .get()
      .then((profileData) => {
        if (profileData.exists) {
          if (
            profileData.data().updated.toDate().getDate() < new Date().getDate()
          ) {
            firestore
              .collection("users")
              .doc(userData)
              .update({
                consumed: 0,
                updated: firebase.firestore.Timestamp.fromDate(new Date()),
              });
          }
        }
      });

    if (udata !== null) {
      firestore.collection("users").doc(userData).update({
        name: udata.name,
        address: udata.address,
        phone: udata.phone,
        budget: udata.budget,
        calorie: udata.calorie,
      });
    }
  };
};
