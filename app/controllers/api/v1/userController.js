const userService = require('../../../services');
const auth = require('../../../middlewares/authentication');

module.exports = {
  async authorize(req, res, next) {
    try {
      if (req.headers.authorization === undefined) {
        throw new Error('Must register account and login first!');
      }
      // console.log('####testtt', req.headers.authorization);
      const user = await auth.authorize(req.headers.authorization);
      // console.log("####testtt", user);
      req.user = user[1];
      // console.log('####testtt', req.user);
      next();
    } catch (err) {
      res.status(err.status || 400).json({
        message: err.message,
      });
    }
  },
  async postRegister(req, res) {
    try {
      const user = await userService.api.v1.userService.register(req.user, req.body);
      // console.log("#######testtt");
      res.status(201).json({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        password: user.password,
        phone_number: user.phone_number,
        address: user.address,
        image_url: "null",
        city: user.city,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      res.status(err.status || 400).json({
        message: err.message,
      });
    }
  },

  async postLogin(req, res) {
    try {
      const user = await userService.api.v1.userService.login(req.body);
      res.status(202).json({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        access_token: user.access_token,
      });
    } catch (err) {
      res.status(err.status || 400).json({
        message: err.message,
      });
    }
  },

  async postProfile(req, res) {
    try{
      const { full_name, city, address, phone_number } = req.body;
      // console.log("####test", full_name, city, address, phone_number);
      const data = await userService.api.v1.userService.profile(req.user.id, {
        full_name: full_name,
        city: city,
        address: address,
        phone_number: phone_number,
        foto: req.image[0]
      })
      // console.log("######test", data);
      await 
      res.status(201).json({
        status: 'Success',
        id: data.id,
        full_name: data.full_name,
        email: data.email,
        phone_number: data.phone_number,
        address: data.address,
        city: data.city,
        image_url: data.foto,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async whoAmI(req, res) {
    // console.log("#######testtt oiii whoami method");
    await userService.api.v1.userService.getUser(req.user.id)
      .then((user) => {
        res.status(201).json({
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          password: user.password,
          phone_number: user.phone_number,
          address: user.address,
          image_url: user.foto,
          city: user.city,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },
};
