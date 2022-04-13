import axios from 'axios'
import React, {Component} from 'react'
import Moment from 'react-moment';

import DataTable from '../../table/DataTable';
import Header from "../../header/Header";

const columns = [
    {id: '_id', label: 'Order Id'},
    {id: 'created_at', label: 'Order Date'},
    {id: 'status', label: 'Status'},
    {id: 'pending', label: 'Pending Since'},
    {id: 'options', label: 'Options'},
];

class ShowOrder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            filteredData: [],
        }

        this.changeState = this.changeState.bind(this)
    }

    componentDidMount() {
        axios.get('/api/user-order')
            .then(response => {
                console.log(response)
                this.setState({...this.state, filteredData: response.data, data: response.data})
            })
            .catch(error => console.log(error.response))

    }

    changeState({data, filteredData}) {
        this.setState({
            data: data,
            filteredData: filteredData
        })
    }

    render() {

        const value = (column, row) => {
            switch (column.id) {
                case "_id":
                    return (
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full"
                                     src={`${process.env.REACT_APP_IMAGE_URL}${row['sku'].images[0]}`} alt=""/>
                            </div>
                            <div className="ml-4 whitespace-normal">
                                <div className="text-sm break-all font-medium text-gray-900">{row['order_id']}</div>
                            </div>
                        </div>

                    )
                case "created_at":
                    return (<Moment format="YYYY/MM/DD">{row['created_at']}</Moment>)
                case 'pending':
                    return ((row['status'] == "pending" ? <Moment fromNow>{row['created_at']}</Moment> : "-"))
                case 'status':
                    return (<span className="capitalize">{row['status']}</span>)
                case 'options':
                    return (
                        <>
                            <a onClick={() => this.props.changePage({page: 'view-order', order: row})}
                               className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                                View
                            </a>
                        </>
                    )
                default:
                    return (row[column.id])
            }
        }

        return (
            <div className="w-11/12">
                <div class="text-sm breadcrumbs mt-3">
                    <ul>
                        <li>
                            <a onClick={() => this.props.changePage({page: 'dashboard'})}>Dashboard</a>
                        </li>
                        <li>Orders</li>
                    </ul>
                </div>
                <Header setState={this.changeState} state={this.state} header={"Orders"}/>
                <DataTable columns={columns} filteredData={this.state.filteredData} data={this.state.data}
                           value={value}/>
            </div>
        )
    }
}

export default ShowOrder
