
app.controller("MainController", function($scope){

  $scope.mentettAdat = window.localStorage.getItem('emberek');

  if ($scope.mentettAdat!=null && $scope.mentettAdat!='') {
    $scope.emberek = angular.fromJson(window.localStorage.getItem('emberek'));
  }
  else {
    $scope.emberek = [
      { id: 0, nev: 'Benjámin', eletkor:23, telefon: '06-30-123-4568', rokon:1 },
      { id: 1, nev: 'Orsi', eletkor:41, telefon: '06-20-458-8965', rokon:1 },
      { id: 2, nev: 'György', eletkor:69, telefon: '06-30-589-6985', rokon:0 },
      { id: 3, nev: 'Zolika', eletkor:12, telefon: '06-70-589-9898', rokon:0 },
      { id: 4, nev: 'Orsóka', eletkor:26, telefon: '06-30-369-8521', rokon:1 },
      { id: 5, nev: 'Borsika', eletkor:19, telefon: '06-20-256-8978', rokon:0 },
      { id: 6, nev: 'Bence', eletkor:42, telefon: '06-30-256-6325', rokon:1 },
      { id: 7, nev: 'Jácint', eletkor:58, telefon: '06-30-989-9595', rokon:1 },
      { id: 8, nev: 'Olivér', eletkor:36, telefon: '06-20-254-8521', rokon:0 },
      { id: 9, nev: 'Gyöngyi', eletkor:63, telefon: '06-70-254-8568', rokon:0 }
    ];
  }

  $scope.uj_nev = "";
  $scope.uj_kor = 0;
  $scope.uj_tel = "";
  $scope.uj_rokon = "";

  $scope.felvetel = function() {
    if ($scope.uj_nev != null && $scope.uj_nev != "") {
      if ($scope.uj_rokon == null || $scope.uj_rokon == "") {
        $scope.uj_rokon=0;
      }
      $scope.emberek.push(
        { id: $scope.emberek.length, nev: $scope.uj_nev, eletkor: $scope.uj_kor, telefon: $scope.uj_tel, rokon: $scope.uj_rokon }
      );
      window.localStorage.setItem('emberek',angular.toJson($scope.emberek));
      $scope.uj_nev = "";
      $scope.uj_kor = 0;
      $scope.uj_tel = "";
      $scope.uj_rokon = "";
    }
  }

  $scope.adatMentes = function() {
    window.localStorage.setItem('emberek',angular.toJson($scope.emberek));
    //$scope.uj_nev = angular.toJson($scope.emberek);
  }

  $scope.adatBetoltes = function() {
    $scope.emberek = angular.fromJson(window.localStorage.getItem('emberek'));
  }


});

