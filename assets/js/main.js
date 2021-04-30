
// Query theAPI  for "Confirmed Cases",  "Longitude", and "Latitude" between the date on the button and 14 days later
function fetchData(){
	let textOnButton = event.target.textContent.split(" ");
	let date= (typeof(textOnButton)=="object") ? textOnButton[textOnButton.length-1] : textOnButton;
	
	//formatting the date
	let completeDate = date.split(".");
	let day = completeDate[0];
	let month = completeDate[1];
	let year = completeDate[2];
	let newDate = month+"/"+day+"/"+year;

	let formattedDate = new Date(newDate);
	let dateClicked = formattedDate.toLocaleDateString();

	//adding 14 days 
	formattedDate.setDate(formattedDate.getDate()+15);
	let lDay = formattedDate.getDate();
	let lMonth = formattedDate.getMonth()+1;
	let lYear = formattedDate.getFullYear();
	let fourteenDaysLaterDate = lMonth+"/"+lDay+"/"+lYear;
	
	let url = "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIreland/FeatureServer/0/query?where=TimeStamp>='"+newDate+"' AND TimeStamp<'"+fourteenDaysLaterDate+"'&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=TimeStamp+%2C+ConfirmedCovidCases+%2C+Lat+%2C+Long&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=TimeStamp ASC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
	 
	 let data = $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
            	//Calculate total number of “Confirmed Cases” between those 2 dates
            	let totalCovidCases = 0;
            	let locationArray = [];
                let upperRange = '' , lowerRange='';
                let casesOnLowerRange = 0;
                let index=0;
                for(let attr=0;attr<response.features.length;attr++){
                    upperRange = response.features[index].attributes.TimeStamp;
                    casesOnLowerRange = response.features[index].attributes.ConfirmedCovidCases;
                    lowerRange = response.features[attr].attributes.TimeStamp;
                    if(upperRange!=lowerRange){
                        index = attr;
                    }
                	totalCovidCases+=response.features[attr].attributes.ConfirmedCovidCases;
                	// Pass the "Longitude", and "Latitude" data for any “Confirmed Cases” between the 2 dates to the array “locations” in maps.js
                	if(response.features[attr].attributes.ConfirmedCovidCases>0){
                		locationArray.push({lat:response.features[attr].attributes.Lat,lng:response.features[attr].attributes.Long});
                	}

                }
                
                //calculate percentage change in “Confirmed Cases” between first date and last date
                let casesOnFirstDay = response.features[0].attributes.ConfirmedCovidCases;
                let casesOnLastDay = response.features[response.features.length-1].attributes.ConfirmedCovidCases;
                let calcChange = casesOnLowerRange - casesOnFirstDay;
                let percentageChange = Math.ceil((Math.abs(calcChange) / casesOnFirstDay) *100);
                $('#rate-change').text(percentageChange+"%");
                $('#numCovidCasesThisDate').text(casesOnFirstDay);
                $('#numCovidCasesLastDate').text(casesOnLowerRange);
                if(calcChange<0){
                	$('#operator').text("-");
                }
                else{
                	$('#operator').text("+");	
                }
                initMap(locationArray);
            },
            error: function(error) {
                console.log(error);
            }
        });
}