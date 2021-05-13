const uploadFile = require("../middleware/upload.middleware");
var randomize = require('randomatic');

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const uploadBasic = async (req, res) => {
    req.headers.filename = await randomize('a0', 6)
    try {
      await uploadFile(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ data: "Please select the file!" });
      }

      var k = new Worker('./service/parseStore.js', { workerData: { "fileName":req.headers.filename} })
      res.status(200).send({
        success: "true",
        data: "Processing"
      });
    } catch (err) {
      res.status(500).send({
        data: `Could not upload the file: ${req.headers.fileName}. ${err}`,
      });
    }
  };

  module.exports = {
    uploadBasic,
  };