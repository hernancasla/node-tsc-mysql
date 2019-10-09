
// import userService = require("../services/user.service");
// const userService = await import("../services/user.service");
import * as models from "../models";
const User = models.default.User;

export async function validateLogin(email: string, password: string) {
  if (email && password) {
    const user = await User.findOne({where: {email}});
    return ((user !== undefined) && (user.password === password));
  } else { return false; }
}
/*const multer = require('multer');
const XLSX = require('xlsx');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname ) //Appending .jpg
    }
  })
  var upload = multer({ storage: storage });

  app.post('/upload', upload.single('file'), function (req, res) {
    res.json({file:req.file});
  });

  app.get('/process' , function (req, res) {
    var workbook = XLSX.readFile('./uploads/'+req.query.fileName);
    var first_sheet_name = workbook.SheetNames[0];
  var address_of_cell = 'B2';

  // Get worksheet
  var worksheet = workbook.Sheets[first_sheet_name];

  // Find desired cell
    var desired_cell = worksheet[address_of_cell];

    // Get the value
    var desired_value = (desired_cell ? desired_cell.v : undefined);

    console.log(XLSX.utils.sheet_to_json(worksheet))

    res.json({value:desired_value});
  });
*/
