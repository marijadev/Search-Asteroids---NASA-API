## **__Tech stack__**: React, React Context API, Next JS, CSS in JS, Axios

Routing between pages: Next.js

Data communication between pages: React Context API

Date selection: 7 days between two dates. 'Start' date needs to be before the selected 'End' date
								Not possible to send the request unless the dates are correctly selected

API filtering: Working only with objects that have property 'is_potentially_hazardous_asteroid' === true
								If no data is available, table should display: "Nema selektovanih asteroida"

Input handling: Searching through list by the asteroid name
								Iteration through dropdown: via 'mouseover' or via 'up' and 'down' arrow
								Adding to list: 'CLICK' or 'ENTER' on the asteroid from the dropdown list

List Of Selected Asteroids: if no selected asteroids are in the list, button 'Proj Polazaka Pored Zemlje' is disabled
														Asteroids can be 'removed' from the list.

Charts: name of the asteroid and number of passes near the Earth from 1900 - 1999.
				Each chart has it's own color based of number of passes
				Button 'Nazad' leads to previous page

Bonus features: 
				1. Removing from the list of selected asteroids 
				2. Chart animation on data load

Estimated time: >3 working days
