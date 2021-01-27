export const loginAdmin = (userData, history) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    if (userData.email === "habiiib4@gmail.com") {
      firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then((profile) => {
          const user = {
            uid: profile.user.uid,
          };
          localStorage.setItem("adminid", profile.user.uid);

          dispatch({
            type: "SET_ADMIN",
            payload: user,
          });
        })
        .catch((err) => {
          console.log(err);

          dispatch({
            type: "SET_ADMIN",
            payload: null,
          });
        });
    }
  };
};

export const addFood = (foodItem) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(foodItem);

    firestore
      .collection("foods")
      .doc()
      .set({
        name: foodItem.name,
        description: foodItem.description,
        calorie: foodItem.calorie,
        price: foodItem.price,
        category: foodItem.category,
        ingredients: foodItem.ingredients,
        image: foodItem.image,
        section: foodItem.section,
        res: foodItem.restaurant,
        area: foodItem.area,
        rating: 0,
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const confirmOrder = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(id);

    firestore
      .collection("orders")
      .doc(id)
      .update({
        "order.status": "Confirmed",
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
};

export const getRestaurants = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let cartItems = [];

    console.log("aaaa");

    firestore
      .collection("restaurants")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          cartItems.push(doc.data());
        });
      })
      .then(() => {
        dispatch({
          type: "SET_RESTAURANTS",
          payload: cartItems,
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        dispatch({
          type: "SET_RESTAURANTS",
          payload: [],
        });
      });
  };
};
