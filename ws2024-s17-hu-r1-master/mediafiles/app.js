let app = angular.module('calculatorApp', []);
app.controller('calculatorController', function($scope, $http){
    $http.get('stages.json')
    .then(function(response){
        $scope.stages = response.data;
        console.log($scope.stages)
    })

    //megjelenítsük a 10 beviteli mezőt
    $scope.teamMembers = [];
    for (let i = 0; i < 10; i++) {
        $scope.teamMembers.push(
            {
                firstName: '',
                lastName: '',
                speed: '',
                totalDistance: 0
            });  
    }
    console.log($scope.teamMembers);

    //Futók kiválasztása egy-egy szakaszra
    $scope.updateRunners = function(){
        $scope.runners = [];
        angular.forEach($scope.teamMembers, function(member){
            let fullName = member.firstName + ' ' + member.lastName;
            //ellenőrzés, létezik e a tömbben, ha nem adja hozzá
            if($scope.runners.indexOf(fullName) === -1){
                //ha nincs benne adja hozzá az üres tömbhöz
                $scope.runners.push(fullName)
            }
        });
        console.log($scope.runners);
    }

    //idő formázása
    $scope.formatTime = function(member){
        if(member.speed && member.speed.length === 4){
            member.speed = member.speed.slice(0, 2) + ':' + member.speed.slice(2)
        }
    };
    // kiválasztott futó sebessége
    $scope.getRunnerSpeed = function(runner){
        //kiválasztott futó keresése a teamMembers tömbben
        let selectedRunner = $scope.teamMembers.find(member => {
            return member.firstName + ' ' + member.lastName === runner;
        });
        //ha nem találunk értéket, vagy nincs megadva sebesség legyen null
        if(!selectedRunner || !selectedRunner.speed){
            return 0;
        }
        //szétválasztjuk az percet és a másodpercet
        let [minutes, second] = selectedRunner.speed.split(':');
        //átalakítjuk másodperccé
        let totalSecond = parseInt(minutes) * 60 + parseInt(second);
        //itt vissza kapjuk a futó sebességét másodpercben/km
        return totalSecond;
    }

    //az 1km/speed szorzata a távval
    $scope.calculateTime =function(distance,speed){
        //ellenőrizzük érvényes e a két szám
        if(isNaN(distance) || isNaN(speed) || speed <=0){
            return '00:00:00'; //érvénytelen adatok kezelése
        }
        let timeInMinutes = (distance * speed) /60;
        let hours = Math.floor(timeInMinutes/60); //óra számítása
        let minutes = Math.floor(timeInMinutes % 60);
        let seconds = Math.floor(timeInMinutes % 1) * 60; //másodperc

        //idő formázása
        let formattedTime = (hours < 10 ? '0' : '') + hours + ':' +
                            (minutes < 10 ? '0' : '') + minutes + ':'+
                            (seconds < 10 ? '0' : '') + seconds;
        return formattedTime;
    }
    
    //össze gyűjtjük a távokat
    $scope.runnerDistance = {};
    for (let i = 0; i < 10; i++) {
        $scope.runnerDistance['runner' + 1] = 0;
        //kezdetben minden táv 0
    }


    $scope.calculateTotalDistance = function(distance, runner){
        console.log("futó neve: ", runner, "lefutott táv: " , distance);
        //hiba kezelés
        if(!runner){
            return 0;
        }
        let totalDistance = 0;
        $scope.stages.forEach(stage => {
            if(stage.runner === runner){
                totalDistance += stage.distance;
                console.log(totalDistance);
                $scope.runnerDistance[runner] = totalDistance;

            }
        })
    }


});
