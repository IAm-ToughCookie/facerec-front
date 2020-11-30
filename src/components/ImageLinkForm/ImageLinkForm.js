import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ( { onInputChange, onPictureSubmit, onClearInput }) => {
    return (
        <div>
            <p className='f3 ph5 mw-75'>
                {'This app will try to find a face in an any image you post.'}
            </p>
            <p className='f3 ph5 mw-75'>
                {'Enter an image-address into the field below and press "Detect". Give it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={ onInputChange } id='urlInput'/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={ onPictureSubmit }>Detect
                    </button>
                    <button className='clearButton w-30 grow link ph3 pv2 dib dark-grey bg-light-grey'
                        onClick= { onClearInput }>
                        Clear Input
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;