const webPush = require("web-push");

const vapidKeys = {
    "publicKey": "BIHnqPnf--VUz9vk9WIW2j0Y1fh-474GM5TzF4jEZcYoh2JkKtzgKQEccoGYReZcs5Qv4M-vnQrua-J9ohRwU4M",
    "privateKey": "SlkH4oN3QfdHZBnUcO_moZMiOmsByywf6xH6MdtpaIk"
}

webPush.setVapidDetails(
    "mailto:afrinalhakim29@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e1oKoMTR9Rs:APA91bFFyzvynYZC2m7XIHbDFJ0taEBpMtEeFa9R81HhOLc0nSLIif3w6CAjmS281hZqi1IuPl-_6-pNxnghLMkDCojgRF_KQuxBhCiegExJfbwfpOPI_7qx2jVo3xZ7muE8ikwU_CMJ",
    "keys": {
        "p256dh": "BEx9vmOuyqV3u/Qecnq3gJobrt7CyjBYvJRbZa1i6Iq3vmKPTK6PQz906aeDdUQdpzSMOpOg5o9gDH9Yg8q9EsM=",
        "auth": "94qxj1LEkn+ZtcUUaHAJPA=="
    }
}

const payload = "Aplikasi Menggunakan Notifikasi Payload";

const options = {
    gcmAPIKey: "958148198452",
    TTL: 60
}

webPush.sendNotification(pushSubscription, payload, options);