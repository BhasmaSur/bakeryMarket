import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseService";
import { COLLECTION } from "@/constants/databaseConstants";

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

export { getBakeryData };
