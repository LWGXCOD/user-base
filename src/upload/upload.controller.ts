import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'static', 'images'),
        filename: (req, file, cb) => {
          const uploadedFileName =
            file.originalname.split('.')[0] + Date.now().toString();
          cb(null, `${uploadedFileName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException(`file not uploaded (wrong type)`);
    return file.filename;
  }
}
