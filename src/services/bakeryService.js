import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebaseService";
import { COLLECTION } from "@/constants/databaseConstants";
import { milletsAndMoreData } from "@/utility/demoDataUtil";

const getBakeryData = async (bakeryName) => {
  let bakeryDetails = [];
  const q_bakeryDetail = query(
    collection(db, COLLECTION.BAKERY_PROFILE_DOC),
    where("bakeryName", "==", bakeryName)
  );
  const queryBakeryDetailSnap = await getDocs(q_bakeryDetail);
  queryBakeryDetailSnap.forEach((bakery) => {
    bakeryDetails.push(bakery.data());
  });
  return bakeryDetails.at(0);
};

const updateProducts = async (request) => {
  const { bakeryName, payload } = request;
  try {
    await setDoc(doc(db, COLLECTION.BAKERY_PROFILE_DOC, bakeryName), {
      ...milletsAndMoreData,
      products: payload,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export { getBakeryData, updateProducts };
