import React from 'react';

const Body = ()=> {
    return (
    <>
        <main>
            <div className='home_div1'>
                <img src='https://media.istockphoto.com/id/512278456/photo/group-of-doctors-at-the-hospital.jpg?s=612x612&w=0&k=20&c=EPPHeKuq0YabUC-QCWlAOhTfIZAAPtrwQ96V_Wp0oKY=' alt='img' className='home_main_img'></img>
                <div className='home_div2'>
                    <div className='home_div3'>
                        <h1 className='home_heading'>MEDICONNECT</h1>
                        <p className='home_description'>Our aim is to serve as an accessible platform for students to seek medical assistance, connect with volunteers, and access essential health. We aim to streamline access to first-aid guidelines, health-related information, and volunteer support.</p>
                    </div>
                    <button className='home_help'>Need Help?</button>
                </div>
            </div>
        </main>
    </>
    )
}

export default Body;