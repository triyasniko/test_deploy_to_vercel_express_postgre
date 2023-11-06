const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../../../repositories');
require('dotenv').config;

const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (err) return reject(err);
      return resolve(encryptedPassword);
    });
  });
}

function createToken(payload, ACCESS_TOKEN_SECRET, expiresIn) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, expiresIn);
}

module.exports = {
  async register(user, reqBody) {
    
    try {
      // console.log("#######testtt req body", reqBody);
      if (!reqBody.email) { 
        throw { status: 422, message: 'email field cannot empty' }; 
      }
      if (!reqBody.password) { 
        throw { status: 422, message: 'password field cannot empty' }; 
      }
      if ( await userRepository.api.v1.userRepository.findByName(reqBody.full_name)) { 
        throw { 
          status: 400, 
          message: 'Name already exists' }; 
        }
      if (await userRepository.api.v1.userRepository.findByEmail(reqBody.email)) { 
        throw { 
          status: 400, 
          message: 'Email already exists' }; 
        }
      reqBody.password = await encryptPassword(reqBody.password);
      
      // console.log("#######testtt req body", reqBody);
      const user = await userRepository.api.v1.userRepository.save({
        full_name: reqBody.full_name,
        email: reqBody.email,
        password: reqBody.password,
        phone_number: reqBody.phone_number,
        address: reqBody.address,
        city: reqBody.city
      });
      // console.log("#######testtt user", user);
      return user;
    } catch (err) {
      throw err;
    }
  },
  async login(reqBody) {
    try {
      const user = await userRepository.api.v1.userRepository.findByEmail(reqBody.email);
      // console.log("####testtt", reqBody.email);
      let comparePassword = '';
      if (user != null) {
        comparePassword = await bcrypt.compareSync(reqBody.password, user.password);
      } else {
        comparePassword = false;
      }
      if (!reqBody.email) {
        throw { status: 422, message: 'email field cannot empty' };
      } else if (!reqBody.password || reqBody.password === 'password') {
        throw { status: 422, message: 'password field cannot empty' };
      } else if (user == null) {
        throw { status: 401, message: 'email or password are wrong' };
      } else if (!comparePassword) {
        throw { status: 401, message: 'email or password are wrong' };
      } else {
        // return token and user data
        return {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          access_token: createToken({
            id: user.id,
            full_name: user.full_name,
            email: user.email
          }, process.env.ACCESS_TOKEN_SECRET || 'Token', {
            expiresIn: '24h',
          }),
        };
        
      }
      
    } catch (err) {
      // console.log("###testtt");
      throw err;
    }
  },

  async profile(id, reqBody) {
    return await userRepository.api.v1.userRepository.addProfil(id, reqBody);
  },

  async get(id) {
    return await userRepository.api.v1.userRepository.findById(id);
  },

  async getUser(id) {
    // console.log("####testtt", id);
    return await userRepository.api.v1.userRepository.findUser(id);
  },
};
