# Content deliverer

## Run

### Docker

```bash
docker run -v {{CONTENT_PATH}}:/data/ -p {{PORT}}:3000 jakubgawlas/content-deliverer
```

- **{{CONTENT_PATH}}** path to dir with content (file `data.json` and `resources` dir)
- **{{PORT}}** port to serve application
