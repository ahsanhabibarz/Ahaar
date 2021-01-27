export const placeOrder = (order, history) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    //console.log(order);

    firestore
      .collection("orders")
      .doc()
      .set({
        order: {
          ...order,
          created: firebase.firestore.Timestamp.fromDate(new Date())
        }
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(order.uid)
          .collection("cart")
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              firestore
                .collection("users")
                .doc(order.uid)
                .collection("cart")
                .doc(doc.id)
                .delete()
                .then(() => {
                  history.push("/order");
                });
            });
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addRating = userData => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(userData);
    let orderid = userData.orderid;
    let rating = userData.rating;
    let userid = userData.uid;
    let calorie = userData.calorie;
    let price = userData.price;

    rating.forEach(element => {
      firestore
        .collection("foods")
        .doc(element.id)
        .collection("Rating")
        .doc(userid)
        .set({
          uid: userid,
          rate: element.rate
        })
        .then(() => {
          firestore
            .collection("foods")
            .doc(element.id)
            .get()
            .then(doc => {
              firestore
                .collection("foods")
                .doc(element.id)
                .update({
                  rating: (doc.data().rating + element.rate) / 2
                });
            });
        });
    });

    firestore
      .collection("orders")
      .doc(orderid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.exists) {
          let order = querySnapshot.data().order;
          firestore
            .collection("completed")
            .doc(orderid)
            .set({
              order: order
            });
        }
      })
      .then(() => {
        firestore
          .collection("orders")
          .doc(orderid)
          .delete();
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(userid)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.exists) {
              let data = querySnapshot.data();
              firestore
                .collection("users")
                .doc(userid)
                .update({
                  consumed: data.consumed + calorie,
                  spent: data.spent + price
                });
            }
          });
      });
  };
};

export const addToCart = userData => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(userData);

    let foodItem = userData.item[0];

    console.log(foodItem);

    firestore
      .collection("users")
      .doc(userData.uid)
      .collection("cart")
      .doc()
      .set({
        id: foodItem.id,
        name: foodItem.name,
        description: foodItem.description,
        calorie: foodItem.calorie,
        tc: foodItem.calorie,
        price: foodItem.price,
        tp: foodItem.price,
        category: foodItem.category,
        ingredients: foodItem.ingredients,
        image: foodItem.image,
        section: foodItem.section,
        res: foodItem.res,
        spice: "Medium Spicy",
        quantity: 1,
        addons: []
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const removeCartItem = (id, uid) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    console.log(id + uid);

    firestore
      .collection("users")
      .doc(uid)
      .collection("cart")
      .where("id", "==", id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          firestore
            .collection("users")
            .doc(uid)
            .collection("cart")
            .doc(doc.id)
            .delete();
        });
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };
};

export const getCartItems = userData => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(userData);

    let cartItems = [];

    firestore
      .collection("users")
      .doc(userData)
      .collection("cart")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          cartItems.push(doc.data());
        });
      })
      .then(() => {
        console.log(cartItems);

        dispatch({
          type: "SET_CART_ITEMS",
          payload: cartItems
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        dispatch({
          type: "SET_CART_ITEMS",
          payload: []
        });
      });
  };
};
