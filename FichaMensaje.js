import React, { Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as Constants from '../../../Constants/Constants'
import { LoadingMessage } from '../../../Helpers/LoadingMessage';
import * as Messages from  '../../../Helpers/Messages'

export const FichaChat = ({ activeChat, error, loading  }) => {
    

    function ContentByEntity(entidad){
        if(entidad === "profesor"){
            return(
                <div>
                    <ul>
                        {activeChat.materias.map((materia, index )=> materia ? <li key={index}>{materia.nombre}</li> : null)}
                    </ul>
                </div>
            )
        }
        return(
            <div className="edu-info">
                <p>{activeChat.especialidad ? activeChat.especialidad : "Especialidad"}</p>
                <p>{activeChat.semestre ? `${activeChat.semestre}th semestre` : "Semestre"}</p>
            </div>
        )
    }
    

    return(
        <div className="ficha-info"> 
            { loading ? <LoadingMessage /> : null }
            { error ? <p className="alert alert-danger">{Messages.CONTENIDO_ERROR}</p> : null}
            {loading === true || error === true ? null : (    
            <>
            <img
            className="rounded-circle userpic-list"
            src={activeChat.imagen ? activeChat.imagen :"/img/default_userpic.gif"}
            alt={`Foto de perfil ${activeChat.nombre.toLowerCase()}`} 
            />
            <div className="fullname">
                <p className="ficha-nombre">{activeChat.nombre.toLowerCase()} {activeChat.apellido.toLowerCase()}</p>
            </div>
            {ContentByEntity(activeChat.entidad)}
            </>
            )}
            
        </div>
    )
}

export default FichaChat
