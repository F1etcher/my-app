import {useSelector} from "react-redux";
import AsyncSelect from 'react-select/async';
import {useHistory} from "react-router";





function Search (){
    const state = useSelector(state => state.mainPage.search)
    const history = useHistory()
    console.log(state)
    const filterPokemon = (inputValue) => {
        return state.filter(i =>
            {
                if (inputValue.length < 1){
                    return false
                }
                return i.label.toLowerCase().includes(inputValue.toLowerCase())}

        );
    };
    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterPokemon(inputValue));
        }, 500);
    };
    const handeleChange = (prop) => {
        history.push(`/pokemon?=${prop.value}`)
    }


    return(
        <div>
        <AsyncSelect
            value={null}
            loadOptions={loadOptions}
            onChange={handeleChange}
        />
        </div>
    )
}

export default Search