# Interview Scheduler

Visit the site here: https://cwarcup-scheduler.netlify.app/

![add a new interview](https://media1.giphy.com/media/sbHxhcKB5u0dOShr8d/giphy.gif?cid=790b761130ae393294c4930341ec615271dfe457fa55c5eb&rid=giphy.gif&ct=g)

![edit and delete interview](https://media4.giphy.com/media/SoWhvnUSodl33Enzab/giphy.gif?cid=790b761153836182d06dcec74af6c3a273e4e511becd1cf2&rid=giphy.gif&ct=g)

![error handling](https://media3.giphy.com/media/J0HeTRmhwTV0MG8zHz/giphy.gif?cid=790b761107fd10605e71eac984bbabd421cd31cf950ade61&rid=giphy.gif&ct=g)


## Setup

Install dependencies with `npm install`.

All development done on Node v15.14.0

## Running Webpack Development Server

```sh
npm start
```

## Tools used:
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/docs/intro)
- [classNames](https://github.com/JedWatson/classnames#usage)
- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)
- [Storybook](https://storybook.js.org/)
- [Prop-Types](https://reactjs.org/docs/typechecking-with-proptypes.html)
## Server Endpoints

- GET [/api/days](https://lhl-scheduler-server.herokuapp.com/api/days/)
- GET [/api/appointments](https://lhl-scheduler-server.herokuapp.com/api/appointments/)
- GET [/api/interviewers](https://lhl-scheduler-server.herokuapp.com/api/interviewers/)
- PUT /api/appointments/:id
- DELETE /api/appointments/:id

Server repository can be found here: [scheduler-api](https://github.com/Cwarcup/scheduler-api)