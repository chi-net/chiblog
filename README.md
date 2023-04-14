# chiblog

## A light, concise and pluggable blogging platform frontend

## Fast-use (Deploy in Docker/Podman):

> Tips: [Podman](https://podman.io/) is strongly recommended rather than Docker, futher information: <https://blog.chihuo2104.dev/posts/comment-fixed-and-hi-podman> (Chinese Simplified Only).

```shell
podman run -dit -p 3000:3000 --name my-chiblog-container -e NUXT_CHIBLOG_CONFIG_TYPE=production -e NUXT_CHIBLOG_CONFIG_URL=myurl ghcr.io/chi-net/chiblog
```

use docker instead:

```shell
docker run -dit -p 3000:3000 --name my-chiblog-container -e NUXT_CHIBLOG_CONFIG_TYPE=production -e NUXT_CHIBLOG_CONFIG_URL=myurl ghcr.io/chi-net/chiblog
```

And `.env` file is also available to define an environment varible.

If you want to try dev version, just add a `dev` tag!

## This application is licensed under [GPL-3](LICENSE) license.

## More Documentation is in <https://chiblog.chinet.work/>