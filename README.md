# Covid -19: 2 Weeks later Dashboard

This data dashboard is designed to show the effect of national Irish events on the inicidence of Covid Cases in Ireland. 

It allows the user to select a date, which is then dynamically read from the button and used to interrogate an API at https://opendata-geohive.hub.arcgis.com/datasets/d9be85b30d7748b5b7c09450b8aede63_0/ to return the number of Confirmed Covid Cases on that date, the number of confirmed Covid cases 2 weeks later, calculate the percentage rate change, and pass co-ordinates to a google cluster map to visualise the clusters. 

The link for the dashboard is: 
*https://niallfitzg.github.io/2WeeksLater/

It is alaso available publically at:
http://alphatech.ie/covid/

## UX

This is a Single-Page Application (SPA) that is designed to work as simply as possible. The page uses Bootstrap 5 in order to deliver a responsive experience. 
The original mock up for the page can be seen in the *wireframe* folder, and this was created using the freely available tools at https://www.mockflow.com
 
## Issues Encountered

### Not all API's are created equally
Armed with the knowledge from my studies on how to access an API, I set forth to find myself an API to access for this project.
It was then that I discovered that some API's behave quite differently to others. 
The rules of an API are the most important thing to tackle, and in this instance it was the documentation at https://developers.arcgis.com/documentation/ that guided me in my mission.
The most cumbersome part of this project was thoroughly understanding not only the query parameters that this API expects, but also the data it returns.
For instance, by default, it returns a dataset with a *truckload* of geospatial information alongside anything of relevance.
This served to overwhelm the memory of my computer and for a long time left me wondering why nothing appeared to be working.
It took a copule of weeks of trying and failing but eventually I figured out the issue, and the way to overcome it with the aid of the *Postman* app, which is a pretty neat.

### The Epoch
Apparently, the world was created on January 1st, 1970. At least, that's what the Unix programmers amongst us would have us believe, as I discovered that it's the time system for query datestamps.
This project depends on understanding the concept of Epoch and then being able to move between Epoch-calculated time and the way we measure it in the real world. Which brings me to...

### There's more than one way to skin a script
There's a couple of communities that proved invaluable to me during the completion of this project: www.stackoverflow.com and the SpeakJS community on Discord.
Both of these places were great to turn to when trying to problem solve and avoid re-inventing the wheel, and I also learned some new techniques to manipulate data and the DOM.
Between those two communities there is a wealth of experience on tap and I found them to be excellent resources, especially with regards to how to query the API in the first place, then with Epoch time, and then again with the logic and methodology required to achieve the desired outcomes.

### Can you trust the data?
During the course of the project it became apparent to me that the longitudinal and latidunal data being returned by the API was at odds with common sense.
Initially I thought my logic must have been incorrect but using Postman to interrogate the API I discovered that much of the same geographical data was being repeated throughout the data set, which is an issue for the API provider.

## Technologies Used
The languages, frameworks, libraries and other tools used in the creation of this dashboard are:

*	**Postman -** The app to build, test and modify API's ps://www.postman.com

*	**HTML 5 -** The dashboard uses HTML5.

*	**CSS3 -** The dashboard uses CSS3 for styling of all elements within the website. It is linked from the page to the *style.css* file and is used for all content, including such as layout of colours, navbar, background, images etc.

*	**Bootstrap 5 Beta -** The open-source responsive Bootstrap framework has been used to implement the layout. https://getbootstrap.com/

*	**Google Fonts-** The dashboard uses Google fonts https://fonts.google.com/to adhere to Covid-19 messaging guidelines as laid down by the Dept. of Health https://assets.gov.ie › ...
 
*   **JavaScript -** The dashboard uses Javascript to provide dynamic interactivity.

*   **jQuery -** The dashboard uses jQuery, as it simplifies a lot of complicated tasks from JavaScript, such as AJAX calls and DOM manipulation. https://www.jquery.com/jquery-3.6.0

*	**GitHub -** GitHub has been used for version control during the development process.  https://github.com/





## Testing

The project was tested against other published sources of Covid data during the development cycle to make sure that it was delivering the correct results. 


### Acknowledgments

Thank you to my Mentor Reuben Ferrante.