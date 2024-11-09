import { createNewData } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadi." });
  }

  if (req.method === "POST") {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: "Eksik bilgi. Lütfen gerekli alanları doldurun",
        });
      }
      const data = req.body;
      console.log("Gonderilen data:", data);
      const note = await createNewData("note", data);

      return res.status(200).json({
        success: true,
        message: "not ekleme basarili",
        data: note,
      });
    } catch (error) {
      console.error("Hata:", error);
      return res.status(500).json({
        status: error.status || 500,
        error: error.message || "Bir hata olustu.",
      });
    }
  } else {
    return res.status(500).json({ error: "Yanlıs istek." });
  }
};

export default handler;
