ventstatus
=========

A module to give you data related to the status of a ventrilo server. This module uses `ventrilo_status` which is provided as part of a ventrilo server. If you'd like to use this module you'll need that and to provide a config file.


Config
=========

      var config = {
        cmd: </path/to/ventrilo_status>,
        host: <ventrilo.host.com>,
        port: <ventrilo port>
      };

You can also add in code which can be set to 1 or 2.
* 1 provides cursory details.
* 2 provides channel and user details.


Usage
=========

      var ventstatus = require("ventstatus")(config);
      
      ventstatus.getStatus(function(err, data) {
        if (err) throw err;
        console.log(data);
      });
