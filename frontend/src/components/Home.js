import React from "react";
import bank from '../img/bank.png';

export const Home = () => {
  return (
    <div className='home'>
      <div className="header">
        <h1><img id='logo' src={bank} alt='logo' width='50px' height='50px' />Barclays Bank</h1>
        <h3>Bank Securely 24x7</h3>
      </div>
      <div className="about" id="about">
        <p>Pan-India Network | Enhanced Services| Pleasant experience</p>
        <p>
          Welcome to the world of internet banking from Barclays Bank, where you
          can transform the way you use banking services.
        </p>
        <p>
          Internet banking from Barclays Bank helps you carry out a variety of
          banking transactions and access an extensive range of features right
          from where you are, with just a few clicks. With our internet banking
          solutions, you can now bid goodbye to long queues and unwanted delays.
          Barclays Bank Internet Banking facility is secure, simple and easy to
          use. Use it today to enjoy an unparalleled online banking experience.
          Accessing our internet banking portal is simple. You can login with
          your User ID and Password to make use of the many online banking
          features we offer. Our Internet banking portal provides personal
          banking services that gives you complete control over all your banking
          demands online.
        </p>
        <h3>Do's</h3>
        <ul>
          <li>
            Change your password assigned by the bank immediately on accessing
            Internet Banking Services for the first time.
          </li>
          <li>
            Keep your user-id and password confidential and do not reveal them
            to anyone else.
          </li>
          <li>
            Memorize your user-id and password and do not record them anywhere
            else.
          </li>
          <li>
            Always check the URL address on the address bar of internet browser.
            This should begin with "https"; the letter 's' at the end of "https"
            means 'secured'.
          </li>
          <li>
            Install a comprehensive firewall/antivirus/anti-spyware software
            package on your computer & update the same on a regular basis.
          </li>
        </ul>
        <h3>Dont's</h3>
        <ul>
          <li>
            Don’t use link in an email message to log in. For logging in
            internet banking always use official website.
          </li>
          <li>
            Don’t let any unauthorized person have access to your computer or
            leave the computer unattended while using Internet Banking Services.
          </li>
          <li>
            Don’t disclose/reveal your personal or confidential information to
            anyone over email/SMS/phone call.
          </li>
          <li>
            Don’t enter login or other sensitive information in any pop up
            window.
          </li>
          <li>
            Avoid accessing Internet banking accounts from cyber cafes or shared
            PCs.
          </li>
        </ul>
      </div>

      <div className="footer">
        <p>Copyright &copy; 2020. All rights reserved.</p>
      </div>
    </div>
  );
};
