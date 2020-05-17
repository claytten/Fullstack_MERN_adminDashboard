import React from 'react';
import LogInForm from './LogInForm';

const LoginCard = () => {
  return (
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">Welcome to
            <span className="account__logo"> Dash
              <span className="account__logo-accent">DEV</span>
            </span>
          </h3>
        </div>
        <LogInForm
          onSubmin
          form="log_in_form"
        />
      </div>
    </div>
  );
};

export default LoginCard;
