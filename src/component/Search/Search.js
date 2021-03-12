import {useSelector} from "react-redux";
import AsyncSelect from 'react-select/async';
import {useHistory} from "react-router";

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'blue' : 'black',
        padding: 20,
    })
}

function Search() {
    const state = useSelector(state => state.mainPage.search)
    const history = useHistory()
    const filterPokemon = (inputValue) => {
        return state.filter(i => {
                if (inputValue.length < 1) {
                    return false
                }
                return i.label.toLowerCase().includes(inputValue.toLowerCase())
            }
        );
    };
    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterPokemon(inputValue));
        }, 500);
    };
    const handelChange = (prop) => {
        history.push(`/pokemon?=${prop.value}`)
    }


    return (
        <AsyncSelect
            styles={customStyles}
            value={null}
            placeholder="Search"
            loadOptions={loadOptions}
            onChange={handelChange}
        />
    )
}

export default Search