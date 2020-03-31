const express = require("express");
const app = express();
const port = 3005;
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(__dirname));

app.all('/api/reservations/*', (req, res) => {
  proxy.web(req, res, {
    target: "http://18.188.118.62:3001"
  });
});

app.all('/api/recommendations', (req, res) => {
  proxy.web(req, res, {
    target: "http://3.17.207.249:3004"
  });
});

app.all('/api/*', (req, res) => {
  proxy.web(req, res, {
    target: "http://18.188.118.62:3002"
  });
});

app.all('/*', (req, res) => {
  proxy.web(req, res, {
    target: "http://3.17.207.249:3003"
  });
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));