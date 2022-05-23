import { Injectable } from "@nestjs/common";
import { readFile, readdir } from "fs";

@Injectable()
export class DirectoriesService {
  constructor() {
    this.pathName = "";
    this.isDirectory = false;
    this.fileContent = "";
  }

  getFileContent(filePathName = "", callback) {
    readFile(filePathName, "utf-8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.error("file does not exist");
        }
        callback(err, null);
      }

      try {
        callback(null, data);
      } finally {
      }
    });
  }

  walkDirs(path, callback) {
    readdir(path, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      let directoriesResp = {
        dirInfo: [],
        fileInfo: []
      };

      try {
        files.forEach((dir) => {
          if (dir.isDirectory() && dir.name.charAt(0) !== ".") {
            directoriesResp["dirInfo"].push({ directory: dir.name, directoryPathName: path + "/" + dir.name });
          } else if (dir.name.charAt(0) !== ".") {
            directoriesResp["fileInfo"].push({ fileName: dir.name, filePathName: path + "/" + dir.name });
          }
        });
        callback(null, directoriesResp);
      } finally {
      }
    });
  }
}
