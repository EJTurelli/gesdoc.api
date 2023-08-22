import multer from "multer";

const pdfFilter = (req: any, file: any, cb: any) => {
  if (file.originalname && file.originalname.match(/\.pdf$/)) {
    return cb(null, true);
  }
  return cb(new Error('Only pdf files are allowed!'), false);
};

const maxSize = 2 * 1024 * 1024;

export const upload = multer({
  fileFilter: pdfFilter,
  limits: { fileSize: maxSize, files: 1 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.NODE_PATH + `/static/files/${req.query.cuil}`);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  })
}).single('file');