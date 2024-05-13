import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../contexts/authContext'


const Home = () => {
    const { currentUser } = useAuth()
    const [userData, setUserData] = useState(null);


    function base64ToUrl(base64String) {
  return `data:image/png;base64,${base64String}`;
}


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getUser/user-data', {
                    headers: {
                        'Authorization': `Bearer ${currentUser.token}`
                    },
                    params: {
                email: currentUser.email
            }
                });
                if (response.status === 200) {
                    const updatedUserData = {
            ...response.data,
            profilePhoto: base64ToUrl(response.data.profilePhoto),
            coverPhoto: base64ToUrl(response.data.coverPhoto)
          };
          setUserData(updatedUserData);
                   
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, [currentUser]);

    useEffect(()=>{
        console.log(currentUser.email,"this is current user")
    })

    return (
       
        <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in. {console.log(userData)}
        {userData && (
        <div>
          <img src={userData.profilePhoto} alt="Profile" />
          <img src={userData.coverPhoto} alt="Cover" />
        </div>
      )}</div>
    )
}

export default Home