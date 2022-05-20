import { Controller, Get, Bind, Req, Res, Post, HttpCode } from "@nestjs/common";
import { readFile, readdir , opendir} from "fs";

const openFile = (filePath, callback) => {
  console.log(filePath)
  readFile(filePath, 'utf-8', (err, data) => {
    if(err){
      if(err.code === 'ENOENT') {
        console.error('file does not exist')
      }

      callback(err, null)
    }

    try {
      callback(null, data)
    } finally {
    }
  })
};

const walkDirs = (path, callback) => {
  readdir(path, {withFileTypes: true},(err, files) => {
    if(err) throw err

    let directoriesResp = {
      dirInfo: [],
      fileInfo: []
    }

    try {
      files.forEach((dir) => {
        if(dir.isDirectory() && dir.name.charAt(0) !== ".") {
          directoriesResp['dirInfo'].push({directory: dir.name, directoryPathName: path + "/" + dir.name})
        } else if (dir.name.charAt(0) !== "."){
          directoriesResp['fileInfo'].push({fileName: dir.name, filePathName: path + "/" + dir.name})
        }
      })
      callback(null, directoriesResp)
    } finally {
    }
  })
}

@Controller("directories")
export class DirectoriesController {
  @Get()
  @Bind(Req(), Res())
  loadDirectories(request, response) {
    return response.status(200).send({ res: '' });
  }

  @Post()
  @Bind(Req(), Res())
  readFileContents(req, res) {
    let file = req.body.path;
    openFile(file, function(err, response) {
      if (err) throw err
      console.log(response)
      res.status(200).send({ statusMessage: "Configured successfully", fileData: response});
    })
  }

  @Post('/getDirectories')
  @Bind(Req(), Res())
  getDirectoryMappings(req, res){
    let directory = req.body.path === "" ? process.env.HOME : req.body.path
    walkDirs(directory, function(err, response) {
      if (err) throw err
      res.status(200).json({statusMessage: "Files Loaded", directories: response})
    })
  }
}
