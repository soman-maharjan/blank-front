import React, {useEffect, useState} from 'react';
import Fuse from "fuse.js";

var fuse;

function Header(props) {
    const {state, setState} = props;
    const [search, setSearch] = useState("");

    const initializeFuse = () => {
        if (state.data != []) {
            const options = {
                includeScore: true,
                keys: Object.keys(flattenObj(state.data[0]))
            }
            fuse = new Fuse(state.data, options)
        }
    }

    useEffect(() => {
        initializeFuse();
    }, [state.data]);

    const searchHandler = (event) => {

        if (event.target.value != "") {
            setState({
                data: state.data,
                filteredData: fuse.search(event.target.value).map(o => o.item)
            })
            setSearch(event.target.value)
        } else {
            setState({data: state.data, filteredData: state.data})
            setSearch(event.target.value)
        }
    }

    const flattenObj = (object, p, response = {}) => {
        for (let key in object) {
            let propName = p ? p + '.' + key : key;
            if (typeof object[key] == 'object') {
                flattenObj(object[key], propName, response);
            } else {
                response[propName] = object[key];
            }
        }
        return response;
    }

    return (
        <div className="navbar shadow mt-3 mb-5 bg-white">
            <div className="flex-1 px-2 mx-2">
                        <span className="text-lg font-semibold">
                            {props.header}
                        </span>
            </div>

            <div className="flex-none">
                <input name="search" type="text" placeholder="Search" value={search}
                       onChange={(event) => searchHandler(event)}
                       className="px-4 h-9 border-2 text-gray-500 focus:border-indigo-500 w-60 bg-gray-100 outline-none"/>
            </div>
        </div>
    );
}

export default Header;