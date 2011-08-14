var exec = require('child_process').exec;

function usage() {
  return "Usage:" +
    "\tConfiguration options:" +
    "\t\tcmd - /path/to/ventrilo_status" +
    "\t\thost - vent.host.com" +
    "\t\tport - vent port";
}

function VentStatus(config) {
  if (!(config.host) || !(config.port) || !(config.cmd)) {
    throw usage();
  }
  if (!(config.code)) config.code = 2;

  this.config = config;
}

module.exports = function(config) {
  return (new VentStatus(config));
}

VentStatus.prototype.parseResults = function(err, stdout, stderr, cb) {
  var data = {
    channels: [],
    clients: [],
    info: {
      name: null,
      comment: null,
      auth: null,
      maxclients: null,
      voicecodec: null,
      voiceformat: null,
      uptime: null,
      platform: null,
      version: null
    }
  };

  if (err) return cb(err);
  if (stderr) return cb(stderr);
  if (!stdout) return cb("No data returned"); 

  stdout.split('\n').forEach(function(line) {
    var m = line.match(/([^:]*):/);
    if (!m || m.length === 0) return;
    var prop = m[1];
    if (prop) {
      prop = prop.toLowerCase();
      switch(prop) {
        case "name":
        case "comment":
        case "phonetic":
        case "auth":
        case "maxclients":
        case "voicecodec":
        case "voiceformat":
        case "uptime":
        case "platform":
        case "version":
          data.info[prop] = line.substring(prop.length + 2);
          break;
        case "channel":
        case "client":
          prop = prop + 's';
          var name = line.match(/NAME=([^,]*),/)[1];
          data[prop].push(name);
          break;
        default:
          break;
      }
    }
  });
  
  return cb(null, data);
}

VentStatus.prototype.getStatus = function(cb) {
  var self = this;
  exec(self.config.cmd + " -c" + self.config.code + " -t" + self.config.host + ":" + self.config.port, function(err, stdout, stderr) {
    return self.parseResults(err, stdout, stderr, cb);
  });
}
