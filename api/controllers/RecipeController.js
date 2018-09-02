const fs = require('fs-extra');
const path = require('path');
const http = require('http');

const recipeFileLocation = path.join(__dirname, '../../file-store/recipe-list.json');
console.log(recipeFileLocation);
/**
 * FileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {


  add: function(req, res) {
    const data = req.body;
    data.id = parseInt(Math.random() * 1000);
    fs.readJson(recipeFileLocation, (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          error: err.message
        });
      } else {
        result.recipes.push(data);
        fs.writeJSON(recipeFileLocation, result, {
          spaces: '\t'
        } ,(err) => {
          if (err) {
            console.log(err);
            res.json({
              error: err.message
            });
          } else {
            res.json(data);
          }
        })
      }
    })
  },
  list: function(req, res) {
    fs.readJSON(recipeFileLocation, (err, data) => {
      if(err) {
        console.log(err);
        res.json({
          error: err.message
        });
      } else {
        res.json(data);
      }
    })
  },
  update: function(req, res) {
    fs.readJSON(recipeFileLocation, (err, data) => {
      if(err) {
        console.log(err);
        res.json({
          error: err.message
        });
      } else {
        const recipes = data.recipes;
        recipes.forEach(element => {
          if (element.id == req.params.id) {
            element = Object.assign(element, req.body);
          }
        });
        fs.writeJson(recipeFileLocation, { recipes }, { spaces: '\t' }, (err) => {
          if (err) {
            console.log(err);
            res.json({
              error: err.message
            });
          } else {
            res.json({ recipes });
          }
        })
      }
    })
  }

  // upload: function(req, res) {

  //   if (req.method === 'GET')
  //     return res.json({ 'status': 'GET not allowed' });

  //   var uploadFile = req.file('uploadFile');
  //   console.log(uploadFile);
  //   uploadFile.upload(function onUploadComplete(err, files) {
  //     //  Files will be uploaded to .tmp/uploads
  //     if (err) return res.serverError(err);
  //     console.log(files);
  //     res.json({ status: 200, file: files });
  //   });
  // },

  // getFiles: function(req, res) {
  //   fs.readdir(uploadLocation, function(err, files) {
  //     if (err) {
  //       res.json({
  //         'message': err
  //       });
  //     }
  //     else {
  //       // res.json({
  //       //   'data': files
  //       // });
  //       res.render('pages/file_list.ejs', {data: files,clickHandler:"func1();"});
  //     }
  //   });
  // },

  // download2 : function (req,res) {
  //   res.send('user' + req.query.id);
  //   // var req = http.get(uploadLocation + '/c4b02d33-59af-4422-873b-ca9d2b67ea12.pdf');

  // //   fs.copyFile(uploadLocation + '/c4b02d33-59af-4422-873b-ca9d2b67ea12.pdf', 'destination.pdf', (err) => {
  // //     if (err) {throw err;}
  // //   console.log('source.txt was copied to destination.txt');
  // // });
  // }
};
