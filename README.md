# Angular Calculator

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

The main idea is to replicate the functionality of the default desktop calculator application used in popular operation systems such as Windows or MacOS but in the web browser. The calculator has a standard options like addition, multiplication, division, substraction, power and percent. Also there is a memory function which stores every result made after clicking on equal sign button. It is placed on another route to utilize Angular Router Service and the user should navigate to it via navigation menu. Memory function uses Angular Service feature to demonstrate working with dependency injection pattern and managing data between different components which are not directly connected to each other with BehaviorSubject. To pick any saved value there is a button on every item which will get the value and redirect back to the calculator route in order to use it in the calculation. For now saved value could be the first number of the expression only. For arithmetic operations JavaScript built-in Math object is used.

## Known issues

The application has some bugs related to the wird values if you combine operations one after another. To prevent this please clear input before every new calculation. When deal with a negative numbers you should first choose the number and then the sign otherwise the final result will be incorrect.

## Development server

To start a local development server, run:

```bash
npm install
ng serve --open
```

Once the server is running, it will open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
ng test code-coverage
```

Note: Currently there are tests cases only for calculator component.

```
=============================== Coverage summary ===============================
Statements   : 78.09% ( 82/105 )
Branches     : 62.06% ( 18/29 )
Functions    : 66.66% ( 12/18 )
Lines        : 82.47% ( 80/97 )
================================================================================
