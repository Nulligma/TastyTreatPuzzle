cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cc.fovea.cordova.purchase.InAppBillingPlugin",
    "file": "plugins/cc.fovea.cordova.purchase/www/store-android.js",
    "pluginId": "cc.fovea.cordova.purchase",
    "clobbers": [
      "store"
    ]
  },
  {
    "id": "cordova-plugin-admobpro.AdMob",
    "file": "plugins/cordova-plugin-admobpro/www/AdMob.js",
    "pluginId": "cordova-plugin-admobpro",
    "clobbers": [
      "window.AdMob"
    ]
  },
  {
    "id": "cordova-plugin-play-games-services.PlayGamesServices",
    "file": "plugins/cordova-plugin-play-games-services/www/play-games-services.js",
    "pluginId": "cordova-plugin-play-games-services",
    "clobbers": [
      "window.plugins.playGamesServices"
    ]
  },
  {
    "id": "cordova-plugin-nativestorage.mainHandle",
    "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
    "pluginId": "cordova-plugin-nativestorage",
    "clobbers": [
      "NativeStorage"
    ]
  },
  {
    "id": "cordova-plugin-nativestorage.LocalStorageHandle",
    "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
    "pluginId": "cordova-plugin-nativestorage"
  },
  {
    "id": "cordova-plugin-nativestorage.NativeStorageError",
    "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
    "pluginId": "cordova-plugin-nativestorage"
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cc.fovea.cordova.purchase": "7.2.5",
  "cordova-plugin-extension": "1.5.4",
  "cordova-plugin-admobpro": "2.37.2",
  "cordova-plugin-play-games-services": "1.1.0",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-nativestorage": "2.3.2"
};
// BOTTOM OF METADATA
});