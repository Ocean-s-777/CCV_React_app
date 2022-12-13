import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserAuthContext } from '../../../Context'
import { fetchURL } from '../../visualizations/modules/fetchURL'
import copyButtonSvg from '../../images/copy-regular.svg'
import { NavLink } from 'react-router-dom'

function MapUserViews(props) {
    const userAuthData = useContext(UserAuthContext);
    const [userViews, setUserViews] = useState([])
    const config = {
        headers: {
            Authorization: `Bearer ${userAuthData.jwt}`,
        },
    };
    const getUserViews = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userAuthData.jwt}`,
            },
        };
        await axios.get(`${fetchURL}/custom/getAllUserViews`, config)
            .then((res) => {
                if (res.status === 200) {
                    setUserViews(res.data)
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    console.log("User is not logged in");
                }
            });
    }
    
    const deleteView = async (id) => {
        const choice = window.confirm("Are you sure you want to delete this view?")
        if (choice) {
            let data = {
                id: id
            }
            await axios.post(`${fetchURL}/custom/deleteView`, data, config)
                .then((res) => {
                    if (res.status === 200) {
                        getUserViews()
                    }
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        console.log("User is not logged in");
                    }
                });
        }
    }

    useEffect(() => {
        getUserViews()
    }, [])

    return (
        <div className='gridViews'>
            {userViews.map((view) => (
                <div className='customViewElement' key={view.title}>
                    <NavLink to={`/custom/${view.id}`} className='viewTitle' >{view.title}</NavLink>
                    <div className='viewElements'>
                        <button className='acc-buttons remove-acc deleteButton' onClick={() => deleteView(view.id)}>Delete</button>
                        <div className='copybutton' onClick={() => navigator.clipboard.writeText(`https://ccv-react-app.herokuapp.com/custom/${view.id}`)}><img src={copyButtonSvg} alt="copy-button" /></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MapUserViews