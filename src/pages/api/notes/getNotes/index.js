import { getAllData } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const data = await getAllData("note");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}