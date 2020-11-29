import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ( { onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f3 ph5 mw-75'>
                {'Enter an image-address into the field below and press "Detect". Give it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={ onInputChange } />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={ onPictureSubmit }>Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;