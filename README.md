# Sample Angular 18 

## Description

This project is a web application designed to manage and configure various settings related to moulds. It features a user-friendly interface with components like HeaderComponent for navigation and MouldSettingsComponent for managing mould settings. The application uses services for data handling and guards for route protection, ensuring a secure and efficient user experience.

## Prerequisites
Ensure you have the following installed before setting up the project:

- Node.js – Download 
- Angular CLI (Version 18 or later) – Install using:
```npm install -g @angular/cli  ```


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/AmaltasTT/sample_angular18_app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd sample_angular18_app
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    ng serve
    ```
2. Open your browser and navigate to `http://localhost:4200`.

## Features

- Login => 
```The LoginComponent is a crucial part of the application, providing a secure and user-friendly way for users to authenticate. By integrating form validation, error handling, and routing, it ensures a smooth login experience. ```
- Mould Settings/ Landing page =>
```The MouldSettingsComponent is designed to manage and configure the settings related to moulds within the application. This component allows users to view, update, and save various settings associated with moulds, such as dimensions, material types, and operational parameters. It provides a user-friendly interface for interacting with these settings and ensures that any changes are validated and saved correctly.```
- Services =>
```Services in Angular are singleton objects that provide a way to share data and functionality across different parts of an application. They are typically used for tasks such as fetching data from a server, handling user input, or managing application state. Services are a fundamental part of Angular's dependency injection system, which allows them to be easily injected into components, other services, or guards. ```
- Guards =>
```Guards in Angular are used to control access to routes within an application. They can be used to check if a user is authenticated, has the necessary permissions, or meets other criteria before allowing access to a route. Guards are implemented as services that implement specific guard interfaces provided by Angular.```

## Project Structure  
```sample_angular18_app/
│-- src/
│   │-- app/
│   │   │-- components/  # UI components like header, sidebar
│   │   │-- services/    # Services for API calls & data management
│   │   │-- guards/      # Route protection logic
│   │   │-- models/      # TypeScript interfaces/models for data
│   │   │-- pages/       # Major app pages (login, settings)
│   │   └── app.module.ts
│-- angular.json         # Angular project configuration  
│-- package.json         # Project dependencies  
│-- README.md            # Documentation 
```

