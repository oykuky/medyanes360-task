import { updateDataByAny } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { title, content } = req.body;

    if (!id || !title || !content) {
      return res.status(400).json({
        success: false,
        error: "Eksik bilgi. Lütfen gerekli alanları doldurun"
      });
    }

    const updatedNote = await updateDataByAny("note", 
      { id: id },
      { title, content }
    );

    if (updatedNote.error) {
      throw new Error(updatedNote.error);
    }

    return res.status(200).json({
      success: true,
      message: "Not güncellendi",
      data: updatedNote
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export default handler;