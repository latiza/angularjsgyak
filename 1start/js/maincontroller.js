console.log("maincontroller.js csatolva")
/**Tehát először is adtunk egy nevet az alkalmazásunknak, majd létre hoztunk egy kontrollert a div elementünknek, és létre hoztuk a maincontroller.js-t 
 * Nézzük, hogyan tudunk változókat létre hozni az angularban. 
 * Először is látjuk, hogy a függvény kapott egy $scope nevű paramétert. 
 * Ez azt jelenti, hogy ez lesz a hatásköre ennek a vezérlőnek.
 * Változót úgy tudunk létrehozni, hogy először leírjuk: $scope, majd a változó neve és értéke. Innentől kezdve ezen a kontrolloren belül használhatjuk a text nevű változót. 
*/
app.controller('MainController', function($scope){
     $scope.szoveg ="Így működnek az Angularban a változók.";
     //tömböt készítünk, amely objektumokat fog tartalmazni
     $scope.emberek = [
        //objektumoknál: mindig van egy mező név és egy érték
        { nev: 'Wick', eletkor:20, csajok: ['Bridget']},
        { nev: 'Lucifer', eletkor:10000, csajok: ['Detective', 'Milliók'] },
        { nev: 'Ragnar', eletkor:40, csajok: ['Lagherta', 'Aslaug hercegnő'] },
        { nev: 'Bulgasal', eletkor:600, csajok: ['Min Si-ho']}
      ];
});