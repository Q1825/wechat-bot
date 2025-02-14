const express = require('express');
   const crypto = require('crypto');

   const app = express();
   const token = 'your_token'; // 替换为你的 Token

   app.get('/wechat', (req, res) => {
     const { signature, timestamp, nonce, echostr } = req.query;

     // 验证签名
     const arr = [token, timestamp, nonce].sort();
     const str = arr.join('');
     const sha1 = crypto.createHash('sha1');
     const result = sha1.update(str).digest('hex');

     if (result === signature) {
       res.send(echostr);
     } else {
       res.status(403).send('Verification failed');
     }
   });

   app.listen(3000, () => {
     console.log('Server is running on port 3000');
   });
