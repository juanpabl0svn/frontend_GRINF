import React from 'react'

const AddData = () => {
    return (
        <div>
            <form className='send-data'>
                <div className="colab-container">
                    <div className="data-colab">
                        <label htmlFor="">Reponsable</label>
                        <input type="text" className='text-box' />
                    </div>
                    <div className="data-colab">
                        <label htmlFor="">Actividad</label>
                        <input type="text" className='text-box' />
                    </div>
                    <div className="data-colab">
                        <label htmlFor="">Descripcion</label>
                        <textarea name="" id=""  className='text-box description'></textarea>
                    </div>
                    <div className="data-colab">
                        <label htmlFor="">Duracion</label>
                        <input type="text" className='text-box' />
                    </div>
                    <div className="data-colab">
                        <label htmlFor="">Deuda tecnica</label>
                        <input type="text" className='text-box' />
                        <div className="time">
                            <input type='text' className='time-box'/>
                            <label htmlFor="">Tiempo</label>
                        </div>
                    </div>
                </div>
                <div className="send">
                    <input type="submit" value="Enviar" />
                </div>
            </form>
        </div>
    )
}

export default AddData
