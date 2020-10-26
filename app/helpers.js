const fs = require("fs");
const sharp = require("sharp");

module.exports = {
  // Formata resposta do banco
  formatResponseSequelize: async (request) => {
    try {
      const post = await request;
      return {
        status: "success",
        data: post.dataValues,
      };
    } catch (error) {
      return {
        status: "error",
        data: error.message,
      };
    }
  },
  // Formata resposta sucesso
  formatResponseOk: (response) => {
    return { status: "success", data: response };
  },
  // Formata resposta com erro
  formatResponseError: (response) => {
    return { status: "error", data: response };
  },
  // Gera nome pra url
  generateUrlName: (str) => {
    const original =
      "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    const replace =
      "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let newStr = "";
    for (i = 0; i < str.length; i++) {
      let change = false;
      for (a = 0; a < original.length; a++) {
        if (str.substr(i, 1) == original.substr(a, 1)) {
          newStr += replace.substr(a, 1);
          change = true;
          break;
        }
      }
      if (change == false) {
        newStr += str.substr(i, 1);
      }
    }
    newStr = newStr.replace(/ /g, "-").toLowerCase();
    return newStr;
  },
  compressImage: (path, size) => {
    const newPath = path.split(".")[0] + ".jpg"; 

    return sharp(path)
      .resize(size)
      .toFormat("jpeg")
      .jpeg({
        quality: 80,
      })
      .toBuffer()
      .then((data) => {
        // Deletando o arquivo antigo
        // O fs.acess serve para testar se o arquivo realmente existe, evitando bugs
        fs.access(path, (err) => {
          // Um erro significa que a o arquivo não existe, então não tentamos apagar
          if (!err) {
            //Se não houve erros, tentamos apagar
            fs.unlink(path, (err) => {
              // Não quero que erros aqui parem todo o sistema, então só vou imprimir o erro, sem throw.
              if (err) console.log(err);
            });
          }
        });

        // Agora vamos armazenar esse buffer no novo caminho
        fs.writeFile(newPath, data, (err) => {
          if (err) {
            // Já aqui um erro significa que o upload falhou, então é importante que o usuário saiba.
            return "";
          }
        });

        // Se o código chegou até aqui, deu tudo certo, então vamos retornar o novo caminho
        return newPath;
      });
  },
};
