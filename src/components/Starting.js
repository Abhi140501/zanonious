import './css/Starting.css';
import { ClipLoader } from 'react-spinners';
import Header from './Header';

function Starting() {
    setTimeout(function() {
        window.location.replace('/home');
    }, 3000);

    return (
        <div className='starting'>
            <Header />
            <h2 className='title'>ZANONIOUS</h2>
            <div className='spinner'>
                <ClipLoader color='red' loading='true' size={100} />
            </div>
            <p className='loading'>Loding...</p>
            <p className='group'>Group 7</p>
        </div>
    );
}

export default Starting;