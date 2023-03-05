# Silulus Server

This project is the backend of "Graduation Announcement System for SMK Tunas Harapan Pati".
It is provided admin panel to manage announcement time and the students data.
It is also provided some API endpoint that needed by the frontend.

BTW, this project is so fucking over engineered.
Imagine using redis just to store a fucking single date string.

## Screenshoots

![Admin](https://media.discordapp.net/attachments/946013429200723989/1081608390842785822/image.png?width=640&height=360)

## Setup

```
# Clone the project
$ git clone https://github.com/BayuDC/silulus-srv.git

# Install dependecies
$ pnpm install

# Create env file
$ cp .env.example .env

# Run the server
$ pnpm start:dev
```

## Deploy

```
# Just use docker bruh
$ docker compose up

# Sync the database
$ docker compose up gen
```

## Related

- The frontend of this project: https://github.com/BayuDC/silulus
