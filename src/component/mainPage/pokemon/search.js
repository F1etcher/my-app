import React from 'react';
import Select from 'react-select';

import {useSelector} from "react-redux";





export default function AnimatedMulti() {
    const state = useSelector(state => state.mainPage)


  const colourOptions = state.search.map(el =>
      ({ value:el.url, label:el.name})
  )
    return (
        <div>
            <Select
                isMulti
                name="colors"
                options={colourOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onInputChange={(e) => console.log(e)}
            />
        </div>
    );
}