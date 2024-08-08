document.addEventListener("DOMContentLoaded", async() =>{
    //Obtenemos los elementos del DOM
    //Nombre del piloto
    const pilotName = document.getElementById('pilot-name');
    const pilotSurname = document.getElementById('pilot-surname');
    //Stats de la temporada pasada
    const oldSeason = document.getElementById('old-season');
    const oldFirstPodium = document.getElementById('old-first-podium');
    const oldPilotPole = document.getElementById('old-pilot-pole');
    const oldPilotHotlap = document.getElementById('old-pilot-hotlap');
    const oldPilotDnf = document.getElementById('old-pilot-dnf');
    const oldPilotPoints = document.getElementById('old-pilot-points');
    const oldRounds = document.getElementById('old-rounds');
    //Stats de la temporada actual
    const currentFirstPodium = document.getElementById('current-first-podium');
    const currentPilotPole = document.getElementById('current-pilot-pole');
    const currentPilotHotlap = document.getElementById('current-pilot-hotlap');
    const currentPilotDnf = document.getElementById('current-pilot-dnf');
    const currentPilotPoints = document.getElementById('current-pilot-points');
    const currentRounds = document.getElementById('current-rounds');
    //Obtengo los elementos de imagenes
    const imagen1 = document.getElementById('imagen1');
    const imagen2 = document.getElementById('imagen2');
    const imagen3 = document.getElementById('imagen3');
    const imagen4 = document.getElementById('imagen4');
    //Obtengo el id del piloto seleccionado
    const params = new URLSearchParams(window.location.search);
    // Obtén el valor del parámetro 'id'
    const driverSelected = params.get('id');

    //Función para obtener los datos del piloto
    try{
        var url = `https://ergast.com/api/f1/current/drivers/${driverSelected}/driverStandings.json`;
        var driver = await fetchDriverResults(url);
        console.log(driver);

        //Le damos el nombre del piloto a la página
        pageName = driver.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName + 
        ' ' + driver.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName;

        //Datos del piloto
        pilotName.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName;
        pilotSurname.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName;
        
        //Datos de la temporada actual
        currentFirstPodium.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].wins;
        currentPilotPole.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].polePositions;
        currentPilotHotlap.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].FastestLaps;
        currentPilotDnf.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.dnf;
        currentPilotPoints.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].points;
        currentRounds.innerHTML = "Carreras: " + driver.StandingsTable.StandingsLists[0].round;

        var season = driver.StandingsTable.StandingsLists[0].season - 1;
        url = `https://ergast.com/api/f1/${season}/drivers/${driverSelected}/driverStandings.json`;
        driver = await fetchDriverResults(url);
        console.log(driver);
        
        //Datos de la temporada pasada
        oldSeason.innerHTML = "Temporada "+ driver.StandingsTable.StandingsLists[0].season;
        oldFirstPodium.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].wins;
        oldPilotPole.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].polePositions;
        oldPilotHotlap.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].FastestLaps;
        oldPilotDnf.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.dnf;
        oldPilotPoints.innerHTML = driver.StandingsTable.StandingsLists[0].DriverStandings[0].points;
        oldRounds.innerHTML = "Carreras: " + driver.StandingsTable.StandingsLists[0].round;

        //Titulo del Documento
        document.title = pageName;

        //Imagenes de los pilotos
        const pilotsImg =[
            {
                driverId: "max_verstappen",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Verstappen/verstappen-miami-race",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/sutton/2022/Bahrain/Thursday/1385967943",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Verstappen/1488925635-16by9Centre",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Verstappen/1499061206-16by9North"
            },
            {
                driverId: "albon",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
            {
                driverId: "alonso",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2045385016_16by9Centre",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2053204844_16by9Centre",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2029639192_16by9Centre",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9Centre/f_auto/q_auto/trackside-images/2024/F1_Grand_Prix_of_China___Sprint__Qualifying/2149357234"
            },
            {
                driverId: "bearman",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
            {
                driverId: "bottas",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
            {
                driverId: "gasly",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
            {
                driverId: "hamilton",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Hamilton/1574181499-16by9Centre",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Hamilton/1565053794",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Hamilton/1561001354-16by9South",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Hamilton/GettyImages-1574050637-16by9Centre"
            },
            {
                driverId: "hulkenberg",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
            {
                driverId: "leclerc",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320,t_16by9Centre/trackside-images/2024/F1_Grand_Prix_of_Emilia_Romagna/2153689326",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2027373349_16by9Centre",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2050987064_16by9Centre",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2053482369_16by9Centre"
            },
            {
                driverId: "kevin_magnussen",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
            {
                driverId: "norris",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2045580404_16by9South",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2032675059_16by9Centre",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2030040878_16by9Centre",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9North/f_auto/q_auto/trackside-images/2024/F1_Grand_Prix_of_Emilia_Romagna___Previews/2153227077"
            },
            {
                driverId: "ocon",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
            {
                driverId: "perez",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Perez/1574200949-16by9North",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Perez/1565310353-16by9Centre",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Perez/1580569636-16by9North",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Perez/1578209055-16by9North"
            },
            {
                driverId: "piastri",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2053514280_16by9North",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2068364720-16by9Centre",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2050993420_16by9South",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9Centre/f_auto/q_auto/trackside-images/2024/F1_Grand_Prix_of_Monaco/2154753324"
            },
            {
                driverId: "ricciardo",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
            {
                driverId: "russell",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Russell/1580518422-16by9North",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Russell/1565349731-16by9South",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Russell/1562756438-16by9Centre",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverGalleries2023/Russell/1573721079-16by9North"
            },
            {
                driverId: "sainz",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2100663829_16by9Centre",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2050526049_16by9Centre",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2030176836_16by9Centre",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9North/f_auto/q_auto/fom-website/2024/Monaco/GettyImages-2153676144"
            },
            {
                driverId: "sargeant",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
            {
                driverId: "stroll",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2063248829_16by9Centre",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2032281505_16by9Centre",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2032079239_16by9North",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9North/f_auto/q_auto/trackside-images/2024/F1_Grand_Prix_of_China/2149476682"
            },
            {
                driverId: "tsunoda",
                imagen1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2050945287_16by9North",
                imagen2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2048375559_16by9Centre",
                imagen3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/content/dam/fom-website/manual/DriverAndTeamImages/2024/2051044320_16by9Centre",
                imagen4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9Centre/f_auto/q_auto/trackside-images/2024/F1_Grand_Prix_of_Emilia_Romagna/2153697878"
            },
            {
                driverId: "zhou",
                imagen1: "",
                imagen2: "",
                imagen3: "",
                imagen4: ""
            },
        ]
        
        //Encuentra el piloto en el array
        const piloto = pilotsImg.find(p => p.driverId === driverSelected);
        
        if(piloto){
            //Asigna la imagen al elemento
            imagen1.src = piloto.imagen1;
            imagen1.alt = "Imagen 1 de " + pageName;
            imagen2.src = piloto.imagen2;
            imagen2.alt = "Imagen 2 de " + pageName;
            imagen3.src = piloto.imagen3;
            imagen3.alt = "Imagen 3 de " + pageName;
            imagen4.src = piloto.imagen4;
            imagen4.alt = "Imagen 4 de " + pageName;            
        }
    }catch(error){
        console.error(error);
    }

});

async function fetchDriverResults(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data.MRData;
    }catch(error){
        console.error(error);
        return [];
    }
}