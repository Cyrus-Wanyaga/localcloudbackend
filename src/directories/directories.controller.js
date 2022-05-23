import { Controller, Get, Bind, Req, Res, Post, HttpCode, Dependencies } from "@nestjs/common";
import { DirectoriesService } from "./directories.service";

@Controller("directories")
@Dependencies(DirectoriesService)
export class DirectoriesController {
  constructor(directoriesService) {
    this.directoriesService = directoriesService
  }

  @Get()
  @Bind(Req(), Res())
  loadDirectories(request, response) {
    return response.status(200).send({ res: '' });
  }

  @Post()
  @Bind(Req(), Res())
  readFileContents(req, res) {
    let file = req.body.path;
    this.directoriesService.getFileContent(file, function(err, response) {
      if (err) throw err
      res.status(200).send({ statusMessage: "Configured successfully", fileData: response});
    })
  }

  @Post('/getDirectories')
  @Bind(Req(), Res())
  getDirectoryMappings(req, res){
    let directory = req.body.path === "" ? process.env.HOME : req.body.path
    this.directoriesService.walkDirs(directory, function(err, response) {
      if (err) throw err
      res.status(200).json({statusMessage: "Files Loaded", directories: response})
    })
  }
}
