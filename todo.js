var Card = function (txt) {
  this.text = txt;
};

function CardCtrl ($scope) {
  $scope.cards = [];
  $scope.getCurrentCard = function () {
    return $scope.cards[0] || {text: "all done!"};
  };
  $scope.addCard = function () {
    $scope.cards.push(new Card($scope.newCardText));
    $scope.newCardText = '';
  };
  $scope.deferCard = function () {
    var c = $scope.cards.shift();
    $scope.cards.push(c);
    $scope.getCurrentCard();
  };
};
