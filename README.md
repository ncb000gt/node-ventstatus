ventstatus
=========

A module to give you data related to the status of a ventrilo server. This module uses `ventrilo_status` which is provided as part of a ventrilo server. If you'd like to use this module you'll need that and to provide a config file.


Usage
=========

      var config = require("./config");
      var ventstatus = require("ventstatus")(config);
      
      ventstatus.getStatus(function(err, data) {
        if (err) throw err;
        console.log(data);
      });
