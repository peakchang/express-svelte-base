import express from "express";
import { sql_con } from "../lib/set_db.js";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
import multer from "multer";
import fs from 'fs'
moment.tz.setDefault("Asia/Seoul");

const boardRouter = express.Router();


const upload = multer({
    storage: multer.diskStorage({
        // 경로를 설정
        destination(req, file, cb) {
            console.log('일단 폴더 체크 부터!!!');
            const now = moment().format('YYMMDD')
            console.log(now);
            try {
                fs.readdirSync(`uploads/editor/editor${now}`);
            } catch (error) {
                fs.mkdirSync(`uploads/editor/editor${now}`);
            }
            cb(null, `uploads/editor/editor${now}`);
        },
        filename(req, file, cb) {
            //파일명 설정
            cb(null, file.originalname);
        },
    }),
    // limits: { fileSize: 10 * 1024 * 1024 },
});

boardRouter.post('/uploads', upload.single('editorimg'), (req, res, next) => {
    console.log('post는 되는거야?!?!?!?');
    console.log(req.body);
    console.log(req.file);

    const now = moment().format('YYMMDD')

    var baseUrl = req.protocol + '://' + req.get('host') + '/editor_img/editor' + now + '/' + req.file.filename;

    res.json({ baseUrl })
})


boardRouter.use('/test_form', (req, res, next) => {
    console.log('post는 되는거야?!?!?!?');
    console.log(req.body);
    // console.log(req.file);
    res.json({ message: 'gogogogo' })
})

export { boardRouter }