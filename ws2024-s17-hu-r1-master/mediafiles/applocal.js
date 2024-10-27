let app = angular.module('calculatorApp', []);
app.controller('CalculatorController', function($scope, $http) {
    // Adatok lekérése az API-ból
    $http.get('stages.json')
    .then(function(response) {
        $scope.stages = response.data;
        // Töltse fel a $scope.teamMembers tömböt a mentés előtt
        for (let i = 0; i < 10; i++) {
            $scope.teamMembers.push({
                firstName: '',
                lastName: '',
                speed: '',
                totalDistance: 0
            });
        }
    });


    // Megjeleníti a 10 sor input beviteli mezőt 
    $scope.teamMembers = [];

    // Futók kiválasztása a szakaszra
    $scope.updateRunners = function() {
        $scope.runners = []; // üres tömb
        angular.forEach($scope.teamMembers, function(member) {
            let fullName = member.firstName + ' ' + member.lastName;
            // Ellenőrzés, hogy a futó neve létezik e már a tömbben
            if ($scope.runners.indexOf(fullName) === -1) {
                // ha nem létezik, hozzá adja az üres tömbhöz
                $scope.runners.push(fullName);
            }
        });
        //ellenőrzés bekerülnek e a tömbbe
        console.log($scope.runners);
    };
    
    //a beírt idő formázása, de ezt még alakítani kell, hogy 0-at írjon elé
    $scope.formatTime = function(member) {
        if (member.speed && member.speed.length === 4) {
          member.speed = member.speed.slice(0, 2) + ':' + member.speed.slice(2);
        }
    };
    
      
    // a kiválasztott futó sebessége
    $scope.getRunnerSpeed = function(runner) {
        // A kiválasztott futó keresése a $scope.teamMembers tömbben
        let selectedRunner = $scope.teamMembers.find(member => {
            return member.firstName + ' ' + member.lastName === runner;
        });  
        // Ha nem találtunk futót, vagy nincs megadva sebesség, visszatérünk null értékkel
        if (!selectedRunner || !selectedRunner.speed) {
            return 0;
        }   
        // Szétválasztjuk az órát és a percet
        let [minutes, seconds] = selectedRunner.speed.split(':');   
        // Átalakítjuk perceket és másodperceket másodpercekké
        let totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);   
        // Visszaadjuk az adott futó sebességét másodpercekben
        return totalSeconds;
    };
    
 
    // Az egységnyi idő sec szorzata a megtett távval és kiszámítása időben
    $scope.calculateTime = function(distance, speed) {
        // Ellenőrizzük, hogy mindkét érték érvényes szám-e
        if (isNaN(distance) || isNaN(speed) || speed <= 0) {
            return '00:00:00'; // Vagy más üzenet az érvénytelen adatok kezelésére
        }

        let timeInMinutes = (distance * speed) / 60; // Az időt percekben számoljuk
        let hours = Math.floor(timeInMinutes / 60); // Az óra számítása
        let minutes = Math.floor(timeInMinutes % 60); // A perc számítása
        let seconds = Math.floor((timeInMinutes % 1) * 60); // A másodperc számítása

        // Idő formázása HH:MM:SS formátumban
        let formattedTime = (hours < 10 ? '0' : '') + hours + ':' +
                            (minutes < 10 ? '0' : '') + minutes + ':' +
                            (seconds < 10 ? '0' : '') + seconds;
        return formattedTime;
    };


    //

//ide kell gyűjteni a távokat
$scope.runnerDistances = {};
for (let i = 1; i <= 10; i++) {
    $scope.runnerDistances['runner' + i] = 0; // Kezdetben minden távolságot 0-ra állítunk
}

$scope.calculateTotalDistance = function(distance, runner) {
console.log("futó neve", runner, "lefutott táv", distance);
    if (!runner) {
        return 0;
    }
    let totalDistance = 0;
    $scope.stages.forEach(stage => {
        if (stage.runner === runner) {
            totalDistance += stage.distance;
            //console.log(totalDistance);
            // Tároljuk el a távolságot a futóhoz
            $scope.runnerDistances[runner] = totalDistance;
            console.log($scope.runnerDistances[runner]);
            console.log("frissített táv futó", runner, "amit futott", totalDistance);
        }
    });
};
});


