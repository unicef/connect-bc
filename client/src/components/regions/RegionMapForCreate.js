
import React from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import chroma from "chroma-js"

const wrapperStyles = {
  // width: "200%",
  // maxWidth: 980,
  // margin: "0 auto",
}

const colorScale = chroma
  .scale([
    '#FF6E40',
    '#FFD740',
    '#00B8D4',
  ])
  .mode('lch')
  .colors(24)

export default function RegionMapForCreate(props) {
    
    return (
      <div style={wrapperStyles}>
          
        <ComposableMap
          projectionConfig={{
            scale: 200,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]}>
            <Geographies geography={ "/static/world.json" }>
            { 
              (geographies, projection) => {
                return geographies.map((geography, i) =>  {
                    if(geography.properties.name === props.countryName)
                    {
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
                        <Geography
                            key={ props.countryName + i }
                            geography={ geography }
                            projection={ projection }
                            value={geography.properties.name}
                            onClick={ props.handleClick }
                            style={{
                              default: {
                                  fill: "#FFF",
                                  stroke: "#BBB",
                                  strokeWidth: 0.75,
                                  outline: "none",
                              },
                              hover: {
                                fill: "#FFF",
                                stroke: "#BBB",
                                strokeWidth: 0.75,
                                outline: "none",
                              },
                              pressed: {
                                fill: "#FFF",
                                stroke: "#BBB",
                                strokeWidth: 0.75,
                                outline: "none",
                            },
                            }}
                          />
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