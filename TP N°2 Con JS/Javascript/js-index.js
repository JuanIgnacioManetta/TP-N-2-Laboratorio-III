document.addEventListener("DOMContentLoaded", async () => {
  const loadingElement = document.getElementById("loading");
  const top3Container = document.getElementById("top3-container");
  const restContainer = document.getElementById("rest-container");
  const footer = document.getElementById("footer");

  try {
    const standings = await fetchRaceResults();

    // Simula una carga entre 2 y 4 segundos
    const delay = getRandomInt(1000, 2000);
    setTimeout(() => {
      // Ocultar el elemento de carga y mostrar los contenedores
      loadingElement.style.display = "none";
      top3Container.style.display = "flex";
      restContainer.style.display = "flex";
      footer.style.display = "block";

      // Objeto que mapea nacionalidades a rutas de imágenes de banderas
      const flagMap = {
        Dutch: "Imagenes/Banderas/paises-bajos.png",
        British: "Imagenes/Banderas/reino-unido.png",
        German: "Imagenes/Banderas/alemania.png",
        Spanish: "Imagenes/Banderas/españa.png",
        Finnish: "Imagenes/Banderas/finlandia.png",
        French: "Imagenes/Banderas/francia.png",
        Japanese: "Imagenes/Banderas/japon.png",
        Mexican: "Imagenes/Banderas/mexico.png",
        Australian: "Imagenes/Banderas/australia.png",
        Canadian: "Imagenes/Banderas/canada.png",
        Thai: "Imagenes/Banderas/tailandia.png",
        American: "Imagenes/Banderas/estados-unidos.png",
        Monegasque: "Imagenes/Banderas/monaco.png",
        Danish: "Imagenes/Banderas/dinamarca.png",
        Chinese: "Imagenes/Banderas/china.png",
      };

      // Objeto para mapear nombres de pilotos a números personalizados
      const customNumbers = {
        Verstappen: 1,
        // Agrega más pilotos y sus números personalizados aquí si es necesario
      };

      // Links a las paginas de los pilotos
      const links = {
        Verstappen: "maxVerstappen.html",
        Hamilton: "lewisHamilton.html",
        Bottas: "valtteriBottas.html",
        Perez: "sergioPerez.html",
        Norris: "landoNorris.html",
        Ricciardo: "danielRicciardo.html",
        Sainz: "carlosSainz.html",
        Leclerc: "charlesLeclerc.html",
        Stroll: "lanceStroll.html",
        Tsunoda: "yukiTsunoda.html",
        Alonso: "fernandoAlonso.html",
        Ocon: "estebanOcon.html",
        Piastri: "oscarPiastri.html",
        Zhou: "guanyuZhou.html",
        Russell: "georgeRussell.html",
      };

      // Links Imagenes de los pilotos
      const linksImages = {
        Verstappen:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png",
        Leclerc:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png",
        Norris:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png",
        Sainz:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png",
        Pérez:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png",
        Piastri:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png",
        Russell:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png",
        Hamilton:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png",
        Alonso:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png",
        Tsunoda:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png",
        Stroll:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png",
        Bearman:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png",
        Hulkenberg:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png",
        Ricciardo:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png",
        Albon:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png",
        Ocon: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png",
        Magnussen:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png",
        Gasly:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png",
        Zhou: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GUAZHO01_Guanyu_Zhou/guazho01.png",
        Bottas:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png",
        Sargeant:
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LOGSAR01_Logan_Sargeant/logsar01.png",
      };

      standings.forEach((standing, index) => {
        const position = index + 1;
        const driver = standing.Driver;
        const points = standing.points;
        const constructor = standing.Constructors[0].name;

        const card = document.createElement("div");
        card.className = "card-pilot-top3";

        // Obtener la ruta de la imagen de la bandera
        const flagSrc =
          flagMap[driver.nationality] || "Imagenes/Banderas/default.png"; // Usa una imagen por defecto si la nacionalidad no está en el objeto

        // Obtener el número personalizado si existe, o el número permanente del piloto
        const driverNumber =
          customNumbers[driver.familyName] || driver.permanentNumber;

        card.innerHTML = `
                <a href=${links[driver.familyName] || "#"}>
                    <div class="frame-container">
                        <div class="first-frame">
                            <p class="pilot-position">${position}</p>
                            <div class="pilot-points">
                                <p>${points}</p>
                                <p>Pts</p>
                            </div>
                        </div>
                        <div class="second-frame">
                            <p class=${"name-pilot-" + constructor}>${
          driver.givenName
        } ${driver.familyName}</p>
                            <img src="${flagSrc}" alt="Bandera de ${
          driver.nationality
        }">
                        </div>
                        <div class="third-frame">
                            <p>${constructor}</p>
                        </div>
                        <div class="fourth-frame">
                            <div class="pilot-number">
                                <p class=${"pilot-number-" + constructor} id=${
          constructor + "number"
        }>${driverNumber}</p>
                            </div>
                            <img src=${linksImages[driver.familyName]} alt="${
          driver.givenName
        } ${driver.familyName} Piloto de ${constructor}">
                        </div>
                    </div>
                </a>
            `;

        if (position <= 3) {
          top3Container.appendChild(card);
        } else {
          restContainer.appendChild(card);
        }
      });
    }, delay);
  } catch (error) {
    console.error("Error fetching race results:", error);
    loadingElement.textContent =
      "Error al cargar los datos. Por favor, inténtelo de nuevo más tarde.";
  }
});

// Función para obtener los datos de la API de Ergast
async function fetchRaceResults() {
  const url = "http://ergast.com/api/f1/current/driverStandings.json";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

// Función para obtener un número entero aleatorio entre un rango (min inclusive, max exclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
