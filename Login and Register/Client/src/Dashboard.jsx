import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
    const [suc, setSuc] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/dashboard', { withCredentials: true })
            .then(res => {
                if (res.data.message === 'Success') {
                    setSuc("Succeeded OK");
                } else {
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            this is the dashboard
            {suc && <p>{suc}</p>}
        </div>
    );
};

export default MyComponent;
