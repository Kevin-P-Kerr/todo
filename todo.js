var Card = function (txt) {
  this.text = txt;
  this.done = false;
  this.defered = false;
};

var readCards;

var createReadCards = function ($scope) {
  readCards = function (cards) {
    $scope.cards = cards;
    $scope.getCurrentCards();
    $scope.loaded =true;
    var p = document.getElementById("loaded");
    p.value = "loaded";
    p.text = "";
  };
};

function CardCtrl ($scope,$http) {
  $scope.cards = [];
  $scope.currentCards = [];
  $scope.getCurrentCards = function () {
    var i =0;
    var ii = 3 - $scope.currentCards.length
    var c;
    for (; i<ii; i++) {
      var c = $scope.cards.pop();
      if (!c) {
        break;
      }
      $scope.currentCards.push(c);
    }
  };
  $scope.filterCurrentCards = function (val) {
    var i =0;
    var ii = $scope.currentCards.length;
    var tmp = [];
    var ttmp = [];
    var t;
    for (; i<ii; i++) {
      t = $scope.currentCards.pop();
      if (t[val]) {
        t[val] = false;
        ttmp.push(t);
      }
      else {
       tmp.push(t);
      }
    }
    for (ii=tmp.length,i=0;i<ii;i++) {
      $scope.currentCards.push(tmp[i]);
    }
    $scope.getCurrentCards();
    return ttmp;
  };
  
  $scope.finishCard = function () {
    $scope.filterCurrentCards("done");
  };
  
  $scope.deferCard = function () {
    var x = $scope.filterCurrentCards("defered"); 
    x.forEach(function (i) {
      $scope.cards.unshift(i);
    });
  };

  $scope.addCard = function () {
    $scope.cards.push(new Card($scope.newCardText));
    $scope.newCardText = '';
    $scope.getCurrentCards();
  };

  $scope.loadCards = function () {
    if (!$scope.existingViewName || !$scope.existingViewName.length) {
      return;
    }
    $scope.cards =[];
    $scope.currentCards = [];
    $http.get("/stacks/"+$scope.existingViewName).then(function (res) { $scope.cards = res.data.reverse();  $scope.getCurrentCards();});
    (function () {
      var s = document.getElementById('saver');
      s.value = $scope.existingViewName;
    })();
    $scope.existingViewName = '';
  };

  $scope.sendCards = function () {
    if (!$scope.saveName || !$scope.saveName.length) {
      return;
    }
    var t = [];
    $scope.currentCards.forEach(function (c) {
      t.push(new Card(c.text));
    });
    $scope.cards.forEach(function (c) {
      t.push(c);
    });
    var c = JSON.stringify(t);
    c = encodeURIComponent(c);
    var px = document.createElement('IMG');
    px.width = 0;
    px.height = 0;
    px.src = "/save?cards="+c+'&view='+$scope.saveName;
    document.body.appendChild(px);
  };

  $scope.init = false;

  if (!$scope.init) {
    $scope.getCurrentCards();
    createReadCards($scope);
    $scope.init = true;
  }
};
