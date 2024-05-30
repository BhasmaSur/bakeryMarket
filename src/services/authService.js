import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseService";
import { COLLECTION } from "@/constants/databaseConstants";

const getAllUsers = async () => {
  const allUsers = [];
  const q_AllUsers = query(collection(db, COLLECTION.CREDENTIALS_DOC));
  const queryAllUserSnap = await getDocs(q_AllUsers);
  queryAllUserSnap.forEach((user) => {
    allUsers.push(user.data());
  });
  return allUsers;
};

export { getAllUsers };
