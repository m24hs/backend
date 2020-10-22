const { Partner } = require("../models");

// Funções auxiliares
const {
  formatResponseSequelize,
  formatResponseOk,
  formatResponseError,
} = require("../helpers");

// Upload de arquivos
var path = require("path");
const crypto = require("crypto");
const multer = require("multer");
let upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {
      let ext = path.extname(file.originalname);
      callback(null, Date.now() + crypto.randomBytes(5).toString("hex") + ext);
    },
  }),
});

module.exports = {
  async index(req, res) {
    // Id
    const id = req.params.id || null;

    // Consulta
    let partners = {};
    if (id !== null) {
      partners = await Partner.findByPk(id);
    } else {
      partners = await Partner.findAll();
    }
    res.json(partners || {});
  },
  async store(req, res) {
    return upload.single("image")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.json(formatResponseError(err));
      } else if (err) {
        return res.json(formatResponseError(err));
      } else {
        const { image, ...data } = req.body;
        const file = req.file;

        try {
          // Monta objeto de atualização
          let update = {
            ...data
          };

          // Grava a imagem
          if (file) {
            update.image = file.path;
          }

          // Grava no banco
          const response = await formatResponseSequelize(
            Partner.upsert(update, { returning: true })
          );

          return res.json(response);
        } catch (error) {
          return res.json(formatResponseError(error.message));
        }
      }
    });
  },
  async delete(req, res) {
    const id = req.params.id || null;

    try {
      if (id === null) throw new Error("ID não encontrado.");

      // Procura
      const partner = await Partner.findByPk(id);

      // Deleta
      if (partner) {
        partner.destroy();
      }
      res.json(formatResponseOk({}));
    } catch (error) {
      return res.json(formatResponseError(error.message));
    }
  },
};
