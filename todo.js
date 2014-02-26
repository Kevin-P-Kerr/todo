var Card = function (txt) {
  this.text = txt;
  this.done = false;
  this.defered = false;
};

function CardCtrl ($scope) {
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
        console.log("HJI");
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
    console.log(x);
    x.forEach(function (i) {
      console.log(i);
      $scope.cards.unshift(i);
    });
  };

  $scope.addCard = function () {
    $scope.cards.push(new Card($scope.newCardText));
    $scope.newCardText = '';
    $scope.getCurrentCards();
  };
};
