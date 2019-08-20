
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
    '#FF6E40',
    '#FFD740',
    '#00B8D4',
  ])
  .mode('lch')
  .colors(24)

export default function RegionMapForManage(props) {
    
    return (
      <div style={wrapperStyles}>
          
        <ComposableMap
          // projectionConfig={{
          //   scale: 205,
          //   rotation: [-11,0,0],
          // }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          {/* <ZoomableGroup center={[0,20]}> */}
          {/* <ZoomableGroup zoom={4} > */}
            <Geographies geography={ "/static/world.json" }>
            { 
              (geographies, projection) => {
                return geographies.map((geography, i) =>  {
                    if(geography.properties.name === props.countryName)
                    {
                      return (
                        
                        <Geography
                            key={ props.countryName + i }
                            geography={ geography }
                            projection={ projection }
                            // onClick={ this.handleClick }
                            style={{
                              default: {
                                  fill: colorScale[20],
                                  stroke: "#000",
                                  strokeWidth: 0.75,
                                  outline: "none",
                              },
                              hover: {
                                fill: colorScale[21],
                                stroke: "#000",
                                strokeWidth: 0.75,
                                outline: "none",
                              },
                              pressed: {
                                fill: colorScale[22],
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
                            // onClick={ this.handleClick }
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
          {/* </ZoomableGroup> */}
        </ComposableMap>
      </div>
    )
}