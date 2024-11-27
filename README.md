# EasyStay

![EasyStay logo](https://github.com/Light2Night/Booking/blob/main/Logo_EasyStay.svg)

## Applied technologies

### Back-End:
- **ASP.NET Core**
- **Entity Framework Core**
- **ASP.Net Core Identity**
- **SignalR**

### Front-End:
- **React**
- **Vite**

### Databases:
- **PostgreSQL**

### Other technologies:
- **Docker**
- **Nginx**
- **Git**

## About the Application
EasyStay is a website that provides users with the ability to search for accommodations, add properties to their favorites, and make bookings. It also offers a built-in messaging system that allows users to communicate with realtors.

## Features:
* For Users:
  - Search for available properties.
  - Add properties to their favorites.
  - Book accommodations.
  - Message realtors directly through the platform.

* For Realtors:
  - Register properties for rent.
  - Manage registered properties (update information, available quantity, etc.).
  - Respond to user messages.

* For Administrators:
  - Manage platform users (block or view user details).
  - Oversee and manage platform data (countries, cities, and other shared settings).

## Deployment in Docker

### Front-End Environment Configuration

Before building the front-end Docker image, make sure to create and configure a `.env.docker` file in the `Booking-front` directory.  
You can find an example of the necessary data in the `.env.docker.example` file. This file provides an example of the API address needed for deploying and running the application locally on Windows.

### Back-End Environment Configuration

To configure the necessary environment variables for the back-end, you can mount an `appsettings.Docker.json` file as a volume.  
For example, you can add the following volume configuration to your `docker-compose.yml` file:

```yaml
volumes:
  - ./volumes/api/appsettings.Docker.json:/app/appsettings.Docker.json
```

Now, in the `volumes/api/` directory, create a file named `appsettings.Docker.json` and populate it with your desired configuration settings.
You can refer to the `appsettings.json` file in the `EasyStay\EasyStay.WebApi` directory for examples of available variables.

### Docker Deployment Process
Navigate to the root directory (where the `docker-compose.yml` file is located).

Build the Docker images using the following command:
```bash
docker compose build
```

Run the project using the docker-compose command:
```bash
docker compose up -d
```

To remove the containers, execute the following command:
```bash
docker compose down
```
