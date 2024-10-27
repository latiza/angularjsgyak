console.log("maincontroller.js csatolva")

app.controller('MainController', function($scope){
     $scope.szoveg ="Így működnek az Angularban a változók.";
     
     $scope.emberek = [
       
        { nev: 'Wick', eletkor:20, csajok: ['Bridget']},
        { nev: 'Lucifer', eletkor:10000, csajok: ['Detective', 'Milliók'] },
        { nev: 'Ragnar', eletkor:40, csajok: ['Lagherta', 'Aslaug hercegnő'] },
        { nev: 'Bulgasal', eletkor:600, csajok: ['Min Si-ho']}
      ];
});