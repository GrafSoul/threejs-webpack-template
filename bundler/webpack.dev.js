const path = require("path");
const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const portFinderSync = require("portfinder-sync");
const os = require("os");

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
}

const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

module.exports = merge(commonConfiguration, {
  stats: "errors-warnings",
  mode: "development",
  devServer: {
    host: "local-ip",
    port: portFinderSync.getPort(8080),
    open: true,
    https: false,
    allowedHosts: "all",
    hot: false,
    watchFiles: ["src/**", "static/**"],
    static: {
      watch: true,
      directory: path.join(__dirname, "../static"),
    },
    client: {
      logging: "none",
      overlay: true,
      progress: false,
    },
    onAfterSetupMiddleware: function (devServer) {
      const port = devServer.options.port;
      const https = devServer.options.https ? "s" : "";
      const localIp = getLocalIpAddress();
      const domain1 = `http${https}://${localIp}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;

      console.log(
        `Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(
          domain2
        )}`
      );
    },
  },
});
