var testCase = require('nodeunit').testCase;

var FAKE_VENT_CONFIG = {
  cmd: "ventrilo_status",
  host: "localhost",
  port: "50000"
};
var ventstatus = require("../index")(FAKE_VENT_CONFIG);

var VENT_TEST_DATA = {
  info: {
          name: "Test Vent Server",
          phonetic: "test vent server",
          comment: "test vent server comment",
          auth: "1",
          maxclients: "10",
          voicecodec: "3,Speex",
          voiceformat: "32,32 KHz%2C 16 bit%2C 10 Qlty",
          uptime: "10",
          platform: "WIN32",
          version: "3.0.3.C"
        },
  channels: [
    "Test Channel 1",
    "Test Channel 2"
    ],
  clients: [
    "TestUser1",
    "TestUser2"
    ]
};
var FULL_DATA = "NAME: "+ VENT_TEST_DATA.info.name +"\n" +
                "PHONETIC: "+ VENT_TEST_DATA.info.phonetic +"\n" +
                "COMMENT: "+ VENT_TEST_DATA.info.comment+"\n" +
                "AUTH: "+ VENT_TEST_DATA.info.auth +"\n" +
                "MAXCLIENTS: "+ VENT_TEST_DATA.info.maxclients+"\n" +
                "VOICECODEC: "+ VENT_TEST_DATA.info.voicecodec +"\n" +
                "VOICEFORMAT: "+ VENT_TEST_DATA.info.voiceformat +"\n" +
                "UPTIME: "+ VENT_TEST_DATA.info.uptime +"\n" +
                "PLATFORM: "+ VENT_TEST_DATA.info.platform +"\n" +
                "VERSION: "+ VENT_TEST_DATA.info.version +"\n" +
                "CHANNELCOUNT: 2\n" +
                "CHANNELFIELDS: CID,PID,PROT,NAME,COMM\n" +
                "CHANNEL: CID=632,PID=0,PROT=0,NAME="+ VENT_TEST_DATA.channels[0] +",COMM=\n" +
                "CHANNEL: CID=633,PID=0,PROT=0,NAME="+ VENT_TEST_DATA.channels[1] +",COMM=\n" +
                "CLIENTCOUNT: 2\n" +
                "CLIENTFIELDS: ADMIN,CID,PHAN,PING,SEC,NAME,COMM\n" +
                "CLIENT: ADMIN=0,CID=632,PHAN=0,PING=46,SEC=2294,NAME="+ VENT_TEST_DATA.clients[0] +",COMM=\n" +
                "CLIENT: ADMIN=0,CID=632,PHAN=0,PING=93,SEC=2263,NAME="+ VENT_TEST_DATA.clients[1] +",COMM=";

module.exports = testCase({
  "parse full data": function(assert) {
    assert.expect(14);
    ventstatus.parseResults(null, FULL_DATA, null, function(err, data) {
      for (var p in data.info) {
        assert.equal(data.info[p], VENT_TEST_DATA.info[p]);
      }

      for (var i = 0; i < data.channels.length; i++) {
        assert.equal(data.channels[i], VENT_TEST_DATA.channels[i]);
      }

      for (var i = 0; i < data.clients.length; i++) {
        assert.equal(data.clients[i], VENT_TEST_DATA.clients[i]);
      }

      assert.done();
    });

  },
  "parse empty data": function(assert) {
    assert.expect(1);
    ventstatus.parseResults(null, "", null, function(err, data) {
      assert.equal(err, "No data returned.");
      assert.done();
    });
  }
});
