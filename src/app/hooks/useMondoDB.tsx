import clientPromise from "../configs/db";

export const useMondoDB = () => {
  const getUserByAddress = async (address: string) => {
    const client = await clientPromise;
    const db = client.db("apiwink");
    const user = await db.collection("users").findOne({ address });
    return user;
  };

  return { getUserByAddress };
};
