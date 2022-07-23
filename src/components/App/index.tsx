import * as React from "react"
import { useState } from "react"
import ReactJson from 'react-json-view'
import {useColorMode} from '@docusaurus/theme-common';
import { ToggleTable, TOGGLE_TYPES } from "@site/src/components/TogglesTable";

import "./index.css";

const App = () => {
  const {colorMode} = useColorMode();
  const [data,setData] = useState({
      toggles:[]
  });
  const [processData,setProcessData] = useState();
  const changeData = async (field, value) => {
    const result = {...data, [field]: value }
    setData(result)
    setProcessData({
      toggles: result.toggles
      .map((toggle: any) => {

        const mappedToggle = {
          name: toggle.name,
          type: toggle.type,
          conditions: toggle.type=== TOGGLE_TYPES[1]? toggle.conditions.filter(condition => condition.field && condition.value) : undefined,
          value: toggle.type=== TOGGLE_TYPES[0]? toggle.value : undefined,
        }
        return JSON.parse(JSON.stringify(mappedToggle))
      }).filter(toggle => 
        toggle.name 
        && (
          toggle.type ===TOGGLE_TYPES[0] || toggle.conditions.length > 0))
    } as any)
  }
  return (
  <div style={{
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'stretch',
    padding: '1rem 3rem'
  }}>
    <ToggleTable data={data} changeData={changeData}/>
    <ReactJson src={processData as any} name={false} theme={colorMode === 'dark'? 'ashes' : 'rjv-default'} />
  </div>)
}

export default function app(){
  return (<App />);
} 
