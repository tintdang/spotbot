// src/Auth/Auth.js
import auth0 from 'auth0-js';
// https://auth0.com/blog/react-router-4-practical-tutorial/

// Creates an Auth class that will be used in index.js
export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'tindang.auth0.com',
      audience: 'https://tindang.auth0.com/userinfo',
      clientID: 'bYJ74HYs2ygdgG1lEuTIlmruxiOn7cDX',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  // handleAuthentication is set as a promise to have other functions run after.
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        console.log(authResult);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  //Sending user to the auth0 website
  login() {
    this.auth0.authorize();
  }

  logout() {
    // clear id token and expiration
    this.idToken = null;
    this.expiresAt = null;
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }
}