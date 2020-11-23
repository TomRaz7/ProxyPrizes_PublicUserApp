(function(window, undefined) {
  var dictionary = {
    "8708ba50-db7d-41a2-bcdc-79c9ac24f8f9": "PostScrollList",
    "dbc73dc2-68d1-40d9-a070-6b666484af73": "AccountCreation",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "LoginScreen",
    "3d1b601b-428a-4d30-bd6b-0740b0ac56cc": "ProfileScreen",
    "65cb755a-a433-44b8-b09b-fb3d37285eb5": "Forgot password",
    "c3fcd473-d4e8-4c7f-b0bb-174acc394226": "MapView",
    "63267606-e872-4ec9-9fb1-a65e08a77c1a": "CreatePost",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);