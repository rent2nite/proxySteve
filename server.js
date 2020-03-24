const express = require("express");
const app = express();
const port = 3005;
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(__dirname));

app.all('/api/reservations/*', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3001"
  });
});

app.all('/api/recommendations', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3030"
  });
});

app.all('/api/*', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3000"
  });
});

app.all('/*', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3050"
  });
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));