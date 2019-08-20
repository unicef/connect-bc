
import React from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import chroma from "chroma-js"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const colorScale = chroma
  .scale([
    '#005840',
    '#009840'
  ])
  .mode('lch')
  .colors(24)

export default function RegionMapForDashboard(props) {
    
    return (
      <div style={wrapperStyles}>
          
        <ComposableMap
          width={980}
          height={551}
          // style={{
          //   width: "100%",
          //   height: "auto",
          // }}
          >
          <ZoomableGroup center={[20,20]}>
          {/* <ZoomableGroup zoom={4} > */}
            <Geographies geography={ "/static/world.json" }>
            { 
              (geographies, projection) => {
                return geographies.map((geography, i) =>  {
                    if(props.countries.includes(geography.properties.name))
                    {
                      return (
                        
                        <Geography
                            key={ i }
                            geography={ geography }
                            projection={ projection }
                            // onClick={ this.handleClick }
                            style={{
                              default: {
                                  fill: colorScale[11],
                                  stroke: "#000",
                                  strokeWidth: 0.75,
                                  outline: "none",
                              },
                              hover: {
                                fill: colorScale[12],
                                stroke: "#000",
                                strokeWidth: 0.75,
                                outline: "none",
                              },
                            //   pressed: {
                            //     fill: colorScale[22],
                            //     stroke: "#000",
                            //     strokeWidth: 0.75,
                            //     outline: "none",
                            // },
                            }}
                        />
                      )
                    } else {
                      return (
                        <Geography
                            key={ props.countryName + i }
                            geography={ geography }
                            projection={ projection }
                            // onClick={ this.handleClick }
                            style={{
                              default: {
                                  fill: "#FFF",
                                  stroke: "#000",
                                  strokeWidth: 0.75,
                                  outline: "none",
                              },
                              hover: {
                                fill: "#FFF",
                                stroke: "#000",
                                strokeWidth: 0.75,
                                outline: "none",
                              },
                              pressed: {
                                fill: "#FFF",
                                stroke: "#000",
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