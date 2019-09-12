
import React, { useState } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import chroma from "chroma-js"

const wrapperStyles = {
  margin: "0 auto",
  width:'100%',
  maxWidth:'auto'
}

const colorScale = chroma
  .scale([
    '#ab47bc',
    '#c62828',
  ])
  .mode('lch')
  .colors(24)

export default function CountryMapForBarcode(props) {
    const [countries] = useState([
      {
        "name": "Andorra",
        "coordinates": [42.546245, 1.601554], 
      },
    {
        "name": "United Arab Emirates",
        "coordinates": [23.424076, 53.847818], 
    },
    {
        "name": "Afghanistan",
        "coordinates": [33.93911, 67.709953], 
    },
    {
        "name": "Antigua and Barbuda",
        "coordinates": [17.060816, -61.796428], 
    },
    {
        "name": "Anguilla",
        "coordinates": [18.220554, -63.068615], 
    },
    {
        "name": "Albania",
        "coordinates": [41.153332, 20.168331], 
    },
    {
        "name": "Armenia",
        "coordinates": [40.069099, 45.038189], 
    },
    {
        "name": "Netherlands Antilles",
        "coordinates": [12.226079, -69.060087], 
    },
    {
        "name": "Angola",
        "coordinates": [-11.202692, 17.873887], 
    },
    {
        "name": "Antarctica",
        "coordinates": [-75.250973, -0.071389], 
    },
    {
        "name": "Argentina",
        "coordinates": [-38.416097, -63.616672], 
    },
    {
        "name": "American Samoa",
        "coordinates": [-14.270972, -170.132217], 
    },
    {
        "name": "Austria",
        "coordinates": [47.516231, 14.550072], 
    },
    {
        "name": "Australia",
        "coordinates": [-25.274398, 133.775136], 
    },
    {
        "name": "Aruba",
        "coordinates": [12.52111, -69.968338], 
    },
    {
        "name": "Azerbaijan",
        "coordinates": [40.143105, 47.576927], 
    },
    {
        "name": "Bosnia and Herzegovina",
        "coordinates": [43.915886, 17.679076], 
    },
    {
        "name": "Barbados",
        "coordinates": [13.193887, -59.543198], 
    },
    {
        "name": "Bangladesh",
        "coordinates": [90.35633123, 4.469936], 
    },
    {
        "name": "Belgium",
        "coordinates": [50.503887, -1.561593], 
    },
    {
        "name": "Burkina Faso",
        "coordinates": [12.238333, 25.48583], 
    },
    {
        "name": "Bulgaria",
        "coordinates": [42.733883, 50.637772], 
    },
    {
        "name": "Bahrain",
        "coordinates": [25.930414, 29.918886], 
    },
    {
        "name": "Burundi",
        "coordinates": [-3.373056, 2.315834], 
    },
    {
        "name": "Benin",
        "coordinates": [9.30769, -64.75737], 
    },
    {
        "name": "Bermuda",
        "coordinates": [32.321384, 114.727669], 
    },
    {
        "name": "Brunei",
        "coordinates": [4.535277, -63.588653], 
    },
    {
        "name": "Bolivia",
        "coordinates": [-16.290154, -51.92528], 
    },
    {
        "name": "Brazil",
        "coordinates": [-14.235004, -77.39628], 
    },
    {
        "name": "Bahamas",
        "coordinates": [25.03428, 90.433601], 
    },
    {
        "name": "Bhutan",
        "coordinates": [27.514162, 3.413194], 
    },
    {
        "name": "Bouvet Island",
        "coordinates": [-54.423199, 24.684866], 
    },
    {
        "name": "Botswana",
        "coordinates": [-22.328474, 27.953389], 
    },
    {
        "name": "Belarus",
        "coordinates": [53.709807, -88.49765], 
    },
    {
        "name": "Belize",
        "coordinates": [17.189877, -106.346771], 
    },
    {
        "name": "Canada",
        "coordinates": [56.130366, 96.870956], 
    },
    {
        "name": "Cocos [Keeling] Islands",
        "coordinates": [-12.164165, 21.758664], 
    },
    {
        "name": "Congo [DRC]",
        "coordinates": [-4.038333, 20.939444], 
    },
    {
        "name": "Central African Republic",
        "coordinates": [6.611111, 15.827659], 
    },
    {
        "name": "Congo [Republic]",
        "coordinates": [-0.228021, 8.227512], 
    },
    {
        "name": "Switzerland",
        "coordinates": [46.818188, -5.54708], 
    },
    {
        "name": "Côte d'Ivoire",
        "coordinates": [7.539989, -159.777671], 
    },
    {
        "name": "Cook Islands",
        "coordinates": [-21.236736, -71.542969], 
    },
    {
        "name": "Chile",
        "coordinates": [-35.675147, 12.354722], 
    },
    {
        "name": "Cameroon",
        "coordinates": [7.369722, 104.195397], 
    },
    {
        "name": "China",
        "coordinates": [35.86166, -74.297333], 
    },
    {
        "name": "Colombia",
        "coordinates": [4.570868, -83.753428], 
    },
    {
        "name": "Costa Rica",
        "coordinates": [9.748917, -77.781167], 
    },
    {
        "name": "Cuba",
        "coordinates": [21.521757, -24.013197], 
    },
    {
        "name": "Cape Verde",
        "coordinates": [16.002082, 105.690449], 
    },
    {
        "name": "Christmas Island",
        "coordinates": [-10.447525, 33.429859], 
    },
    {
        "name": "Cyprus",
        "coordinates": [35.126413, 15.472962], 
    },
    {
        "name": "Czech Republic",
        "coordinates": [49.817492, 10.451526], 
    },
    {
        "name": "Germany",
        "coordinates": [51.165691, 42.590275], 
    },
    {
        "name": "Djibouti",
        "coordinates": [11.825138, 9.501785], 
    },
    {
        "name": "Denmark",
        "coordinates": [56.26392, -61.370976], 
    },
    {
        "name": "Dominica",
        "coordinates": [15.414999, -70.162651], 
    },
    {
        "name": "Dominican Republic",
        "coordinates": [18.735693, 1.659626], 
    },
    {
        "name": "Algeria",
        "coordinates": [28.033886, -78.183406], 
    },
    {
        "name": "Ecuador",
        "coordinates": [-1.831239, 25.013607], 
    },
    {
        "name": "Estonia",
        "coordinates": [58.595272, 30.802498], 
    },
    {
        "name": "Egypt",
        "coordinates": [26.820553, -12.885834], 
    },
    {
        "name": "Western Sahara",
        "coordinates": [24.215527, 39.782334], 
    },
    {
        "name": "Eritrea",
        "coordinates": [15.179384, -3.74922], 
    },
    {
        "name": "Spain",
        "coordinates": [40.463667, 40.489673], 
    },
    {
        "name": "Ethiopia",
        "coordinates": [9.145, 25.748151], 
    },
    {
        "name": "Finland",
        "coordinates": [61.92411, 179.414413], 
    },
    {
        "name": "Fiji",
        "coordinates": [-16.578193, -59.523613], 
    },
    {
        "name": "Falkland Islands [Islas Malvinas]",
        "coordinates": [-51.796253, 150.550812], 
    },
    {
        "name": "Micronesia",
        "coordinates": [7.425554, -6.911806], 
    },
    {
        "name": "Faroe Islands",
        "coordinates": [61.892635, 2.213749], 
    },
    {
        "name": "France",
        "coordinates": [46.227638, 11.609444], 
    },
    {
        "name": "Gabon",
        "coordinates": [-0.803689, -3.435973], 
    },
    {
        "name": "United Kingdom",
        "coordinates": [55.378051, -61.604171], 
    },
    {
        "name": "Grenada",
        "coordinates": [12.262776, 43.356892], 
    },
    {
        "name": "Georgia",
        "coordinates": [42.315407, -53.125782], 
    },
    {
        "name": "French Guiana",
        "coordinates": [3.933889, -2.585278], 
    },
    {
        "name": "Guernsey",
        "coordinates": [49.465691, -1.023194], 
    },
    {
        "name": "Ghana",
        "coordinates": [7.946527, -5.345374], 
    },
    {
        "name": "Gibraltar",
        "coordinates": [36.137741, -42.604303], 
    },
    {
        "name": "Greenland",
        "coordinates": [71.706936, -15.310139], 
    },
    {
        "name": "Gambia",
        "coordinates": [13.443182, -9.696645], 
    },
    {
        "name": "Guinea",
        "coordinates": [9.945587, -62.067641], 
    },
    {
        "name": "Guadeloupe",
        "coordinates": [16.995971, 10.267895], 
    },
    {
        "name": "Equatorial Guinea",
        "coordinates": [1.650801, 21.824312], 
    },
    {
        "name": "Greece",
        "coordinates": [39.074208, -36.587909], 
    },
    {
        "name": "South Georgia and the South Sandwich Islands",
        "coordinates": [-54.429579, -90.230759], 
    },
    {
        "name": "Guatemala",
        "coordinates": [15.783471, 144.793731], 
    },
    {
        "name": "Guam",
        "coordinates": [13.444304, -15.180413], 
    },
    {
        "name": "Guinea-Bissau",
        "coordinates": [11.803749, -58.93018], 
    },
    {
        "name": "Guyana",
        "coordinates": [4.860416, 34.308825], 
    },
    {
        "name": "Gaza Strip",
        "coordinates": [31.354676, 114.109497], 
    },
    {
        "name": "Hong Kong",
        "coordinates": [22.396428, 73.504158], 
    },
    {
        "name": "Heard Island and McDonald Islands",
        "coordinates": [-53.08181, -86.241905], 
    },
    {
        "name": "Honduras",
        "coordinates": [15.199999, 15.2], 
    },
    {
        "name": "Croatia",
        "coordinates": [45.1, -72.285215], 
    },
    {
        "name": "Haiti",
        "coordinates": [18.971187, 19.503304], 
    },
    {
        "name": "Hungary",
        "coordinates": [47.162494, 113.921327], 
    },
    {
        "name": "Indonesia",
        "coordinates": [-0.789275, -8.24389], 
    },
    {
        "name": "Ireland",
        "coordinates": [53.41291, 34.851612], 
    },
    {
        "name": "Israel",
        "coordinates": [31.046051, -4.548056], 
    },
    {
        "name": "Isle of Man",
        "coordinates": [54.236107, 78.96288], 
    },
    {
        "name": "India",
        "coordinates": [20.593684, 71.876519], 
    },
    {
        "name": "British Indian Ocean Territory",
        "coordinates": [-6.343194, 43.679291], 
    },
    {
        "name": "Iraq",
        "coordinates": [33.223191, 53.688046], 
    },
    {
        "name": "Iran",
        "coordinates": [32.427908, -19.020835], 
    },
    {
        "name": "Iceland",
        "coordinates": [64.963051, 12.56738], 
    },
    {
        "name": "Italy",
        "coordinates": [41.87194, -2.13125], 
    },
    {
        "name": "Jersey",
        "coordinates": [49.214439, -77.297508], 
    },
    {
        "name": "Jamaica",
        "coordinates": [18.109581, 36.238414], 
    },
    {
        "name": "Jordan",
        "coordinates": [30.585164, 138.252924], 
    },
    {
        "name": "Japan",
        "coordinates": [36.204824, 37.906193], 
    },
    {
        "name": "Kenya",
        "coordinates": [-0.023559, 74.766098], 
    },
    {
        "name": "Kyrgyzstan",
        "coordinates": [41.20438, 104.990963], 
    },
    {
        "name": "Cambodia",
        "coordinates": [12.565679, -168.734039], 
    },
    {
        "name": "Kiribati",
        "coordinates": [-3.370417, 43.872219], 
    },
    {
        "name": "Comoros",
        "coordinates": [-11.875001, -62.782998], 
    },
    {
        "name": "Saint Kitts and Nevis",
        "coordinates": [17.357822, 127.510093], 
    },
    {
        "name": "North Korea",
        "coordinates": [40.339852, 127.766922], 
    },
    {
        "name": "South Korea",
        "coordinates": [35.907757, 47.481766], 
    },
    {
        "name": "Kuwait",
        "coordinates": [29.31166, -80.566956], 
    },
    {
        "name": "Cayman Islands",
        "coordinates": [19.513469, 66.923684], 
    },
    {
        "name": "Kazakhstan",
        "coordinates": [48.019573, 102.495496], 
    },
    {
        "name": "Laos",
        "coordinates": [19.85627, 35.862285], 
    },
    {
        "name": "Lebanon",
        "coordinates": [33.854721, -60.978893], 
    },
    {
        "name": "Saint Lucia",
        "coordinates": [13.909444, 9.555373], 
    },
    {
        "name": "Liechtenstein",
        "coordinates": [47.166, 80.771797], 
    },
    {
        "name": "Sri Lanka",
        "coordinates": [7.873054, -9.429499], 
    },
    {
        "name": "Liberia",
        "coordinates": [6.428055, 28.233608], 
    },
    {
        "name": "Lesotho",
        "coordinates": [-29.609988, 23.881275], 
    },
    {
        "name": "Lithuania",
        "coordinates": [55.169438, 6.129583], 
    },
    {
        "name": "Luxembourg",
        "coordinates": [49.815273, 24.603189], 
    },
    {
        "name": "Latvia",
        "coordinates": [56.879635, 17.228331], 
    },
    {
        "name": "Libya",
        "coordinates": [26.3351, -7.09262], 
    },
    {
        "name": "Morocco",
        "coordinates": [31.791702, 7.412841], 
    },
    {
        "name": "Monaco",
        "coordinates": [43.750298, 28.369885], 
    },
    {
        "name": "Moldova",
        "coordinates": [47.411631, 19.37439], 
    },
    {
        "name": "Montenegro",
        "coordinates": [42.708678, 46.869107], 
    },
    {
        "name": "Madagascar",
        "coordinates": [-18.766947, 171.184478], 
    },
    {
        "name": "Marshall Islands",
        "coordinates": [7.131474, 21.745275], 
    },
    {
        "name": "Macedonia [FYROM]",
        "coordinates": [41.608635, -3.996166], 
    },
    {
        "name": "Mali",
        "coordinates": [17.570692, 95.956223], 
    },
    {
        "name": "Myanmar [Burma]",
        "coordinates": [21.913965, 103.846656], 
    },
    {
        "name": "Mongolia",
        "coordinates": [46.862496, 113.543873], 
    },
    {
        "name": "Macau",
        "coordinates": [22.198745, 145.38469], 
    },
    {
        "name": "Northern Mariana Islands",
        "coordinates": [17.33083, -61.024174], 
    },
    {
        "name": "Martinique",
        "coordinates": [14.641528, -10.940835], 
    },
    {
        "name": "Mauritania",
        "coordinates": [21.00789, -62.187366], 
    },
    {
        "name": "Montserrat",
        "coordinates": [16.742498, 14.375416], 
    },
    {
        "name": "Malta",
        "coordinates": [35.937496, 57.552152], 
    },
    {
        "name": "Mauritius",
        "coordinates": [-20.348404, 73.22068], 
    },
    {
        "name": "Maldives",
        "coordinates": [3.202778, 34.301525], 
    },
    {
        "name": "Malawi",
        "coordinates": [-13.254308, -102.552784], 
    },
    {
        "name": "Mexico",
        "coordinates": [23.634501, 101.975766], 
    },
    {
        "name": "Malaysia",
        "coordinates": [4.210484, 35.529562], 
    },
    {
        "name": "Mozambique",
        "coordinates": [-18.665695, 18.49041], 
    },
    {
        "name": "Namibia",
        "coordinates": [-22.95764, 165.618042], 
    },
    {
        "name": "New Caledonia",
        "coordinates": [-20.904305, 8.081666], 
    },
    {
        "name": "Niger",
        "coordinates": [17.607789, 167.954712], 
    },
    {
        "name": "Norfolk Island",
        "coordinates": [-29.040835, 8.675277], 
    },
    {
        "name": "Nigeria",
        "coordinates": [9.081999, -85.207229], 
    },
    {
        "name": "Nicaragua",
        "coordinates": [12.865416, 5.291266], 
    },
    {
        "name": "Netherlands",
        "coordinates": [52.132633, 8.468946], 
    },
    {
        "name": "Norway",
        "coordinates": [60.472024, 84.124008], 
    },
    {
        "name": "Nepal",
        "coordinates": [28.394857, 166.931503], 
    },
    {
        "name": "Nauru",
        "coordinates": [-0.522778, -169.867233], 
    },
    {
        "name": "Niue",
        "coordinates": [-19.054445, 174.885971], 
    },
    {
        "name": "New Zealand",
        "coordinates": [-40.900557, 55.923255], 
    },
    {
        "name": "Oman",
        "coordinates": [21.512583, -80.782127], 
    },
    {
        "name": "Panama",
        "coordinates": [8.537981, -75.015152], 
    },
    {
        "name": "Peru",
        "coordinates": [-9.189967, -149.406843], 
    },
    {
        "name": "French Polynesia",
        "coordinates": [-17.679742, 143.95555], 
    },
    {
        "name": "Papua New Guinea",
        "coordinates": [-6.314993, 121.774017], 
    },
    {
        "name": "Philippines",
        "coordinates": [12.879721, 69.345116], 
    },
    {
        "name": "Pakistan",
        "coordinates": [30.375321, 19.145136], 
    },
    {
        "name": "Poland",
        "coordinates": [51.919438, -56.27111], 
    },
    {
        "name": "Saint Pierre and Miquelon",
        "coordinates": [46.941936, -127.439308], 
    },
    {
        "name": "Pitcairn Islands",
        "coordinates": [-24.703615, -66.590149], 
    },
    {
        "name": "Puerto Rico",
        "coordinates": [18.220833, 35.233154], 
    },
    {
        "name": "Palestinian Territories",
        "coordinates": [31.952162, -8.224454], 
    },
    {
        "name": "Portugal",
        "coordinates": [39.399872, 134.58252], 
    },
    {
        "name": "Palau",
        "coordinates": [7.51498, -58.443832], 
    },
    {
        "name": "Paraguay",
        "coordinates": [-23.442503, 51.183884], 
    },
    {
        "name": "Qatar",
        "coordinates": [25.354826, 55.536384], 
    },
    {
        "name": "Réunion",
        "coordinates": [-21.115141, 24.96676], 
    },
    {
        "name": "Romania",
        "coordinates": [45.943161, 21.005859], 
    },
    {
        "name": "Serbia",
        "coordinates": [44.016521, 105.318756], 
    },
    {
        "name": "Russia",
        "coordinates": [61.52401, 29.873888], 
    },
    {
        "name": "Rwanda",
        "coordinates": [-1.940278, 45.079162], 
    },
    {
        "name": "Saudi Arabia",
        "coordinates": [23.885942, 160.156194], 
    },
    {
        "name": "Solomon Islands",
        "coordinates": [-9.64571, 55.491977], 
    },
    {
        "name": "Seychelles",
        "coordinates": [-4.679574, 30.217636], 
    },
    {
        "name": "Sudan",
        "coordinates": [12.862807, 18.643501], 
    },
    {
        "name": "Sweden",
        "coordinates": [60.128161, 103.819836], 
    },
    {
        "name": "Singapore",
        "coordinates": [1.352083, -10.030696], 
    },
    {
        "name": "Saint Helena",
        "coordinates": [-24.143474, 14.995463], 
    },
    {
        "name": "Slovenia",
        "coordinates": [46.151241, 23.670272], 
    },
    {
        "name": "Svalbard and Jan Mayen",
        "coordinates": [77.553604, 19.699024], 
    },
    {
        "name": "Slovakia",
        "coordinates": [48.669026, -11.779889], 
    },
    {
        "name": "Sierra Leone",
        "coordinates": [8.460555, 12.457777], 
    },
    {
        "name": "San Marino",
        "coordinates": [43.94236, -14.452362], 
    },
    {
        "name": "Senegal",
        "coordinates": [14.497401, 46.199616], 
    },
    {
        "name": "Somalia",
        "coordinates": [5.152149, -56.027783], 
    },
    {
        "name": "Suriname",
        "coordinates": [3.919305, 6.613081], 
    },
    {
        "name": "São Tomé and Príncipe",
        "coordinates": [0.18636, -88.89653], 
    },
    {
        "name": "El Salvador",
        "coordinates": [13.794185, 38.996815], 
    },
    {
        "name": "Syria",
        "coordinates": [34.802075, 31.465866], 
    },
    {
        "name": "Swaziland",
        "coordinates": [-26.522503, -71.797928], 
    },
    {
        "name": "Turks and Caicos Islands",
        "coordinates": [21.694025, 18.732207], 
    },
    {
        "name": "Chad",
        "coordinates": [15.454166, 69.348557], 
    },
    {
        "name": "French Southern Territories",
        "coordinates": [-49.280366, 0.824782], 
    },
    {
        "name": "Togo",
        "coordinates": [8.619543, 100.992541], 
    },
    {
        "name": "Thailand",
        "coordinates": [15.870032, 71.276093], 
    },
    {
        "name": "Tajikistan",
        "coordinates": [38.861034, -171.855881], 
    },
    {
        "name": "Tokelau",
        "coordinates": [-8.967363, 125.727539], 
    },
    {
        "name": "Timor-Leste",
        "coordinates": [-8.874217, 59.556278], 
    },
    {
        "name": "Turkmenistan",
        "coordinates": [38.969719, 9.537499], 
    },
    {
        "name": "Tunisia",
        "coordinates": [33.886917, -175.198242], 
    },
    {
        "name": "Tonga",
        "coordinates": [-21.178986, 35.243322], 
    },
    {
        "name": "Turkey",
        "coordinates": [38.963745, -61.222503], 
    },
    {
        "name": "Trinidad and Tobago",
        "coordinates": [10.691803, 177.64933], 
    },
    {
        "name": "Tuvalu",
        "coordinates": [-7.109535, 120.960515], 
    },
    {
        "name": "Taiwan",
        "coordinates": [23.69781, 34.888822], 
    },
    {
        "name": "Tanzania",
        "coordinates": [-6.369028, 31.16558], 
    },
    {
        "name": "Ukraine",
        "coordinates": [48.379433, 32.290275], 
    },
    {
        "name": "Uganda",
        "coordinates": [1.373333, ], 
    },
    {
        "name": "United States",
        "coordinates": [37.09024, -95.712891], 
    },
    {
        "name": "Uruguay",
        "coordinates": [-32.522779, -55.765835], 
    },
    {
        "name": "Uzbekistan",
        "coordinates": [41.377491, 64.585262], 
    },
    {
        "name": "Vatican City",
        "coordinates": [41.902916, 12.453389], 
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "coordinates": [12.984305, -61.287228], 
    },
    {
        "name": "Venezuela",
        "coordinates": [6.42375, -66.58973], 
    },
    {
        "name": "British Virgin Islands",
        "coordinates": [18.420695, -64.639968], 
    },
    {
        "name": "U.S. Virgin Islands",
        "coordinates": [18.335765, -64.896335], 
    },
    {
        "name": "Vietnam",
        "coordinates": [14.058324, 108.277199], 
    },
    {
        "name": "Vanuatu",
        "coordinates": [-15.376706, 166.959158], 
    },
    {
        "name": "Wallis and Futuna",
        "coordinates": [-13.768752, -177.156097], 
    },
    {
        "name": "Samoa",
        "coordinates": [-13.759029, -172.104629], 
    },
    {
        "name": "Kosovo",
        "coordinates": [42.602636, 20.902977], 
    },
    {
        "name": "Yemen",
        "coordinates": [15.552727, 48.516388], 
    },
    {
        "name": "Mayotte",
        "coordinates": [-12.8275, 45.166244], 
    },
    {
        "name": "South Africa",
        "coordinates": [-30.559482, 22.937506], 
    },
    {
        "name": "Zambia",
        "coordinates": [-13.133897, 27.849332], 
    },
    {
        "name": "Zimbabwe",
        "coordinates": [-19.015438, 29.154857], 
    },
    ])
    const [latlong, setLatLong] = useState([0, 20])
    function handleCountrySelection(country) {
        const areaToZoom = countries.filter(area => area.name === country)
        console.log(areaToZoom)
        setLatLong(areaToZoom[0].coordinates)
    }
    console.log(latlong)
    return (
      <div style={wrapperStyles}>
        <ComposableMap
            style={{
                
            }}
        >
          <ZoomableGroup center={latlong} zoom={1}>
            <Geographies geography={ "/static/world.json" }>
            { 
              (geographies, projection) => {
                return geographies.map((geography, i) =>  {
                    if(geography.properties.name === props.countryName)
                    {
                    handleCountrySelection(geography.properties.name)
                      return (
                        <Geography
                            id="name"
                            key={ i }
                            geography={ geography }
                            projection={ projection }
                            value={geography.properties.name}
                            onClick={ props.handleClick }
                            style={{
                              default: {
                                  // fill: colorScale[Math.floor(Math.random() * 23) + 1 ],
                                  fill: colorScale[1],
                                  stroke: "#000",
                                  strokeWidth: 0.75,
                                  outline: "none",
                              },
                              hover: {
                                // fill: colorScale[Math.floor(Math.random() * 23) + 1 ],
                                fill: colorScale[2],
                                stroke: "#000",
                                strokeWidth: 0.75,
                                outline: "none",
                              },
                              pressed: {
                                // fill: colorScale[Math.floor(Math.random() * 23) + 1 ],
                                fill: colorScale[3],
                                stroke: "#000",
                                strokeWidth: 0.75,
                                outline: "none",
                            },
                            }}
                        />
                      )
                    } else {
                        return (
                            null
                            // <Geography
                            //     id="name"
                            //     key={ i }
                            //     geography={ geography }
                            //     projection={ projection }
                            //     value={geography.properties.name}
                            //     onClick={ props.handleClick }
                            //     style={{
                            //       default: {
                            //           // fill: colorScale[Math.floor(Math.random() * 23) + 1 ],
                            //           fill: colorScale[0],
                            //           stroke: "#000",
                            //           strokeWidth: 0.75,
                            //           outline: "none",
                            //       },
                            //       hover: {
                            //         // fill: colorScale[Math.floor(Math.random() * 23) + 1 ],
                            //         fill: colorScale[0],
                            //         stroke: "#000",
                            //         strokeWidth: 0.75,
                            //         outline: "none",
                            //       },
                            //       pressed: {
                            //         // fill: colorScale[Math.floor(Math.random() * 23) + 1 ],
                            //         fill: colorScale[0],
                            //         stroke: "#000",
                            //         strokeWidth: 0.75,
                            //         outline: "none",
                            //     },
                            //     }}
                            // />

                        )
                    }
                  }, props)
                }
            }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
}