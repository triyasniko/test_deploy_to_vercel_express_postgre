const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ddeoo50vt',
  api_key: '423198955495569',
  api_secret: 'UwfcmlhJQjVYykRwWvDZ3SLPvSI',
  secure: true,
});

module.exports = cloudinary;
