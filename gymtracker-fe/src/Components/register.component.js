import React, { Component } from "react";

export default function Register() {
  return (
    <form>
      <h3>Register</h3>
      <br/>
      <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="Choose a username" />
      </div>
      <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" />
      </div>
      <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
      </div>
      <div className="form-group">
          <label>Confirm password</label>
          <input type="password" className="form-control" placeholder="Confirm password" />
      </div>
      <button type="submit" className="btn btn-primary btn-block">Register</button>
      <p className="forgot-password text-right">
          Already registered?<a href="#">Sign in</a>
      </p>
    </form>
  );
}
