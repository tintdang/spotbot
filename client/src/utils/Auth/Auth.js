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
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  //Sending user to the auth0 website
  login() {
    this.auth0.authorize();
  }

  logout() {
    // clear id token and expiration
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  setSession(authResult) {
    // Set the time the Access Token will expire
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    // Set their tokens at local storage
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // set the time that the id token will expire at
  }
}