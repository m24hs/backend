const { Service } = require("../models");

// Funções auxiliares
const {
  formatResponseSequelize,
  formatResponseOk,
  formatResponseError,
  generateUrlName,
} = require("../helpers");
const Iugu = require("../services/Iugu");

// Upload de arquivos
var path = require('path')
const crypto = require('crypto');
const multer = require("multer");
let upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {      
      let ext = path.extname(file.originalname);
      callback(null, Date.now() + crypto.randomBytes(5).toString('hex') + ext);
    },
  }),
});

module.exports = {
  async index(req, res) {
    // Id
    const id = req.params.id || null;
    const where = req.query.where || null;
    const columns = req.query.columns || null;

    // Consulta
    let services = {};
    if (where === "url") {
      services = await Service.findOne({
        where: {
          url: id,
        },
        attributes: columns,
      });
    } else if (id !== null) {
      services = await Service.findByPk(id);
    } else {
      services = await Service.findAll({
        attributes: columns,
      });
    }
    res.json(services || {});
  },
  async store(req, res) {
    return upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
      {
        name: "contract",
        maxCount: 1,
      },
    ])(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.json(formatResponseError(err));
      } else if (err) {
        return res.json(formatResponseError(err));
      } else {
        const { image, contract, ...data } = req.body;
        const files = req.files;

        try {
          // Cadastra na iugu
          const responseCreatePlan = await Iugu.createPlan({
            name: data.title,
            price: data.price,
          });

          // Exibe erro
          if (responseCreatePlan.hasOwnProperty("errors")) {
            throw new Error("Não foi possivel cadastrar o plano!");
          }

          // Monta objeto de atualização
          let update = {
            ...data,
            url: generateUrlName(data.title),
            plan: responseCreatePlan.identifier,
          };

          // Grava a imagem
          if (files.image) {
            update.image = files.image[0].path;
          }

          // Contrato
          if (files.contract) {
            update.contract = files.contract[0].path;
          }

          // Grava no banco
          const response = await formatResponseSequelize(
            Service.upsert(update, { returning: true })
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
      const service = await Service.findByPk(id);

      // Deleta
      if (service) {
        service.destroy();
      }
      res.json(formatResponseOk({}));
    } catch (error) {
      return res.json(formatResponseError(error.message));
    }
  },
};
