"use server";
import clientPromise from "../configs/db";

export const getUserByEmail = async (email: string) => {
  const client = await clientPromise;
  const db = client.db("APIWink");
  const user = await db.collection("User").findOne({ email });
  return user;
};

export const saveUserToDb = async (email: string, wallet_address: string) => {
  const client = await clientPromise;
  const db = client.db("APIWink");
  const res = await db.collection("User").insertOne({
    role: "custodian",
    email,
    wallet_address,
  });
  return res;
};
