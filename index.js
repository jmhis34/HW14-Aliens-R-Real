// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $DateTimeInput = document.querySelector("#datetime");
var $CityInput = document.querySelector("#city");
var $StateInput = document.querySelector("#state");
var $CountryInput = document.querySelector("#country");
var $ShapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// renderTable renders the filteredDateTime to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredDateTime.length; i++) {
    // Get get the current date_time object and its fields
    var date_time = filteredDateTime[i];
    var fields = Object.keys(date_time);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the date_time object, create a new cell at set its inner text to be the current value at the current date_time's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = date_time[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  
  var search = {};
  var filterDate = $DateTimeInput.value.trim().toLowerCase();
  if (filterDate)
    search["datetime"] = filterDate;
  var filterCity = $CityInput.value.trim().toLowerCase();
  if (filterCity)
    search["city"] = filterCity;
  var filterState = $StateInput.value.trim().toLowerCase();
  if (filterState)
    search["state"] = filterState;
  var filterCountry = $CountryInput.value.trim().toLowerCase();
  if (filterCountry)
    search["country"] = filterCountry;
  var filterShape = $ShapeInput.value.trim().toLowerCase();
  if (filterShape)
    search["shape"] = filterShape;

  for (var key in search)
  {
    console.log(search[key]);
  }

  // Set filteredDateTime to an array of all date_times whose "datetime" matches the filter
  filteredDateTime = dataSet.filter(function(date_time) {
    for (var key in search)
    {
      if (date_time[key] != search[key])
      {
        return false;
      }
    }
    return true;
  });

  renderTable();
}

// Set filteredDateTime to dataSet initially
var filteredDateTime = dataSet;
// Render the table for the first time on page load
renderTable();